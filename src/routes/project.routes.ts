import { Router } from 'express';
import { createProject, getUserProjects, updateProject, deleteProject } from '../controllers/project.controller';
import { checkAuth } from '../middlewares/auth.middleware';
import { validateBody } from '../middlewares/validate.middleware';
import { createProjectSchema } from '../validators/project.validator';

const router = Router();

router.use(checkAuth);

// Ruta protegida y validada con Zod
router.post('/', validateBody(createProjectSchema as any), createProject);

router.get('/', getUserProjects);
router.put('/:id', updateProject);
router.delete('/:id', deleteProject);

export default router;