import { IsDateString, IsNumber, IsString } from 'class-validator';

export class CreateTaskDto {
	@IsString()
	public role: string;

	@IsString()
	public project: string;

	@IsString()
	public client: string;

	@IsDateString()
	public taskDate: Date;

	@IsString()
	public description: string;

	@IsNumber()
	public duration: number;
}
