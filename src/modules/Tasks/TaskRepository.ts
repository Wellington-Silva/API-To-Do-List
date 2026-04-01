import { AppDataSource } from "../../data-source";
import { Task } from "./TaskEntity";

export const taskRepository = AppDataSource.getRepository(Task);