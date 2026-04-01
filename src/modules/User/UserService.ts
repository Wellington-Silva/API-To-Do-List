import { UserDTO } from "./UserDTO";
import bcrypt from "bcryptjs";
import { userRepository } from "./UserRepository";

class UserService {

    async getUserById (userId: string) {
        const user = await userRepository.findOne({ where: { id: userId } });
        if (!user) { throw new Error("User not found"); };
        return user;
    };

    async createUser(userData: UserDTO) {
        const user = await userRepository.findOne({ where: { email: userData.email }});
        if (user) { throw new Error("User already exists"); };

        const passwordHashed = bcrypt.hashSync(userData.password, 10);
        userData.password = passwordHashed;

        const newUser = userRepository.create(userData);
        return await userRepository.save(newUser);
    };

    async updateProfile(userId: string, profileData: UserDTO) {
        const user = await this.getUserById(userId);
        Object.assign(user, profileData);
        return await userRepository.save(user);
    };

    async deleteAccount(userId: string) {
        const user = await this.getUserById(userId);
        Object.assign(user, { isDisabled: true });
        return await userRepository.save(user);
    };

};

export default new UserService();