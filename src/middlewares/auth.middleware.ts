import { NextFunction, Request, Response } from 'express';
import * as admin from 'firebase-admin';
import HttpException from '../exceptions/HttpException';

async function authenticate(req: Request, _res: Response, next: NextFunction) {
	const token = req.headers['authentication']! as string;
	try {
		if (!token) {
			next(new HttpException(404, 'Authentication token missing'));
		}

		req.user =  await admin
			.auth()
			.verifyIdToken(token);
		next();
	} catch (error) {
		console.log(error);
		next(new HttpException(401, 'Wrong authentication token'));
	}
}

export default authenticate;
