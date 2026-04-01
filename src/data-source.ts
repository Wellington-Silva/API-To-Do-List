import "reflect-metadata";
import "dotenv/config";
import { DataSource } from "typeorm";
import { Task } from "./modules/Tasks/TaskEntity";
import { User } from "./modules/User/UserEntity";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: "ToDoList",
    synchronize: false,
    logging: false,
    entities: [User, Task]
});