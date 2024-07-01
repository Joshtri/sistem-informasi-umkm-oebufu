
import * as keluargaServices from '../services/keluarga.services.js'
import * as pendudukServices from '../services/penduduk.services.js'; // Import service untuk penduduk
import * as umkmServices from '../services/umkm.services.js';
import * as kbliServices from '../services/kbli.services.js';


// export const keluargaPage = async(req,res)=>{
//     const title = "Data Keluarga";
//     const page = parseInt(req.query.page) || 1;
//     const limit = parseInt(req.query.limit) || 10;

//     try {

//         const { data: keluargaData, total, page: currentPage, pages: totalPages } = await keluargaServices.getKeluargaPage(page,limit);

//         const messageCreateSuccess = await req.flash('messageCreateSuccess');
//         const messageDeleteSuccess = await req.flash('messageDeleteSuccess');
//         const messageUpdateSuccess = await req.flash('messageUpdateSuccess');
//         const messageDeleteError = await req.flash('messageDeleteError');

//         res.render("data_keluarga",{
//             title,
//             currentPage,
//             keluargaData,
//             totalPages,
//             totalItems: total,
//             limit,

//             //PESAN UNTUK CRUD.
//             messageCreateSuccess,
//             messageDeleteSuccess,
//             messageUpdateSuccess,
//             messageDeleteError
//         });
//     } catch (error) {
//         console.log(error);   
//     }


// }

export const keluargaPage = async(req,res)=>{
    const title = "Data Keluarga";
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const showAll = req.query.showAll === 'true'; // Check if showAll parameter is set to true

    try {
        let keluargaData, total, totalPages;

        if (showAll) {
            // Get all data without pagination
            const allKeluargaData = await keluargaServices.getKeluargaPage();

            keluargaData = allKeluargaData.data;
            total = allKeluargaData.total;
            totalPages = 1; // Since all data is shown on one page
        } else {
            // Get paginated data
            const { data: paginatedKeluargaData, total: paginatedTotal, page: currentPage, pages: paginatedTotalPages } = await keluargaServices.getKeluargaPage(page, limit);

            keluargaData = paginatedKeluargaData;
            total = paginatedTotal;
            totalPages = paginatedTotalPages;
        }

        const messageCreateSuccess = await req.flash('messageCreateSuccess');
        const messageDeleteSuccess = await req.flash('messageDeleteSuccess');
        const messageUpdateSuccess = await req.flash('messageUpdateSuccess');
        const messageDeleteError = await req.flash('messageDeleteError');

        res.render("data_keluarga",{
            title,
            currentPage: page, // Pass current page number
            keluargaData,
            totalPages,
            totalItems: total,
            limit,

            //PESAN UNTUK CRUD.
            messageCreateSuccess,
            messageDeleteSuccess,
            messageUpdateSuccess,
            messageDeleteError
        });
    } catch (error) {
        console.log(error);   
    }
}



export const createKeluarga = async(req,res)=>{
    const keluargaData = req.body;

    try {
        const newKeluarga = await keluargaServices.createKeluarga(keluargaData);

        await req.flash(`messageCreateSuccess`,`Data Keluarga ${newKeluarga.nama_kepala_keluarga} berhasil ditambahkan.`);
        res.redirect('/adm/data/keluarga');
    } catch (error) {
        console.log(error);
    }
};


