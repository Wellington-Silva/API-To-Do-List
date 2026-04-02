import { Router } from 'express';
import TaskController from './TaskController';
import authMiddleware from '../../middleware/authMiddleware';

const router = Router();

router.get('/', authMiddleware, TaskController.listTasks);
router.get('/:id', authMiddleware, TaskController.getTaskById);
router.post('/', authMiddleware, TaskController.createTask);
router.put('/:id', authMiddleware, TaskController.updateTask);
router.delete('/:id', authMiddleware, TaskController.deleteTask);

export default router;