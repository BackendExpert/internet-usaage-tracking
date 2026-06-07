import { IsNotEmpty, IsStrongPassword } from "class-validator";

export class PasswordRestDTO {
    @IsStrongPassword()
    @IsNotEmpty()
    new_password!: string
}