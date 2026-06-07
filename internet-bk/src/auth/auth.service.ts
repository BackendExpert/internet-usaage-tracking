import {
    ConflictException,
    Inject,
    Injectable,
    NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { JwtService } from "@nestjs/jwt";
import { Model } from "mongoose";

import bcrypt from 'bcrypt'

import { AuditLog, AuditLogDocument } from "src/auditlogs/schema/auditlog.schema";
import { Role, RoleDocument } from "src/role/schema/role.schema";
import { User, UserDocument } from "src/user/schema/user.schema";

import { EmailService } from "src/common/utils/email.util";
import { getLocationFromIP } from "src/common/utils/location";
import { createAuditLog } from "src/common/utils/auditlogs.util";
import { RegistationDTO } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
import { PasswordRest, PasswordRestDocument } from "./schema/passreset.schema";
import { CompareResetToken, GeneratePasswordRestLink } from "src/common/utils/authlink.util";
import { PasswordRestDTO } from "./dto/passreset.dto";



@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<UserDocument>,

        @InjectModel(Role.name)
        private roleModel: Model<RoleDocument>,

        @InjectModel(AuditLog.name)
        private auditlogModel: Model<AuditLogDocument>,

        @InjectModel(PasswordRest.name)
        private passwordresetModel: Model<PasswordRestDocument>,

        private jwtService: JwtService,
        private emailService: EmailService,
    ) { }

    async Registation(
        dto: RegistationDTO,
        ipAddress?: string,
        userAgent?: string,
    ) {
        const user = await this.userModel.findOne(
            {
                username: dto.username,
                email: dto.email
            }
        )

        if (user) {
            throw new ConflictException("Uesr Already Register")
        }

        const role = await this.roleModel.findOne({ role: 'user' })

        if (!role) {
            throw new NotFoundException("Role Not Found")
        }

        const hashpass = await bcrypt.hash(dto.password, 10)
        const safeIP = String(ipAddress || "0.0.0.0");

        const createUser = await this.userModel.create({
            username: dto.username,
            region: dto.region,
            email: dto.email,
            password: hashpass,
            role: role._id,
            login_ip: safeIP,
            last_login: new Date(),
            account_stats: false
        })

        const location = getLocationFromIP(ipAddress || "");


        if (!createUser) {
            throw new ConflictException("The Error while creating user")
        }

        await createAuditLog(this.auditlogModel, {
            user: createUser._id,
            action: "REGISTER_SUCCESS",
            description: `Registration Successful for ${createUser.email}`,
            ipAddress,
            userAgent,
            metadata: {
                ipAddress,
                userAgent,
                location,
            },
        });

        return {
            success: true,
            message: "User Created Success, Waiting for Admin Approvel"
        }
    }

    async Login(
        dto: LoginDto,
        ipAddress?: string,
        userAgent?: string,
    ) {
        const user = await this.userModel.findOne({ email: dto.email });

        if (!user) {
            throw new NotFoundException("User Cannot Find");
        }

        if (!user.account_stats) {
            throw new ConflictException(
                "Account Not Active, Please contact the Admin",
            );
        }

        const now = new Date();


        if (
            user.accout_lock &&
            user.locked_until &&
            user.locked_until <= now
        ) {
            user.accout_lock = false;
            user.failed_login_attempts = 0;
            user.locked_until = undefined;

            await user.save();
        }


        if (
            user.accout_lock &&
            user.locked_until &&
            user.locked_until > now
        ) {
            throw new ConflictException(
                `Account is locked until ${user.locked_until.toLocaleString()}`
            );
        }

        const checkpass = await bcrypt.compare(
            dto.password,
            user.password,
        );

        if (!checkpass) {
            user.failed_login_attempts =
                (user.failed_login_attempts || 0) + 1;

            const attemptsLeft = 3 - user.failed_login_attempts;

            if (user.failed_login_attempts >= 3) {
                const lockUntil = new Date();
                lockUntil.setHours(lockUntil.getHours() + 6);

                user.accout_lock = true;
                user.locked_until = lockUntil;

                await user.save();

                await createAuditLog(this.auditlogModel, {
                    user: user._id,
                    action: "ACCOUNT_LOCKED",
                    description: `${user.email} locked after 3 failed login attempts`,
                    ipAddress,
                    userAgent,
                    metadata: { ipAddress, userAgent },
                });

                throw new ConflictException(
                    "Account locked for 6 hours due to 3 failed login attempts",
                );
            }

            await user.save();

            await createAuditLog(this.auditlogModel, {
                user: user._id,
                action: "WRONG_PASSWORD",
                description: `${user.email} wrong password attempt`,
                ipAddress,
                userAgent,
                metadata: { ipAddress, userAgent },
            });

            throw new ConflictException(
                `Password Not Match (${attemptsLeft} attempt(s) remaining)`
            );
        }


        user.failed_login_attempts = 0;
        user.accout_lock = false;
        user.locked_until = undefined;
        user.last_login = new Date();

        if (ipAddress) {
            user.login_ip = ipAddress;
        }

        await user.save();

        const accessToken = await this.jwtService.signAsync({
            sub: user._id,
            email: user.email,
            username: user.username,
            region: user.region,
            role: (user.role as any)?.role,
            type: "ACCESS_TOKEN"
        });

        await createAuditLog(this.auditlogModel, {
            user: user._id,
            action: "LOGIN_SUCCESS",
            description: `${user.email} Login Success`,
            ipAddress,
            userAgent,
            metadata: { ipAddress, userAgent },
        });

        return {
            success: true,
            message: "Login Success",
            token: accessToken,
        };
    }

    async RequestPasswordRest(
        email: string,
        ipAddress?: string,
        userAgent?: string,
    ) {
        const user = await this.userModel.findOne({ email: email })

        if (!user) {
            throw new NotFoundException("User Cannot Found in the System")
        }

        const now = new Date();

        const resetToken = await this.passwordresetModel.findOne({
            user: user._id,
            expire_at: { $lt: now }
        });

        if (!resetToken) {
            throw new ConflictException("The Password Reset Link Already Send to you Email. check the email")
        }

        await this.passwordresetModel.deleteMany({ email: email })

        const genarateresetToken = await this.jwtService.signAsync({
            sub: user._id,
            email: user.email,
            username: user.username,
            type: "PASSWORD_RESET_TOKEN"
        });

        const passwordResetLink = GeneratePasswordRestLink();


        const createResetLink = await this.passwordresetModel.create({
            user: user._id,
            email: email,
            token: passwordResetLink.passresetlink,
            expire_at: passwordResetLink.tokenHash
        })

        await this.emailService.sendPassresetLink(
            email,
            passwordResetLink.passresetlink,
            ipAddress,
            userAgent,
        )

        await createAuditLog(this.auditlogModel, {
            user: user._id,
            action: "REQIEST_PASSWORD_RESET_LINK",
            description: `${user.email} Password Reset Request`,
            ipAddress,
            userAgent,
            metadata: { ipAddress, userAgent },
        });

        return {
            success: true,
            message: "Password Reset Link Send to your email"
        }
    }

    async VerifyPasswordReset(
        token: string,
        dto: PasswordRestDTO,
        ipAddress?: string,
        userAgent?: string,
    ) {
        const resetlink = await this.passwordresetModel.findOne({
            used: false,
            expiresAt: { $gt: new Date() }
        })

        if (!resetlink) {
            throw new ConflictException("Invalid or expired auth link");
        }

        const VerifyToken = CompareResetToken(
            token,
            resetlink.token
        )

        if (!VerifyToken) {
            throw new ConflictException("Invalid or expired Reset link");
        }
        const hashnewpass = await bcrypt.hash(dto.new_password, 10);

        const updatePassword = await this.userModel.findOneAndUpdate(
            { email: resetlink.email },
            {
                password: hashnewpass,
            },
            { new: true }
        );

        await this.passwordresetModel.deleteMany({ email: resetlink.email })

        await createAuditLog(this.auditlogModel, {
            user: resetlink.user,
            action: "PASSWORD_UPDATE_SUCCESS",
            description: `${resetlink.email} Password Updated Success`,
            ipAddress,
            userAgent,
            metadata: { ipAddress, userAgent },
        });

        await this.emailService.NotificationEmail(
            resetlink.email,
            `Password Updated Success at ${new Date()}`,
            ipAddress,
            userAgent,
        )

        return {
            success: true,
            message: "Password Updated Success"
        }
    }
}