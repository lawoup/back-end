import { Request, Response, NextFunction } from 'express';
import IndexService from '~/services/index.service';

class UserController {
	public indexService = new IndexService();

	public registerDeviceToken = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		const { uid } = req.user
		const token = req.body.token as string;

		try {
			const result = await this.indexService.registerDeviceToken(uid, token);

			res.status(201).json({ data: result, message: 'registerDeviceToken' });
		} catch (error) {
			next(error);
		}
	};
}

export default UserController;
