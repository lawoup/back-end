import mongoose from 'mongoose';
import { IDeviceToken } from '~/interfaces/device-token.interface';

const deviceTokenSchema = new mongoose.Schema(
	{
		token: String,
		user: {
			type: String,
			ref: 'User',
		},
	},
	{
		timestamps: true,
	}
);

const deviceTokenModel = mongoose.model<IDeviceToken & mongoose.Document>(
	'DeviceToken',
	deviceTokenSchema
);

export default deviceTokenModel;
