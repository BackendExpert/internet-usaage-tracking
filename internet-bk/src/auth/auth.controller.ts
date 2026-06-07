import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { ClientInfoDecorator } from "src/common/decorators/client-info.decorator";
import type { ClientInfo } from "src/common/interfaces/client-info.interface";
import { RegistationDTO } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";


@Controller('api/auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) { }

    @Post("/register")

    Register(
        @Body() dto: RegistationDTO,
        @ClientInfoDecorator() client: ClientInfo,
    ) {
        return this.authService.Registation(
            dto,
            client.ipAddress,
            client.userAgent
        )
    }

    @Post('/login')

    Login(
        @Body() dto: LoginDto,
        @ClientInfoDecorator() client: ClientInfo,
    ) {
        return this.authService.Login(
            dto,
            client.ipAddress,
            client.userAgent
        )
    }


}