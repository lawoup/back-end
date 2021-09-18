import { IUser } from '~/interfaces/user.interface';
import User from '~/models/User';
import mongoose, { FilterQuery } from 'mongoose';

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

export { createUser, findOneUser };
