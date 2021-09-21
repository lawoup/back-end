import { IsDateString, IsNumber, IsString } from 'class-validator';
import { IsValidTask } from '~/utils/valid-task.validation';

export class TaskDto {
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

export class CreateTaskDto {
	@IsValidTask({ message: 'Incomplete task data' })
	public tasks: TaskDto[];
}
