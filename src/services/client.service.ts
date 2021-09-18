import { CreateClientDto } from '~/dtos/clients.dto';
import { IClient } from '~/interfaces/client.interface';
import { isEmpty } from 'lodash';
import HttpException from '~/exceptions/HttpException';
import {
	createClient,
	deleteOneClient,
	findClient,
} from '~/data-layer/client.data-layer';

class clientService {
	public async createClient(
		clientData: CreateClientDto,
		uid: string
	): Promise<IClient> {
		if (isEmpty(clientData)) {
			throw new HttpException(400, 'No valid client data found');
		}

		return createClient({
			args: {
				name: clientData.name,
				user: uid,
			},
		});
	}

	public async findClients(uid: string): Promise<IClient[]> {
		return findClient({ args: { user: uid } });
	}

	public async deleteClient(id: string, uid: string): Promise<Boolean> {
		await deleteOneClient({ args: { _id: id, user: uid } });

		return true;
	}
}

export default clientService;
