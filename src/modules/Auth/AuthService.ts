import { userRepository } from "../User/UserRepository";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

class AuthService {
    async login(email: string, password: string) {
        const user = await userRepository.findOne({ where: { email } });
        if (!user) {
            throw new Error("User not found");
        };

        if (!bcrypt.compareSync(password, user.password)) {
            throw new Error("Invalid password");
        };

        const userJWT = {
            id: user.id,
            email: user.email,
            cellphone: user.cellphone,
            birthDate: user.birthDate
        };

        const token = jwt.sign(userJWT, process.env.JWT_SECRET!, {
            expiresIn: "5d"
        });

        return { error: false, message: "Signin successful", token, user: userJWT };
    };

    async logout() {
        return { error: false, message: "Logout successful" };
    };
};

export default new AuthService();