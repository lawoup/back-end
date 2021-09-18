import { Router } from 'express';
import Route from '~/interfaces/routes.interface';
import validationMiddleware from '~/middlewares/validation.middleware';
import authenticate from '~/middlewares/auth.middleware';
import { CreateClientDto } from '~/dtos/clients.dto';
import ClientController from '~/controllers/client.controller';

class clientRoute implements Route {
	public path = '/client';
	public router = Router();
	public clientController = new ClientController();

	constructor() {
		this.initializeRoutes();
	}

	private initializeRoutes() {
		/**
		 * @swagger
		 * /client:
		 *   produces:
		 *   - application/json
		 */

		/**
		 * @swagger
		 * /client:
		 *  get:
		 *   tags:
		 *    - client
		 *   description: get all clients
		 *   responses:
		 *    200:
		 *      description: fetch all the clients
		 */

		/**
		 * @swagger
		 * /client:
		 *  post:
		 *    tags:
		 *     - client
		 *    description: create a new client
		 *    parameters:
		 *    - name: name
		 *      in: body
		 *      type: string
		 *      required: true
		 *      description: name of the client
		 *    responses:
		 *     201:
		 *       description: client created
		 *     400:
		 *       description: not all data is given
		 */

		this.router.get(
			`${this.path}`,
			authenticate,
			this.clientController.fetchClients
		);
		this.router.post(
			`${this.path}`,
			validationMiddleware(CreateClientDto),
			authenticate,
			this.clientController.createClient
		);
	}
}

export default clientRoute;
