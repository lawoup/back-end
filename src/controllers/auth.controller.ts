import { Request, Response, NextFunction } from 'express';
import { CreateUserDto } from '~/dtos/users.dto';
import { User } from '~/models/User';
import HttpException from '~/exceptions/HttpException';

// import { RequestWithUser } from '~/interfaces/auth.interface';

class AuthController {
	public signUp = async (req: Request, res: Response, next: NextFunction) => {
		const userData: CreateUserDto = req.body;

		try {
			const user = userData;
			res.status(201).json({ data: user, message: 'Signup' });
		} catch (error) {
			next(error);
		}
	};

	public login = async (req: Request, _res: Response, next: NextFunction) => {
		if (req.body.email === '' || req.body.password === '') {
			next(new HttpException(400, 'No valid data is passed'));
		}
	};

	public logout = async (req: Request, res: Response, next: NextFunction) => {
		const userData = req.user as User;

		try {
			res.setHeader('Set-Cookie', ['Authorization=;Max-age=0']);
			res.status(200).json({ data: userData, message: 'logout' });
		} catch (error) {
			next(error);
		}
	};
}

export default AuthController;
