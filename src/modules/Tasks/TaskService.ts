import { taskData } from "./TaskDTO";
import { taskRepository } from "./TaskRepository";

class TaskService {

    async listTasks(filters?: Partial<taskData>) {
        const where: any = {};

        if (filters?.isCompleted !== undefined) {
            where.isCompleted = filters.isCompleted;
        }

        const tasks = await taskRepository.find({ where });

        return tasks;
    };

    async getTaskById(id: string) {
        const task = await taskRepository.findOne({ where: { id } });
        if (!task) { throw new Error("Task not found"); };
        return task;
    };

    async createTask(taskData: taskData) {
        const task = taskRepository.create(taskData);
        return task;
    };

    async updateTask(id: string, taskData: taskData) {
        const task = await taskRepository.findOne({ where: { id } });
        if (!task) { throw new Error("Task not found"); };
        Object.assign(task, taskData);
        return taskRepository.save(task);
    };

    async deleteTask(id: string) {
        const task = await taskRepository.findOne({ where: { id } });
        if (!task) { throw new Error("Task not found"); };
        return taskRepository.remove(task);
    };

};

export default new TaskService();