import { isEmpty } from 'lodash';
import * as admin from 'firebase-admin';
import { CreateUserDto } from '~/dtos/users.dto';
import { IUser } from '~/interfaces/user.interface';
import HttpException from '~/exceptions/HttpException';
import { createUser, findOneUser } from '~/data-layer/user.data-layer';
import { UserOutputInterface } from '~/interfaces/user-output.interface';

class UserService {
	public async createUser(
		userData: CreateUserDto,
		uid: string,
		email: string
	): Promise<IUser> {
		if (isEmpty(userData)) {
			throw new HttpException(400, 'No valid user data found');
		}

		const user = await findOneUser({
			args: {
				email,
			},
		});
		if (user) {
			throw new HttpException(409, 'Email already present');
		}

		if (email === process.env.ADMIN_EMAIL) {
			await admin.auth().setCustomUserClaims(uid, { admin: true });
		}

		return await createUser({
			args: {
				name: userData.name,
				designation: userData.designation,
				email,
				_id: uid,
			},
		});
	}

	public async getUserById(
		uid: string,
		email: string
	): Promise<UserOutputInterface> {
		const user = await findOneUser({
			args: {
				_id: uid,
			},
		});
		if (!user) {
			return { user: null, email_error: false };
		}
		if (email.split('@')[1] === 'neoito.com') {
			return { user, email_error: true };
		}

		return { user, email_error: false };
	}
}

export default UserService;
