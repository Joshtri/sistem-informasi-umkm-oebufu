import * as keluargaServices from '../services/keluarga.services.js';

import * as pendudukServices from '../services/penduduk.services.js'
import * as umkmServices from '../services/umkm.services.js';



// export const pendudukPage = async (req,res)=>{
//     const title = "Data Penduduk"
//     const page = parseInt(req.query.page) || 1;
//     const limit = parseInt(req.query.limit) || 10;
//     try {

//         const keluargaData = await keluargaServices.getAll();
//         const { data: pendudukData, total, page: currentPage, pages: totalPages } = await pendudukServices.getPendudukPage(page,limit);


//         const messageCreateSuccess = await req.flash('messageCreateSuccess');
//         const messageDeleteSuccess = await req.flash('messageDeleteSuccess');
//         const messageUpdateSuccess = await req.flash('messageUpdateSuccess');
//         const messageDeleteError = await req.flash('messageDeleteError');


//         res.render('data_penduduk',{
//             title,
//             keluargaData,
//             totalPages,
//             totalItems: total,
//             limit,
//             pendudukData,
//             currentPage,

//             //PESAN UNTUK CRUD.
//             messageCreateSuccess,
//             messageDeleteSuccess,
//             messageUpdateSuccess,
//             messageDeleteError
            
//         });
//     } catch (error) {
//         console.log(error);
//     }

// };


export const pendudukPage = async (req, res) => {
    const title = "Data Penduduk";
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const showAll = req.query.showAll === 'true'; // Check if showAll parameter is set to true

    try {
        let pendudukData, total, totalPages, currentPage;

        if (showAll) {
            // Get all data without pagination
            const allPendudukData = await pendudukServices.getPendudukPage();

            pendudukData = allPendudukData.data;
            total = allPendudukData.total;
            totalPages = 1; // Since all data is shown on one page
            currentPage = 1; // Set currentPage to 1 for all data
        } else {
            // Get paginated data
            const { data: paginatedPendudukData, total: paginatedTotal, page: fetchedPage, pages: paginatedTotalPages } = await pendudukServices.getPendudukPage(page, limit);

            pendudukData = paginatedPendudukData;
            total = paginatedTotal;
            totalPages = paginatedTotalPages;
            currentPage = fetchedPage; // Set currentPage to fetchedPage
        }

        const keluargaData = await keluargaServices.getAll();

        const messageCreateSuccess = await req.flash('messageCreateSuccess');
        const messageDeleteSuccess = await req.flash('messageDeleteSuccess');
        const messageUpdateSuccess = await req.flash('messageUpdateSuccess');
        const messageDeleteError = await req.flash('messageDeleteError');

        res.render('data_penduduk', {
            title,
            keluargaData,
            totalPages,
            totalItems: total,
            limit,
            pendudukData,
            currentPage,

            //PESAN UNTUK CRUD.
            messageCreateSuccess,
            messageDeleteSuccess,
            messageUpdateSuccess,
            messageDeleteError
            
        });
    } catch (error) {
        console.log(error);
    }
};



export const createPenduduk = async(req,res)=>{
    try {
        const pendudukData = req.body;
        const newPenduduk = await pendudukServices.createPenduduk(pendudukData);

        await req.flash(`messageCreateSuccess`,`Data Penduduk ${newPenduduk.nama_penduduk} berhasil ditambahkan.`);
        res.redirect('/adm/data/penduduk');
    } catch (error) {
        console.log(error);
    }

}


// Controller function to get KBLI detail by ID
export const getPendudukDetailById = async (req, res) => {
    const { id } = req.params;
    let title = "Detail Penduduk";
    try {
      const pendudukDetail = await pendudukServices.getPendudukById(id);
      if (!pendudukDetail) {
        return res.status(404).json({ message: 'penduduk not found' });
      }
    //   return res.status(200).json(kbliDetail);

    res.render('detail_penduduk',{
        title,
        pendudukDetail
    })
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};


// Controller untuk menghapus KBLI berdasarkan ID
// export const deletePenduduk = async (req, res, next) => {
//     const { id } = req.params; // Ambil ID dari parameter request

//     try {
//         // Panggil repository untuk menghapus KBLI berdasarkan ID
//         const deletedPenduduk = await pendudukServices.deletePenduduk(id);
        
//         // Jika KBLI berhasil dihapus, kirim response sukses
//         // res.json({ message: 'KBLI berhasil dihapus', data: deletedKbli });
//         await req.flash('messageDeleteSuccess','Data Penduduk berhasil di hapus.');
//         res.redirect('/adm/data/penduduk')
//     } catch (error) {
//         // Tangani error jika terjadi saat menghapus KBLI
//         next(error); // Lanjutkan ke middleware error handler
//     }
// };

export const deletePenduduk = async (req, res, next) => {
    const { id } = req.params;

    try {
        // Periksa apakah ada UMKM yang berelasi dengan penduduk ini
        const relatedUmkm = await umkmServices.findUmkmByPendudukId(id);

        if (relatedUmkm.length > 0) {
            await req.flash('messageDeleteError', 'Tidak dapat menghapus data penduduk karena masih ada UMKM yang berelasi.');
            return res.redirect('/adm/data/penduduk');
        }

        // Jika tidak ada UMKM yang berelasi, lanjutkan menghapus data penduduk
        const deletedPenduduk = await umkmServices.deleteUmkm(id);

        await req.flash('messageDeleteSuccess', 'Data penduduk berhasil dihapus.');
        res.redirect('/adm/data/penduduk');
    } catch (error) {
        next(error);
    }
};


export const getPendudukByIdEdit = async(req,res)=>{
    const { id } = req.params;
    let title = "Edit Penduduk";
    try {
        const pendudukEdit = await pendudukServices.getPendudukById(id);
        if (!pendudukEdit) {
          return res.status(404).json({ message: 'penduduk not found' });
        }

        const keluargaData = await keluargaServices.getAll();

        res.render('edit_penduduk',{
            title,
            pendudukEdit,
            keluargaData
            

        });
    } catch (error) {
        console.log(error);
    }
};

export const updatePenduduk = async(req,res)=>{
    const { id } = req.params;
    const updatedData = req.body;
    try {
        const updatedKeluarga = await pendudukServices.updatePenduduk(id, updatedData);
        if (!updatedKeluarga) {
            return res.status(404).json({ message: 'Keluarga data not found' });
        }
        // res.json(updatedKeluarga);
        await req.flash('messageUpdateSuccess','Data Keluarga berhasil di update.');
        res.redirect('/adm/data/penduduk')
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};