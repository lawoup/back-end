import mongoose, { FilterQuery, UpdateQuery } from 'mongoose';
import { ITask } from '~/interfaces/task.interface';
import Task from '~/models/Task';

const createTask = ({ args = {} }: { args: any }): Promise<ITask> => {
	return Task.create(args).then((result) => result.save());
};

const findTask = ({
	args = {},
	sortArgs = { createdAt: -1 },
}: {
	args?: FilterQuery<ITask & mongoose.Document>;
	sortArgs?: object;
}) => {
	return Task.find(args).sort(sortArgs);
};

const deleteOneTask = ({
	args = {},
}: {
	args: FilterQuery<ITask & mongoose.Document>;
}) => {
	return Task.deleteOne(args);
};

const findTaskById = (id: string) => {
	return Task.findById(id);
};

const findTaskAndUpdate = ({
	args = {},
	updateArgs = {},
}: {
	args: FilterQuery<ITask & mongoose.Document>;
	updateArgs: UpdateQuery<ITask>;
}) => {
	return Task.findOneAndUpdate(args, updateArgs, { new: true });
};

const findOneTask = ({
	args = {},
}: {
	args: FilterQuery<ITask & mongoose.Document>;
}) => {
	return Task.findOne(args);
};

export {
	createTask,
	findTask,
	findTaskAndUpdate,
	deleteOneTask,
	findOneTask,
	findTaskById,
};
