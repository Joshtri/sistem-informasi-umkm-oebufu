

/* eslint-disable no-useless-catch */
// import { login } from "../services/login.services.js";

import User from "../models/user.model.js";
import bcrypt from 'bcrypt';

// controllers/userController.js
import { findUserByUsernameAndPassword, registerUser } from '../services/login.services.js';



export const loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await findUserByUsernameAndPassword(username, password);
        if (user) {
            // Proses login berhasil, lakukan tindakan lanjutan seperti menyimpan sesi, token, dll.
            // res.status(200).json({ message: 'Login successful', user });

            req.session.user = user;

            console.log(user);
            res.redirect('/main/dashboard');
        } else {
            // Login gagal, berikan pesan error
            await req.flash('messageProtect', 'Username atau password salah.')
            res.redirect('/')
            // res.status(401).json({ message: 'Invalid username or password' });
        }
    } catch (error) {
        res.status(500).json({ message: `Error logging in: ${error.message}` });
    }
};

export const registerUserController = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await registerUser(username, password);
        res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
        res.status(500).json({ message: `Error registering user: ${error.message}` });
    }
};





export const loginPage = async (req, res) => {
    const title = "Login Page";
    try {
        // Mengecek apakah data users kosong
        const usersCount = await User.countDocuments();
        if (usersCount === 0) {
            // Membuat username dan password secara otomatis
            const nama_lengkap ="defaultuser";
            const username = "defaultUser";
            const password = "defaultPassword";

            // Hash password menggunakan bcrypt
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            // Simpan user ke dalam database
            const newUser = new User({ username, password: hashedPassword, nama_lengkap });
            await newUser.save();
            
            console.log(`User created with username: ${username} and password: ${password}`);
        } else {
            console.log("User data already exists. No new user created.");
        }

        const messageProtect = await req.flash('messageProtect');
        res.render('index', {
            title,
            messageProtect
        });
    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error");
    }
};
