import mongoose from 'mongoose';
import { IProject } from '~/interfaces/project.interface';

const projectSchema = new mongoose.Schema(
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

const projectModel = mongoose.model<IProject & mongoose.Document>(
	'Project',
	projectSchema
);

export default projectModel;
