import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

export type PasswordRestDocument = PasswordRest & Document

@Schema({ timestamps: true })

export class PasswordRest {
    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    user!: Types.ObjectId;

    @Prop({ unique: true, required: true })
    email!: string

    @Prop({ unique: true, required: true })
    token!: string

    @Prop({ unique: true, required: true })
    expire_at!: Date

    @Prop({ required: true, default: false })
    is_used!: boolean
}

export const PasswordRestSchema = SchemaFactory.createForClass(PasswordRest);