import {
	IsDateString,
	IsNumber,
	IsString,
	ValidateNested,
} from 'class-validator';
import { IsValidTask } from '~/utils/valid-task.validation';
import { Type } from 'class-transformer';

class RoleDto {
	@IsString()
	public _id: string;

	@IsString()
	public name: string;
}

class ClientDto {
	@IsString()
	public _id: string;

	@IsString()
	public name: string;
}

class ProjectDto {
	@IsString()
	public _id: string;

	@IsString()
	public name: string;
}

export class TaskDto {
	@ValidateNested()
	@Type(() => RoleDto)
	public role: RoleDto;

	@ValidateNested()
	@Type(() => ProjectDto)
	public project: ProjectDto;

	@ValidateNested()
	@Type(() => ClientDto)
	public client: ClientDto;

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
