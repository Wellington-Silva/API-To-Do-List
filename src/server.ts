import "reflect-metadata";
import cors from "cors";
import express from 'express';
import { AppDataSource } from "./data-source";
import UseRouter from "./modules/User/UserRouter";
import AuthRouter from "./modules/Auth/AuthRouter";
import TaskRouter from "./modules/Tasks/TaskRouter";

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3333;

AppDataSource.initialize()
    .then(() => {

        app.use("/api/auth", AuthRouter);
        app.use("/api/users", UseRouter);
        app.use("/api/tasks", TaskRouter);

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err: any) => {
        console.log("Error during Data Source initialization", { error: err });
    });