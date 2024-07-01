import User from "../models/user.model.js";
import bcrypt from 'bcrypt';

export const findUserByUsername = async (username) => {
    try {
        return await User.findOne({ username });
    } catch (error) {
        throw new Error(`Error finding user by username: ${error.message}`);
    }
};

export const createUser = async (userData) => {
    try {
        const user = new User(userData);
        return await user.save();
    } catch (error) {
        throw new Error(`Error creating user: ${error.message}`);
    }
};