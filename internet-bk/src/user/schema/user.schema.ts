import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

export type UserDocument = User & Document

@Schema({ timestamps: true })

export class User {
    @Prop({ unique: true, required: true })
    username!: string

    @Prop({ unique: true, required: true })
    region!: string

    @Prop({ unique: true, required: true })
    email!: string

    @Prop({ unique: true, required: true })
    password!: string

    @Prop({ type: Types.ObjectId, ref: 'Role', required: true })
    role!: Types.ObjectId;

    @Prop({ required: true, default: new Date() })
    last_login!: Date

    @Prop({ required: true, type: String })
    login_ip!: string

    @Prop({ required: true, default: false })
    account_stats!: boolean

    @Prop({ required: false, default: true })
    accout_lock!: boolean

    @Prop({ default: 0 })
    failed_login_attempts!: number;

    @Prop({ type: Date, required: false })
    locked_until?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);