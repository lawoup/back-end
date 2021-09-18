import ProjectService from '~/services/project.service';
import { NextFunction, Request, Response } from 'express';
import { CreateProjectDto } from '~/dtos/projects.dto';

class ProjectController {
	public projectService = new ProjectService();

	public createProject = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		const projectData: CreateProjectDto = req.body;
		const { uid } = req.user;

		try {
			const project = await this.projectService.createProject(projectData, uid);

			res.status(201).json({ data: project, message: 'projectCreated' });
		} catch (error) {
			next(error);
		}
	};

	public fetchProjects = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		const { uid } = req.user;

		try {
			const projects = await this.projectService.findProjects(uid);

			res.status(200).json({ data: projects, message: 'fetchProjects' });
		} catch (error) {
			next(error);
		}
	};

	public deleteProject = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		const id = req.params.id as string;
		const { uid } = req.user;

		try {
			const result = await this.projectService.deleteProject(id, uid);

			res.status(200).json({ data: result, message: 'deleteProject' });
		} catch (error) {
			next(error);
		}
	};
}

export default ProjectController;
