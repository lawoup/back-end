import { isEmpty } from 'lodash';
import { CreateUserDto } from '~/dtos/users.dto';
import { IUser } from '~/interfaces/user.interface';
import HttpException from '~/exceptions/HttpException';
import { createUser, findOneUser } from '~/data-layer/user.data-layer';

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

		return await createUser({
			args: {
				name: userData.name,
				designation: userData.designation,
				email,
				_id: uid,
			},
		});
	}
}

export default UserService;
