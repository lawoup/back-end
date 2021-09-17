import { IsEmail } from 'class-validator';

export class CreateUserDto {
	@IsEmail()
	public email: string;
}

export class LoginDto {
	@IsEmail()
	public email: string;
}
