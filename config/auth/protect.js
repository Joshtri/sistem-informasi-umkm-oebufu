// protect.js

const protect = (req, res, next) => {
    if (req.session.user) {
        // Tampilkan data admin dari session di console
        console.log('Data User:', req.session.user);
        // Jika admin sudah login, lanjutkan ke middleware berikutnya atau ke endpoint yang diminta
        next();
    } else {
        // Jika admin belum login, redirect ke halaman login
        
        // req.flash('messageProtect','Anda harus login terlebih dulu')
        res.redirect('/');
        console.log('Anda harus login terlebih dulu');
    }
};

export default protect;