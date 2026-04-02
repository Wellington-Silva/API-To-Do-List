import { taskData } from "./TaskDTO";
import { taskRepository } from "./TaskRepository";

class TaskService {

    async listTasks(userId: string) {
        const tasks = await taskRepository.find({ where: { userId } });
        if (!tasks) throw new Error("Nenhuma tarefa cadastrada");
        return tasks;
    };

    async getTaskById(id: string) {
        const task = await taskRepository.findOne({ where: { id } });
        if (!task) { throw new Error("Task not found"); };
        return task;
    };

    async createTask(taskData: taskData) {
        const { title, description, userId, date } = taskData;
        const task = taskRepository.create({
            title,
            description,
            userId,
            date,
            isCompleted: false
        });
        const savedTasks = await taskRepository.save(task);
        return savedTasks;
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