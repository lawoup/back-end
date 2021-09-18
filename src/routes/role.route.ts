import { Router } from 'express';
import Route from '~/interfaces/routes.interface';
import validationMiddleware from '~/middlewares/validation.middleware';
import authenticate from '~/middlewares/auth.middleware';
import { CreateRoleDto } from '~/dtos/roles.dto';
import RoleController from '~/controllers/role.controller';

class RoleRoute implements Route {
	public path = '/role';
	public router = Router();
	public roleController = new RoleController();

	constructor() {
		this.initializeRoutes();
	}

	private initializeRoutes() {
		/**
		 * @swagger
		 * /role:
		 *   produces:
		 *   - application/json
		 */

		/**
		 * @swagger
		 * /role:
		 *  get:
		 *   tags:
		 *    - role
		 *   description: get all roles
		 *   responses:
		 *    200:
		 *      description: fetch all the roles
		 */

		/**
		 * @swagger
		 * /role:
		 *  post:
		 *    tags:
		 *     - role
		 *    description: create a new role
		 *    parameters:
		 *    - name: name
		 *      in: body
		 *      type: string
		 *      required: true
		 *      description: name of the user
		 *    responses:
		 *     201:
		 *       description: role created
		 *     400:
		 *       description: not all data is given
		 */

		this.router.get(
			`${this.path}`,
			authenticate,
			this.roleController.fetchRoles
		);
		this.router.post(
			`${this.path}`,
			validationMiddleware(CreateRoleDto),
			authenticate,
			this.roleController.createRole
		);
	}
}

export default RoleRoute;
