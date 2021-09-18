import mongoose, { FilterQuery, UpdateQuery } from 'mongoose';
import { IClient } from '~/interfaces/client.interface';
import Client from '~/models/Client';

const createClient = ({ args = {} }: { args: any }): Promise<IClient> => {
	return Client.create(args).then((result) => result.save());
};

const findClient = ({
	args = {},
	sortArgs = { createdAt: -1 },
}: {
	args?: FilterQuery<IClient & mongoose.Document>;
	sortArgs?: object;
}) => {
	return Client.find(args).sort(sortArgs);
};

const deleteOneClient = ({
	args = {},
}: {
	args: FilterQuery<IClient & mongoose.Document>;
}) => {
	return Client.deleteOne(args);
};

const findClientById = (id: string) => {
	return Client.findById(id);
};

const findClientAndUpdate = ({
	args = {},
	updateArgs = {},
}: {
	args: FilterQuery<IClient & mongoose.Document>;
	updateArgs: UpdateQuery<IClient>;
}) => {
	return Client.findOneAndUpdate(args, updateArgs, { new: true });
};

const findOneClient = ({
	args = {},
}: {
	args: FilterQuery<IClient & mongoose.Document>;
}) => {
	return Client.findOne(args);
};

export {
	createClient,
	findClient,
	findClientAndUpdate,
	deleteOneClient,
	findOneClient,
	findClientById,
};
