
import * as kbliServices from '../services/kbli.services.js';
import * as keluargaServices from '../services/keluarga.services.js';
import * as pendudukServices from '../services/penduduk.services.js';
import * as umkmServices from '../services/umkm.services.js';



export const dashboardPage = async(req,res)=>{
    const title = "Dashboard";
    try {
        
        const totalKbli = await kbliServices.getTotalKbli();
        const totalKeluarga = await keluargaServices.getTotalKeluarga();
        const totalPenduduk = await pendudukServices.getTotalPenduduk();
        const totalUmkm = await umkmServices.getTotalUmkm();
        const totalUmkmMenengah = await umkmServices.getTotalMenengah();
        const totalUmkmKecil = await umkmServices.getTotalKecil();
        const totalUmkmMikro = await umkmServices.getTotalMikro();

        const user = req.session.user;
        res.render('dashboard',{
            title,
            totalKbli,
            totalKeluarga,
            totalPenduduk,
            totalUmkm,
            user,
            totalUmkmMenengah,
            totalUmkmKecil,
            totalUmkmMikro
        });
    } catch (error) {
        console.log(error);
    }


}


export const informasiAkunPage = (req,res)=>{
    const title = "Informasi Akun";
    try {
        const user = req.session.user;

        console.log(user);

        res.render('informasi_akun',{
            title,
            user
        });
    } catch (error) {
        console.log(error);
    }
};


export const logoutUser = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ message: 'Failed to log out.' });
        }
        res.redirect('/');
    });
};