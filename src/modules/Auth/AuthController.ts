import AuthService from "./AuthService";
import { Request, Response } from "express";

class AuthController {

    async login(req: Request, res: Response) {
        try {
            const { email, password } = req?.body;
            const login = await AuthService.login(email, password);
            res.json(login);
        } catch (error) {
            res.status(400).json({ error: true, message: (error as Error).message });
        }
    };

    async logout(req: Request, res: Response) {
        try {
            const logout = await AuthService.logout();
            res.json(logout);
        } catch (error) {
            res.status(400).json({ error: true, message: (error as Error).message });
        }
    };

};

export default new AuthController();