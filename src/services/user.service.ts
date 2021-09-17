import { isEmpty } from 'lodash';
import { CreateUserDto } from '~/dtos/users.dto';
import { User as UserInterface } from '~/interfaces/user.interface';
import { User } from '~/models/User';
import HttpException from '~/exceptions/HttpException';

class UserService {
	public async findAllUser(): Promise<User[]> {
		return await User.find();
	}

	public async findUserById(userId: number): Promise<User> {
		const user = await User.findOne({ id: userId });
		if (!user) throw new HttpException(409, 'User could not be found');

		return user;
	}

	public async createUser(userData: CreateUserDto): Promise<User> {
		if (isEmpty(userData)) {
			throw new HttpException(400, 'No valid user data found');
		}

		const user = await User.findOne({ email: userData.email });
		if (user) {
			throw new HttpException(409, 'Email already present');
		}

		return User.create({
			email: userData.email,
		}).save();
	}

	public async updateUser(
		userId: number,
		userData: UserInterface
	): Promise<User> {
		if (isEmpty(userData)) {
			throw new HttpException(400, 'This is not a valid user data');
		}

		const user = await User.findOne({
			id: userId,
		});
		if (!user) {
			throw new HttpException(409, 'User not found');
		}

		await user.save();

		return user;
	}

	public async deleteUserData(userId: number): Promise<null> {
		const user = await User.findOne({
			id: userId,
		});
		if (!user) {
			throw new HttpException(409, 'User not found');
		}

		await User.delete({
			id: userId,
		});

		return null;
	}
}

export default UserService;
