import { Request, Response, NextFunction } from 'express';
import { CreateUserDto } from '~/dtos/users.dto';
import UserService from '~/services/user.service';

class UserController {
	public userService = new UserService();

	public createUser = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		const userData: CreateUserDto = req.body;
		const { uid, email } = req.user;

		try {
			const user = await this.userService.createUser(userData, uid, email!);

			res.status(201).json({ data: user, message: 'userCreated' });
		} catch (error) {
			next(error);
		}
	};
}

export default UserController;
