import { AppDataSource } from "../../data-source";
import { User } from "./UserEntity";

export const userRepository = AppDataSource.getRepository(User);