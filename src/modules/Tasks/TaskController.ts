import { Request, Response } from 'express';
import TaskService from './TaskService';

class TaskController {

    async listTasks(req: Request, res: Response) {
        try {
            const tasks = await TaskService.listTasks();
            res.json(tasks);
        } catch (error) {
            res.status(500).json({ error: true, message: 'Failed to list tasks' });
        }
    };

    async getTaskById (req: Request, res: Response) {
        try {
            const task = await TaskService.getTaskById(req.params.id);
            res.json(task);
        } catch (error) {
            res.status(500).json({ error: true, message: 'Failed to show task' });
        }
    };

    async createTask(req: Request, res: Response) {
        try {
            const task = await TaskService.createTask(req.body);
            res.status(201).json(task);
        } catch (error) {
            res.status(500).json({ error: true, message: 'Failed to create task' });
        }
    };

    async updateTask(req: Request, res: Response) {
        try {
            const task = await TaskService.updateTask(req.params.id, req.body);
            res.json(task);
        } catch (error) {
            res.status(500).json({ error: true, message: 'Failed to update task' });
        }
    };

    async deleteTask(req: Request, res: Response) {
        try {
            const task = await TaskService.deleteTask(req.params.id);
            res.json(task);
        } catch (error) {
            res.status(500).json({ error: true, message: 'Failed to delete task' });
        }
    };
};

export default new TaskController();