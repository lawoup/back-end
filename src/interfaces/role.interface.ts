import { IUser } from '~/interfaces/user.interface';

export interface IRole {
	_id: string;
	name: string;
	user: string | IUser;
	createdAt?: Date;
	updatedAt?: Date;
}
