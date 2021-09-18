import { IUser } from '~/interfaces/user.interface';
import User from '~/models/User';
import mongoose, { FilterQuery, UpdateQuery } from 'mongoose';

const createUser = ({ args = {} }: { args: any }): Promise<IUser> => {
	return User.create(args).then((result) => result.save());
};

const findOneUser = ({
	args = {},
}: {
	args: FilterQuery<IUser & mongoose.Document>;
}) => {
	return User.findOne(args);
};

const findUserAndUpdate = ({
	args = {},
	updateArgs = {},
}: {
	args: FilterQuery<IUser & mongoose.Document>;
	updateArgs: UpdateQuery<IUser>;
}) => {
	return User.findOneAndUpdate(args, updateArgs, { new: true });
};

export { createUser, findOneUser, findUserAndUpdate };
