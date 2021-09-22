import mongoose from 'mongoose';
import { ITask } from '~/interfaces/task.interface';

const taskSchema = new mongoose.Schema(
	{
		user: {
			type: String,
			ref: 'User',
		},
		client: {
			_id: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Client',
			},
			name: {
				type: String,
			},
		},
		role: {
			_id: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Role',
			},
			name: {
				type: String,
			},
		},
		project: {
			_id: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Project',
			},
			name: {
				type: String,
			},
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
