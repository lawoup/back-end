import ClientService from '~/services/client.service';
import { NextFunction, Request, Response } from 'express';
import { CreateClientDto } from '~/dtos/clients.dto';

class clientController {
	public clientService = new ClientService();

	public createClient = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		const clientData: CreateClientDto = req.body;
		const { uid } = req.user;

		try {
			const client = await this.clientService.createClient(clientData, uid);

			res.status(201).json({ data: client, message: 'clientCreated' });
		} catch (error) {
			next(error);
		}
	};

	public fetchClients = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		const { uid } = req.user;

		try {
			const clients = await this.clientService.findClients(uid);

			res.status(200).json({ data: clients, message: 'fetchClients' });
		} catch (error) {
			next(error);
		}
	};

	public deleteClient = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		const id = req.params.id as string;
		const { uid } = req.user;

		try {
			const result = await this.clientService.deleteClient(id, uid);

			res.status(200).json({ data: result, message: 'deleteClient' });
		} catch (error) {
			next(error);
		}
	};
}

export default clientController;
