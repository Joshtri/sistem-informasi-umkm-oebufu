import * as pendudukServices from '../services/penduduk.services.js';
import * as keluargaServices from '../services/keluarga.services.js';
import * as kbliServices from '../services/kbli.services.js';
import * as umkmServices from '../services/umkm.services.js';


// export const umkmPage = async(req,res)=>{
//     const title = "Data UMKM";
//     const page = parseInt(req.query.page) || 1;
//     const limit = parseInt(req.query.limit) || 10;
//     try {
//         const { data: umkmData, total, page: currentPage, pages: totalPages } = await umkmServices.getUmkmPage(page,limit);


//         const messageCreateSuccess = await req.flash('messageCreateSuccess');
//         const messageDeleteSuccess = await req.flash('messageDeleteSuccess');
//         const messageUpdateSuccess = await req.flash('messageUpdateSuccess');

//         res.render('data_umkm',{
//             title,
//             umkmData,
//             totalPages,
//             totalItems: total,
//             limit,
//             currentPage,

//             //PESAN UNTUK CRUD.
//             messageCreateSuccess,
//             messageDeleteSuccess,
//             messageUpdateSuccess
//         });
//     } catch (error) {
//         console.log(error);
//     }


// }

export const umkmPage = async (req, res) => {
    const title = "Data UMKM";
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const showAll = req.query.showAll === 'true'; // Check if showAll parameter is set to true

    try {
        let umkmData, total, totalPages, currentPage;

        if (showAll) {
            // Get all data without pagination
            const allUmkmData = await umkmServices.getUmkmPage();

            umkmData = allUmkmData.data;
            total = allUmkmData.total;
            totalPages = 1; // Since all data is shown on one page
            currentPage = 1; // Set currentPage to 1 for all data
        } else {
            // Get paginated data
            const { data: paginatedUmkmData, total: paginatedTotal, page: fetchedPage, pages: paginatedTotalPages } = await umkmServices.getUmkmPage(page, limit);

            umkmData = paginatedUmkmData;
            total = paginatedTotal;
            totalPages = paginatedTotalPages;
            currentPage = fetchedPage; // Set currentPage to fetchedPage
        }

        const messageCreateSuccess = await req.flash('messageCreateSuccess');
        const messageDeleteSuccess = await req.flash('messageDeleteSuccess');
        const messageUpdateSuccess = await req.flash('messageUpdateSuccess');

        res.render('data_umkm', {
            title,
            umkmData,
            totalPages,
            totalItems: total,
            limit,
            currentPage,

            //PESAN UNTUK CRUD.
            messageCreateSuccess,
            messageDeleteSuccess,
            messageUpdateSuccess
        });
    } catch (error) {
        console.log(error);
    }
};




export const addUmkmPage = async(req,res)=>{
    const title = "Tambah UMKM";

    try {

        const pendudukData = await pendudukServices.getAll();
        const keluargaData = await keluargaServices.getAll();
        const kbliData = await kbliServices.getAll();
    
        res.render('add_umkm',{
            title,
            pendudukData,
            keluargaData,
            kbliData,

        })
    } catch (error) {
        console.log(error);
    }



}

export const createdUmkm = async(req,res)=>{
    try {
        const umkmData = req.body;
        const newUmkm = await umkmServices.createdUmkm(umkmData);

        await req.flash(`messageCreateSuccess`,`Data UMKM dengan usaha ${newUmkm.nama_usaha} berhasil ditambahkan.`);
        res.redirect('/adm/data/umkm');
    } catch (error) {
        console.log(error);
    }
};


// Controller function to get KBLI detail by ID
export const getUmkmDetailById = async (req, res) => {
    const { id } = req.params;
    let title = "Detail UMKM";
    try {
      const umkmDetail = await umkmServices.getUmkmById(id);
      if (!umkmDetail) {
        return res.status(404).json({ message: 'umkm not found' });
      }
    //   return res.status(200).json(kbliDetail);

    res.render('detail_umkm',{
        title,
        umkmDetail
    })
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

// Controller untuk menghapus KBLI berdasarkan ID
export const deleteUmkm = async (req, res, next) => {
    const { id } = req.params; // Ambil ID dari parameter request

    try {
        // Panggil repository untuk menghapus KBLI berdasarkan ID
        const deletedUmkm = await umkmServices.deleteUmkm(id);
        
        // Jika KBLI berhasil dihapus, kirim response sukses
        // res.json({ message: 'KBLI berhasil dihapus', data: deletedKbli });

        await req.flash('messageDeleteSuccess','Data UMKM berhasil di hapus.');
        res.redirect('/adm/data/umkm')
    } catch (error) {
        // Tangani error jika terjadi saat menghapus KBLI
        next(error); // Lanjutkan ke middleware error handler
    }
};

export const getUmkmByIdEdit = async(req,res)=>{
    const { id } = req.params;
    let title = "Edit UMKM";
    try {
        const umkmEdit = await umkmServices.getUmkmById(id);
        if (!umkmEdit) {
          return res.status(404).json({ message: 'umkm not found' });
        }

        const keluargaData = await keluargaServices.getAll();
        const pendudukData = await pendudukServices.getAll();
        const kbliData = await kbliServices.getAll();

        res.render('edit_umkm',{
            title,
            umkmEdit,
            keluargaData,
            pendudukData,
            kbliData

        });
    } catch (error) {
        console.log(error);
    }
};


export const updateUmkm = async(req,res)=>{
    const { id } = req.params;
    const updatedData = req.body;
    try {
        const updatedUmkm = await umkmServices.updateUmkm(id, updatedData);
        if (!updatedUmkm) {
            return res.status(404).json({ message: 'Umkm data not found' });
        }
        // res.json(updatedUmkm);
        await req.flash('messageUpdateSuccess','Data Umkm berhasil di update.');
        res.redirect('/adm/data/umkm')
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getTotalUmkmMikro = async (req, res) => {
    try {
        const totalMikro = await umkmServices.getTotalMikro();
        res.json({ totalMikro });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getTotalUmkmKecil = async (req, res) => {
    try {
        const totalKecil = await umkmServices.getTotalKecil();
        res.json({ totalKecil });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getTotalUmkmMenengah = async (req, res) => {
    try {
        const totalMenengah = await umkmServices.getTotalMenengah();
        res.json({ totalMenengah });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
