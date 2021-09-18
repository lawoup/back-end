import { Router } from 'express';

import Route from '~/interfaces/routes.interface';
import IndexController from '~/controllers/index.controller';
import authMiddleware from '~/middlewares/auth.middleware';

class IndexRoute implements Route {
	public path = '/';
	public router = Router();
	public indexController = new IndexController();

	constructor() {
		this.initializeRoutes();
	}

	private initializeRoutes() {
		/**
		 * @swagger
		 * /:
		 *   produces:
		 *   - application/json
		 */

		/**
		 * @swagger
		 * /:
		 *  get:
		 *    tags:
		 *     - Index
		 *    description: test the route
		 *    responses:
		 *     200:
		 *       description: reached
		 */

		/**
		 * @swagger
		 * /register:
		 *  post:
		 *    tags:
		 *     - Index
		 *    description: register a device token
		 *    parameters:
		 *    - name: token
		 *      in: body
		 *      type: string
		 *      required: true
		 *      description: token received from firebase
		 *    responses:
		 *     201:
		 *       description: device token registered
		 *     404:
		 *       description: token not given
		 */

		this.router.get(`${this.path}`, async (_req, res) => {
			res.status(200).json({ message: 'You have reached' });
		});
		this.router.post(
			`${this.path}register`,
			authMiddleware,
			this.indexController.registerDeviceToken
		);
	}
}

export default IndexRoute;
