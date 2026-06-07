import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from "class-validator";

export class RegistationDTO {
    @IsString()
    @IsNotEmpty()
    username!: string

    @IsString()
    @IsNotEmpty()
    region!: string

    @IsEmail()
    @IsNotEmpty()
    email!: string

    @IsStrongPassword()
    @IsNotEmpty()
    password!: string
}