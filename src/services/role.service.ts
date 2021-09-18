import { isEmpty } from 'lodash';
import HttpException from '~/exceptions/HttpException';
import {
	createRole,
	deleteOneRole,
	findRole,
} from '~/data-layer/role.data-layer';
import { CreateRoleDto } from '~/dtos/roles.dto';
import { IRole } from '~/interfaces/role.interface';

class RoleService {
	public async createRole(
		roleData: CreateRoleDto,
		uid: string
	): Promise<IRole> {
		if (isEmpty(roleData)) {
			throw new HttpException(400, 'No valid role data found');
		}

		return createRole({
			args: {
				name: roleData.name,
				user: uid,
			},
		});
	}

	public async findRoles(uid: string): Promise<IRole[]> {
		return findRole({ args: { user: uid } });
	}

	public async deleteRole(id: string, uid: string): Promise<Boolean> {
		await deleteOneRole({ args: { _id: id, user: uid } });

		return true;
	}
}

export default RoleService;
