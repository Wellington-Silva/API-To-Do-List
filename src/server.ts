import "reflect-metadata";
import cors from "cors";
import express from 'express';
import { AppDataSource } from "./data-source";

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3333;

AppDataSource.initialize()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err: any) => {
        console.log("Error during Data Source initialization", { error: err });
    });