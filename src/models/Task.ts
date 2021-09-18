import mongoose from 'mongoose';
import { ITask } from '~/interfaces/task.interface';

const taskSchema = new mongoose.Schema(
	{
		user: {
			type: String,
			ref: 'User',
		},
		client: {
			type: String,
			ref: 'Client',
		},
		role: {
			type: String,
			ref: 'Role',
		},
		project: {
			type: String,
			ref: 'Project',
		},
		taskDate: Date,
		description: String,
		duration: Number,
		date: Number,
		month: Number,
		year: Number,
	},
	{
		timestamps: true,
	}
);

const taskModel = mongoose.model<ITask & mongoose.Document>('Task', taskSchema);

export default taskModel;
