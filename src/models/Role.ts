import mongoose from 'mongoose';
import { IRole } from '~/interfaces/role.interface';

const roleSchema = new mongoose.Schema(
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

const roleModel = mongoose.model<IRole & mongoose.Document>('Role', roleSchema);

export default roleModel;
