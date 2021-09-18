import RoleService from '~/services/role.service';
import { NextFunction, Request, Response } from 'express';
import { CreateRoleDto } from '~/dtos/roles.dto';

class RoleController {
	public roleService = new RoleService();

	public createRole = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		const roleData: CreateRoleDto = req.body;
		const { uid } = req.user;

		try {
			const role = await this.roleService.createRole(roleData, uid);

			res.status(201).json({ data: role, message: 'roleCreated' });
		} catch (error) {
			next(error);
		}
	};

	public fetchRoles = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		const { uid } = req.user;

		try {
			const roles = await this.roleService.findRoles(uid);

			res.status(200).json({ data: roles, message: 'fetchRoles' });
		} catch (error) {
			next(error);
		}
	};
}

export default RoleController;
