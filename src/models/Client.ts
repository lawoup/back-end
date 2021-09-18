import mongoose from 'mongoose';
import { IClient } from '~/interfaces/client.interface';

const clientSchema = new mongoose.Schema(
	{
		name: String,
		user: {
			type: String,
			ref: 'User',
		},
	},
	{
		timestamps: true,
	}
);

const clientModel = mongoose.model<IClient & mongoose.Document>(
	'Client',
	clientSchema
);

export default clientModel;
