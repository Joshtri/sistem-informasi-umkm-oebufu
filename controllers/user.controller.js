import bcrypt from 'bcrypt';
import User from '../models/user.model.js';

// Update user password
export const updateUserPassword = async (req, res) => {
    const { userId, newPassword, confirmNewPassword } = req.body;

    if (newPassword !== confirmNewPassword) {
        return res.status(400).json({ error: 'Passwords do not match' });
    }

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        res.status(500).json({ error: `Error updating password: ${error.message}` });
    }
};


// Update user details
export const updateUser = async (req, res) => {
    const { userId, namaLengkap, username } = req.body;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        user.nama_lengkap = namaLengkap;
        user.username = username;

        await user.save();

        res.json({ message: "User details updated successfully" });
    } catch (error) {
        res.status(500).json({ error: `Error updating user: ${error.message}` });
    }
};


export const userPage = async (req,res)=>{

    const title = "Data User";
    try {

        const userData = await User.find();
        const messageCreateSuccess = await req.flash('messageCreateSuccess');

        res.render('data_user',{
            title,
            userData,
            messageCreateSuccess
        });
    } catch (error) {
        console.log(error);
    }

};


export const createUser = async (req, res) => {
    const { username, nama_lengkap, password } = req.body;
  
    try {
      // Enkripsi password menggunakan bcrypt
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const newUser = await User.create({
        username,
        nama_lengkap,
        password: hashedPassword, // Simpan password yang sudah dienkripsi ke database
        role: 'admin' // Default role admin, sesuai dengan schema
      });

      await req.flash('messageCreateSuccess', `Akun pengguna berhasil dibuat ${newUser.username}`)
      res.redirect('/adm/data/user')

    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ message: 'Gagal membuat akun pengguna', error: error.message });
    }
};


// Delete user account
export const deleteUser = async (req, res) => {
    const { userId } = req.params;

    try {
        const deletedUser = await User.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({ message: 'User account deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: `Error deleting user: ${error.message}` });
    }
};
  