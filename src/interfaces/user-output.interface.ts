import { IUser } from '~/interfaces/user.interface';

export interface UserOutputInterface {
	user: IUser | null;
	email_error: boolean;
}