// Controller function to get KBLI detail by ID
export const getKeluargaDetailById = async (req, res) => {
    const { id } = req.params;
    let title = "Detail Keluarga";
    try {
      const keluargaDetail = await keluargaServices.getKeluargaById(id);
      if (!keluargaDetail) {
        return res.status(404).json({ message: 'Keluarga not found' });
      }
    //   return res.status(200).json(kbliDetail);

    res.render('detail_keluarga',{
        title,
        keluargaDetail 
    })
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};


// Controller untuk menghapus KBLI berdasarkan ID
// export const deleteKeluarga = async (req, res, next) => {
//     const { id } = req.params; // Ambil ID dari parameter request

//     try {
//         // Panggil repository untuk menghapus KBLI berdasarkan ID
//         const deletedKeluarga = await keluargaServices.deleteKeluarga(id);
        
//         // Jika KBLI berhasil dihapus, kirim response sukses
//         // res.json({ message: 'KBLI berhasil dihapus', data: deletedKbli });
//         await req.flash('messageDeleteSuccess','Data Keluarga berhasil di hapus.');
//         res.redirect('/adm/data/keluarga')
//     } catch (error) {
//         // Tangani error jika terjadi saat menghapus KBLI
//         next(error); // Lanjutkan ke middleware error handler
//     }
// };

// Controller untuk menghapus KBLI berdasarkan ID

// export const deleteKeluarga = async (req, res, next) => {
//     const { id } = req.params; // Ambil ID dari parameter request

//     try {
//         // Periksa apakah ada penduduk yang berelasi dengan data keluarga ini
//         const relatedPenduduk = await pendudukServices.findPendudukByKeluargaId(id);

//         if (relatedPenduduk.length > 0) {
//             // Jika ada penduduk yang berelasi, beri pesan error dan tidak menghapus data keluarga
//             await req.flash('messageDeleteError', 'Tidak dapat menghapus data keluarga karena masih ada penduduk yang berelasi di data penduduk.');
//             console.log('Tidak bisa hapus, masih ada penduduk yang berelasi.');
//             return res.redirect('/adm/data/keluarga');
//         }

//         // Jika tidak ada penduduk yang berelasi, lanjutkan menghapus data keluarga
//         const deletedKeluarga = await keluargaServices.deleteKeluarga(id);
        
//         // Jika keluarga berhasil dihapus, kirim response sukses
//         await req.flash('messageDeleteSuccess', 'Data keluarga berhasil dihapus.');
//         res.redirect('/adm/data/keluarga');
//     } catch (error) {
//         // Tangani error jika terjadi saat menghapus keluarga
//         next(error); // Lanjutkan ke middleware error handler
//     }
// };

export const deleteKeluarga = async (req, res, next) => {
    const { id } = req.params;

    try {
        // Periksa apakah ada penduduk yang berelasi dengan data keluarga ini
        const relatedPenduduk = await pendudukServices.findPendudukByKeluargaId(id);

        if (relatedPenduduk.length > 0) {
            await req.flash('messageDeleteError', 'Tidak dapat menghapus data keluarga karena masih ada penduduk yang berelasi.');
            return res.redirect('/adm/data/keluarga');
        }

        // Periksa apakah ada UMKM yang berelasi dengan data keluarga ini
        const relatedUmkm = await umkmServices.findUmkmByKeluargaId(id);

        if (relatedUmkm.length > 0) {
            await req.flash('messageDeleteError', 'Tidak dapat menghapus data keluarga karena masih ada UMKM yang berelasi.');
            return res.redirect('/adm/data/keluarga');
        }

        // Jika tidak ada penduduk atau UMKM yang berelasi, lanjutkan menghapus data keluarga
        const deletedKeluarga = await keluargaServices.deleteKeluarga(id);

        await req.flash('messageDeleteSuccess', 'Data keluarga berhasil dihapus.');
        res.redirect('/adm/data/keluarga');
    } catch (error) {
        next(error);
    }
};

export const getKeluargaByIdEdit = async(req,res)=>{
    const { id } = req.params;
    let title = "Edit Keluarga";
    try {
        const keluargaEdit = await keluargaServices.getKeluargaById(id);
        if (!keluargaEdit) {
          return res.status(404).json({ message: 'keluarga not found' });
        }

        res.render('edit_keluarga',{
            title,
            keluargaEdit
            

        });
    } catch (error) {
        console.log(error);
    }
};

export const updateKeluarga = async(req,res)=>{
    const { id } = req.params;
    const updatedData = req.body;
    try {
        const updatedKeluarga = await keluargaServices.updateKeluarga(id, updatedData);
        if (!updatedKeluarga) {
            return res.status(404).json({ message: 'Keluarga data not found' });
        }
        // res.json(updatedKeluarga);
        await req.flash('messageUpdateSuccess','Data Keluarga berhasil di update.');
        res.redirect('/adm/data/keluarga')
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};