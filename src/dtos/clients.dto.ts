import { IsString } from 'class-validator';

export class CreateClientDto {
	@IsString()
	public name: string;
}
