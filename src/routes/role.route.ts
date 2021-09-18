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
		 * /Role:
		 *   produces:
		 *   - application/json
		 */

		/**
		 * @swagger
		 * /role:
		 *  get:
		 *   tags:
		 *    - Role
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
		 *     - Role
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

		/**
		 * @swagger
		 * /role/{id}:
		 *  delete:
		 *    tags:
		 *     - Role
		 *    description: delete a role
		 *    parameters:
		 *    - name: id
		 *      in: params
		 *      type: string
		 *      required: true
		 *      description: id of role
		 *    responses:
		 *     201:
		 *       description: role deleted
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
		this.router.delete(
			`${this.path}/:id`,
			authenticate,
			this.roleController.deleteRole
		);
	}
}

export default RoleRoute;
