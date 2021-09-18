export interface IUser {
	_id: string;
	name: string;
	email: string;
	designation: string;
	filePath?: string;
	createdAt?: Date;
	updatedAt?: Date;
}
