import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserDTO } from "./UserDTO";
import { userRepository } from "./UserRepository";

class UserService {

    async getUserById(userId: string) {
        const user = await userRepository.findOne({ where: { id: userId } });
        if (!user) { throw new Error("User not found"); };
        return user;
    };

    async createUser(userData: UserDTO) {
        const user = await userRepository.findOne({ where: { email: userData.email } });
        if (user) { throw new Error("User already exists"); };

        const passwordHashed = bcrypt.hashSync(userData.password, 10);
        userData.password = passwordHashed;

        const userCadastred = userRepository.create(userData);
        const newUser = await userRepository.save(userCadastred);

        const userJWT = {
            id: newUser.id,
            name: newUser.name,
            birthDate: newUser.birthDate,
            cellphone: newUser.cellphone,
            email: newUser.email
        }

        try {
            const token = jwt.sign(
                userJWT,
                process.env.JWT_SECRET as string, {
                expiresIn: "5d"
            });
            return { token, ...newUser };
        } catch (error) {
            console.error("Erro ao gerar o token JWT:", error);
            throw new Error("Erro ao criar o token JWT.");
        }
    };

    async updateProfile(userId: string, profileData: UserDTO) {
        const user = await this.getUserById(userId);
        if (profileData.name) user.name = profileData.name;
        if (profileData.email) user.email = profileData.email;
        if (profileData.cellphone) user.cellphone = profileData.cellphone;
        if (profileData.birthDate) {
            const date = new Date(profileData.birthDate);
            if (isNaN(date.getTime())) {
                throw new Error("Invalid birthDate");
            }
            user.birthDate = date;
        }
        return await userRepository.save(user);
    };

    async deleteAccount(userId: string) {
        const user = await this.getUserById(userId);
        Object.assign(user, { isDisabled: true });
        return await userRepository.save(user);
    };

};

export default new UserService();