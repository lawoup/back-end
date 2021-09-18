import { CreateProjectDto } from '~/dtos/projects.dto';
import { IProject } from '~/interfaces/project.interface';
import { isEmpty } from 'lodash';
import HttpException from '~/exceptions/HttpException';
import { createProject, findProject } from '~/data-layer/project.data-layer';

class ProjectService {
	public async createProject(
		projectData: CreateProjectDto,
		uid: string
	): Promise<IProject> {
		if (isEmpty(projectData)) {
			throw new HttpException(400, 'No valid project data found');
		}

		return createProject({
			args: {
				name: projectData.name,
				user: uid,
			},
		});
	}

	public async findProjects(uid: string): Promise<IProject[]> {
		return findProject({ args: { user: uid } });
	}
}

export default ProjectService;
