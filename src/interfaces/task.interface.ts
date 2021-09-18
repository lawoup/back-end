import { IUser } from '~/interfaces/user.interface';
import { IRole } from '~/interfaces/role.interface';
import { IProject } from '~/interfaces/project.interface';
import { IClient } from '~/interfaces/client.interface';

export interface ITask {
	_id: string;
	user: string | IUser;
	role: string | IRole;
	client: string | IClient;
	project: string | IProject;
	taskDate: Date;
	description: string;
	date: number;
	month: number;
	year: number;
	duration: number;
	createdAt?: Date;
	updatedAt?: Date;
}
