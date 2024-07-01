// services/userService.js
import bcrypt from 'bcrypt';
import { findUserByUsername, createUser } from '../repositories/user.repository.js';

export const findUserByUsernameAndPassword = async (username, password) => {
    try {
        const user = await findUserByUsername(username);
        if (!user) {
            return null; // Pengguna tidak ditemukan
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return null; // Kata sandi tidak cocok
        }
        
        return user;
    } catch (error) {
        throw new Error(`Error finding user: ${error.message}`);
    }
};

export const registerUser = async (username, password) => {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const userData = { username, password: hashedPassword };
        return await createUser(userData);
    } catch (error) {
        throw new Error(`Error registering user: ${error.message}`);
    }
};
