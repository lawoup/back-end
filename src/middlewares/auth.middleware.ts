import { Request, NextFunction, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import HttpException from '../exceptions/HttpException';
import { DataStoredInToken } from '~/interfaces/auth.interface';
import { User } from '~/models/User';

async function authMiddleware(
	req: Request,
	_res: Response,
	next: NextFunction
) {
	const cookies = req.cookies;

	if (cookies && cookies.Authorization) {
		const secret = process.env.JWT_SECRET;

		try {
			const verificationResponse = jwt.verify(
				cookies.Authorization,
				secret as jwt.Secret
			) as DataStoredInToken;
			const userId = verificationResponse.id;

			const findUser = await User.findOne({ id: userId });
			if (findUser) {
				req.user = findUser;
				next();
			} else {
				next(new HttpException(401, 'Wrong authentication token'));
			}
		} catch (error) {
			next(new HttpException(401, 'Wrong authentication token'));
		}
	} else {
		next(new HttpException(404, 'Authentication token missing'));
	}
}

export default authMiddleware;
