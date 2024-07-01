

import * as kbliServices from '../services/kbli.services.js';
import * as umkmServices from '../services/umkm.services.js';

export const getKbliPageController = async (req, res) => {
    const offset = parseInt(req.query.offset) || 0;
    const limit = parseInt(req.query.limit) || 10;

    try {
        const kbliData = await kbliServices.getKbliPage(offset, limit);
        res.status(200).json(kbliData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const kbliPage = async (req, res) => {
    const title = "Data KBLI";
    const page = parseInt(req.query.page) || 1;
    const limit = req.query.limit === 'all' ? 0 : (parseInt(req.query.limit) || 10); // Check for 'all' and set limit to 0

    try {
        const { data: kbliData, total, page: currentPage, pages: totalPages } = await kbliServices.getKbliPage(page, limit);

        const messageCreateSuccess = await req.flash('messageCreateSuccess');
        const messageDeleteSuccess = await req.flash('messageDeleteSuccess');
        const messageUpdateSuccess = await req.flash('messageUpdateSuccess');
        const messageDeleteError = await req.flash('messageDeleteError');

        res.render('data_kbli', {
            title,
            kbliData,
            currentPage,
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
        console.error(error);
        res.status(500).send('An error occurred while fetching KBLI data.');
    }
};


export const createKbliController = async (req, res) => {
    const kbliData = req.body;

    try {
        const newKbli = await kbliServices.createKbli(kbliData);
        // res.status(201).json(createdKbli);
        await req.flash(`messageCreateSuccess`,`Data KBLI ${newKbli.keterangan} berhasil ditambahkan.`);

        res.redirect('/adm/data/kbli');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Controller function to get KBLI detail by ID
export const getKbliDetailById = async (req, res) => {
    const { id } = req.params;
    let title = "Detail KBLI";
    try {
      const kbliDetail = await kbliServices.getKbliById(id);
      if (!kbliDetail) {
        return res.status(404).json({ message: 'KBLI not found' });
      }
    //   return res.status(200).json(kbliDetail);

    res.render('detail_kbli',{
        title,
        kbliDetail 
    })
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};



// Controller untuk menghapus KBLI berdasarkan ID
// export const deleteKbli = async (req, res, next) => {
//     const { id } = req.params; // Ambil ID dari parameter request

//     try {
//         // Panggil repository untuk menghapus KBLI berdasarkan ID
//         const deletedKbli = await kbliServices.deleteKbli(id);
        
//         // Jika KBLI berhasil dihapus, kirim response sukses
//         // res.json({ message: 'KBLI berhasil dihapus', data: deletedKbli });

//         await req.flash('messageDeleteSuccess','Data KBLI berhasil di hapus.');
//         res.redirect('/adm/data/kbli')
//     } catch (error) {
//         // Tangani error jika terjadi saat menghapus KBLI
//         next(error); // Lanjutkan ke middleware error handler
//     }
// };

export const deleteKbli = async (req, res, next) => {
    const { id } = req.params;

    try {
        // Periksa apakah ada UMKM yang berelasi dengan KBLI ini
        const relatedUmkm = await umkmServices.findUmkmByKbliId(id);

        if (relatedUmkm.length > 0) {
            await req.flash('messageDeleteError', 'Tidak dapat menghapus data KBLI karena masih ada UMKM yang berelasi.');
            return res.redirect('/adm/data/kbli');
        }

        // Jika tidak ada UMKM yang berelasi, lanjutkan menghapus data KBLI
        const deletedKbli = await kbliServices.deleteKbli(id);

        await req.flash('messageDeleteSuccess', 'Data KBLI berhasil dihapus.');
        res.redirect('/adm/data/kbli');
    } catch (error) {
        next(error);
    }
};


export const getKbliByIdEdit = async(req,res)=>{
    const { id } = req.params;
    let title = "Edit KBLI";
    try {
        const kbliEdit = await kbliServices.getKbliById(id);
        if (!kbliEdit) {
          return res.status(404).json({ message: 'KBLI not found' });
        }

        res.render('edit_kbli',{
            title,
            kbliEdit
            

        });
    } catch (error) {
        console.log(error);
    }
};

// Controller to update KBLI data by ID
export const updateKbli = async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;
    try {
        const updatedKbli = await kbliServices.updateKbli(id, updatedData);
        if (!updatedKbli) {
            return res.status(404).json({ message: 'KBLI data not found' });
        }
        // res.json(updatedKbli);
        await req.flash('messageUpdateSuccess','Data KBLI berhasil di update.');
        res.redirect('/adm/data/kbli')
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
