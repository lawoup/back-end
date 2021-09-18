import { Router } from 'express';
import Route from '~/interfaces/routes.interface';
import validationMiddleware from '~/middlewares/validation.middleware';
import authenticate from '~/middlewares/auth.middleware';
import { CreateClientDto } from '~/dtos/clients.dto';
import ClientController from '~/controllers/client.controller';

class ClientRoute implements Route {
	public path = '/client';
	public router = Router();
	public clientController = new ClientController();

	constructor() {
		this.initializeRoutes();
	}

	private initializeRoutes() {
		/**
		 * @swagger
		 * /Client:
		 *   produces:
		 *   - application/json
		 */

		/**
		 * @swagger
		 * /client:
		 *  get:
		 *   tags:
		 *    - Client
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
		 *     - Client
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

		/**
		 * @swagger
		 * /client/{id}:
		 *  delete:
		 *    tags:
		 *     - Client
		 *    description: delete a client
		 *    parameters:
		 *    - name: id
		 *      in: params
		 *      type: string
		 *      required: true
		 *      description: id of client
		 *    responses:
		 *     201:
		 *       description: client deleted
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
		this.router.delete(
			`${this.path}/:id`,
			authenticate,
			this.clientController.deleteClient
		);
	}
}

export default ClientRoute;
