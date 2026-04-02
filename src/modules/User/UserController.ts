import UserService from './UserService';
import { Request, Response } from 'express';

class UserController {
    async getUserById (req: Request, res: Response) {
        try {
            const userId = req?.params?.id;
            const user = await UserService.getUserById(userId as string);
            res.json(user);
        } catch (error) {
            res.status(500).json({ error: true, message: 'Failed to get user' });
        }
    };

    async createUser(req: Request, res: Response) {
        try {
            const userData = req?.body;
            const newUser = await UserService.createUser(userData);
            res.status(201).json(newUser);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: true, message: 'Failed to create user' });
        }
    };

    async updateProfile(req: Request, res: Response) {
        try {
            
        } catch (error) {
            
        }
    };

    async deleteAccount(req: Request, res: Response) {
        try {
            
        } catch (error) {
            
        }
    };
};

export default new UserController();