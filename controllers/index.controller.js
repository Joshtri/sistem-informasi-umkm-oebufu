

/* eslint-disable no-useless-catch */
// import { login } from "../services/login.services.js";

// controllers/userController.js
import { findUserByUsernameAndPassword, registerUser } from '../services/login.services.js';

// export const loginUser = async (req, res) => {
//     const { username, password } = req.body;
//     try {
//         const user = await login(username, password);
//         // Jika login berhasil, Anda dapat mengirimkan respons yang sesuai ke klien
//         // res.status(200).json({ message: "Login successful", user });
        
//         // Simpan informasi pengguna dalam sesi
//         req.session.user = user;
//         res.redirect('/main/dashboard');
//     } catch (error) {
//         res.status(401).json({ message: "Login failed", error: error.message });
//     }
// };


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



export const loginPage = async (req,res)=>{
    const title = "Login Page"
    try {
        const messageProtect = await req.flash('messageProtect')
        res.render('index',{
            title,
            messageProtect
        });
    } catch (error) {
        console.log(error);
    }



};