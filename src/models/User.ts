import mongoose from 'mongoose';
import { IUser } from '~/interfaces/user.interface';

const userSchema = new mongoose.Schema(
	{
		_id: String,
		name: String,
		designation: String,
		email: String,
		filePath: String,
	},
	{
		timestamps: true,
	}
);

const userModel = mongoose.model<IUser & mongoose.Document>('User', userSchema);

export default userModel;
