import mongoose from 'mongoose';
import { IUser } from '~/interfaces/user.interface';

const userSchema = new mongoose.Schema(
	{
		name: String,
		designation: String,
		email: String,
	},
	{
		timestamps: true,
	}
);

const userModel = mongoose.model<IUser & mongoose.Document>('User', userSchema);

export default userModel;
