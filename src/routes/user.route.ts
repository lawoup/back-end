import { Router } from 'express';
import UserController from '~/controllers/user.controller';
import { CreateUserDto } from '~/dtos/users.dto';
import Route from '~/interfaces/routes.interface';
import validationMiddleware from '~/middlewares/validation.middleware';
import authenticate from '~/middlewares/auth.middleware';

class UserRoute implements Route {
	public path = '/user';
	public router = Router();
	public userController = new UserController();

	constructor() {
		this.initializeRoutes();
	}

	private initializeRoutes() {
		/**
		 * @swagger
		 * /user:
		 *   produces:
		 *   - application/json
		 */

		/**
		 * @swagger
		 * /user:
		 *  get:
		 *   tags:
		 *    - User
		 *   description: get a user
		 *   responses:
		 *    200:
		 *      description: fetch a single user based on token
		 */

		/**
		 * @swagger
		 * /user:
		 *  post:
		 *    tags:
		 *     - User
		 *    description: create a new user
		 *    parameters:
		 *    - name: email
		 *      in: body
		 *      type: string
		 *      required: true
		 *      description: email of the user
		 *    - name: designation
		 *      in: body
		 *      type: string
		 *      required: true
		 *      description: designation of the user
		 *    responses:
		 *     201:
		 *       description: user created
		 *     400:
		 *       description: not all data is given
		 */

		this.router.get(`${this.path}`, authenticate, this.userController.getUser);
		this.router.post(
			`${this.path}`,
			validationMiddleware(CreateUserDto),
			authenticate,
			this.userController.createUser
		);
	}
}

export default UserRoute;
