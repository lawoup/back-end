import { IUser } from '~/interfaces/user.interface';
import { IRole } from '~/interfaces/role.interface';
import { IProject } from '~/interfaces/project.interface';
import { IClient } from '~/interfaces/client.interface';

export interface ITask {
	_id: string;
	user: string | IUser;
	role: {
		_id: string | IRole;
		name: string;
	};
	client: {
		_id: string | IClient;
		name: string;
	};
	project: {
		_id: string | IProject;
		name: string;
	};
	taskDate: Date;
	description: string;
	date: number;
	month: number;
	year: number;
	duration: number;
	createdAt?: Date;
	updatedAt?: Date;
}
