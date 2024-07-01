/* eslint-disable no-undef */
/* eslint-disable no-const-assign */
import Publikasi from "../models/publikasi.model.js";
import fs from 'fs';
import path from 'path';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import * as publikasiRepository from '../repositories/publikasi.repository.js';
import * as publikasiServices from '../services/publikasi.services.js';



/* eslint-disable no-useless-catch */
export const publikasiPage = async(req,res)=>{
    const title = "Data Publikasi"
    try {

        const messageCreateSuccess = await req.flash('messageCreateSuccess');
        const messageDeleteSuccess = await req.flash('messageDeleteSuccess');
        const messageUpdateSuccess = await req.flash('messageUpdateSuccess');
        const messageDeleteError = await req.flash('messageDeleteError');


        const publikasiData = await publikasiRepository.getAllPublikasi();

        res.render('data_publikasi',{
            title,
            messageCreateSuccess,
            messageDeleteSuccess,
            messageUpdateSuccess,
            messageDeleteError,
            publikasiData
        });
    } catch (error) {
        throw error;
    }
};


export const addPublikasiPage = async(req,res)=>{
    const title = "Tambah Data Publikasi"
    try {
        res.render('add_publikasi',{
            title
        });
    } catch (error) {
        throw error;
    }
};
// Function to handle file upload and create a new publication entry
export const createPublikasi = async (req, res) => {
    try {
        const { judul_publikasi, tanggal_publikasi, deskripsi_publikasi } = req.body;
        let berkas_publikasi_pdf = ''; // Gunakan let untuk variabel yang akan diubah nilainya
        let berkas_publikasi_doc = ''; // Gunakan let untuk variabel yang akan diubah nilainya
        let berkas_publikasi_excel = ''; // Gunakan let untuk variabel yang akan diubah nilainya

        // Mengecek jenis berkas dan menyimpan path ke bidang yang sesuai
        if (req.files) {
            const { berkas_publikasi_pdf: pdfFiles, berkas_publikasi_excel: excelFiles, berkas_publikasi_doc: docFiles } = req.files;

            if (pdfFiles && pdfFiles.length > 0) {
                const berkasPath = pdfFiles[0].path;
                berkas_publikasi_pdf = berkasPath; // Assigning value to let variable
            }

            if (docFiles && docFiles.length > 0) {
                const berkasPath = docFiles[0].path;
                berkas_publikasi_doc = berkasPath; // Assigning value to let variable
            }

            if (excelFiles && excelFiles.length > 0) {
                const berkasPath = excelFiles[0].path;
                berkas_publikasi_excel = berkasPath; // Assigning value to let variable
            }
        } else {
            return res.status(400).json({ message: 'File upload is required.' });
        }

        // Membuat objek baru Publikasi sesuai dengan skema
        const newPublikasi = new Publikasi({
            judul_publikasi,
            tanggal_publikasi,
            deskripsi_publikasi,
            berkas_publikasi_pdf,
            berkas_publikasi_doc,
            berkas_publikasi_excel
        });

        // Menyimpan data publikasi ke MongoDB
        await newPublikasi.save();

        await req.flash('messageCreateSuccess','Data Publikasi berhasil ditambahkan')
        // Redirect atau response sesuai kebutuhan aplikasi
        res.redirect('/adm/data/publikasi');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// export const deletePublikasi = async(req,res)=>{
//     const { id } = req.params;

//     try {
//         // Periksa apakah ada UMKM yang berelasi dengan KBLI ini


//         // Jika tidak ada UMKM yang berelasi, lanjutkan menghapus data KBLI
//         const deletedPublikasi = await publikasiServices.deletePublikasi(id);

//         await req.flash('messageDeleteSuccess', 'Data Publikasi berhasil dihapus.');
//         res.redirect('/adm/data/publikasi');
//     } catch (error) {
//         // next(error);
//         throw error;
//     }
// }


export const deletePublikasi = async (req, res) => {
    const { id } = req.params;

    try {
        // Ambil informasi publikasi sebelum dihapus
        const publikasi = await publikasiServices.deletePublikasi(id);
        if (!publikasi) {
            req.flash('messageDeleteError', 'Data Publikasi tidak ditemukan.');
            return res.redirect('/adm/data/publikasi');
        }

        // Hapus file dari sistem file
        const filePaths = [
            publikasi.berkas_publikasi_pdf,
            publikasi.berkas_publikasi_excel,
            publikasi.berkas_publikasi_doc,
        ];

        filePaths.forEach(filePath => {
            if (filePath) {
                const absolutePath = path.join(__dirname, '..', '', filePath);
                fs.unlink(absolutePath, (err) => {
                    if (err) {
                        console.error(`Gagal menghapus file: ${absolutePath}`, err);
                    } else {
                        console.log(`File dihapus: ${absolutePath}`);
                    }
                });
            }
        });

        // Hapus data publikasi dari database
        const deletedPublikasi = await publikasiServices.deletePublikasi(id);

        req.flash('messageDeleteSuccess', 'Data Publikasi berhasil dihapus.');
        res.redirect('/adm/data/publikasi');
    } catch (error) {
        console.error(error);
        req.flash('messageDeleteError', 'Terjadi kesalahan saat menghapus Data Publikasi.');
        res.redirect('/adm/data/publikasi');
    }
};


// Controller to update kegiatan
export const detailPublikasiPage = async (req, res) => {
    const { id } = req.params;
    let title = "Detail Publikasi";
    try {
        const publikasiDetail = await Publikasi.findById(id)
        if (!publikasiDetail) {
          return res.status(404).json({ message: 'Kegiatan not found' });
        }

        res.render('detail_publikasi',{
            title,
            publikasiDetail
            

        });
    } catch (error) {
        console.log(error);
    }
};

// Controller to update kegiatan
export const editPublikasiPage = async (req, res) => {
    const { id } = req.params;
    let title = "Edit Publikasi";
    try {
        const publikasiEdit = await Publikasi.findById(id)
        if (!publikasiEdit) {
          return res.status(404).json({ message: 'Kegiatan not found' });
        }

        res.render('edit_publikasi',{
            title,
            publikasiEdit
            

        });
    } catch (error) {
        console.log(error);
    }
};


// Function to handle file upload and update an existing publication entry
// Function to handle update publikasi
export const updatePublikasi = async (req, res) => {
    try {
        const { id } = req.params;
        const { judul_publikasi, deskripsi_publikasi, tanggal_publikasi_old, tanggal_publikasi_new } = req.body;

        // Determine which tanggal_publikasi to use
        const tanggal_publikasi = tanggal_publikasi_new ? tanggal_publikasi_new : tanggal_publikasi_old;

        // Prepare update fields
        let updateFields = {
            judul_publikasi,
            deskripsi_publikasi,
            tanggal_publikasi
        };

        // Check if new files are uploaded
        if (req.files) {
            if (req.files.newBerkasPdf) {
                updateFields.berkas_publikasi_pdf = req.files.newBerkasPdf[0].path;
            }
            if (req.files.newBerkasExcel) {
                updateFields.berkas_publikasi_excel = req.files.newBerkasExcel[0].path;
            }
            if (req.files.newBerkasDoc) {
                updateFields.berkas_publikasi_doc = req.files.newBerkasDoc[0].path;
            }
        }

        // Update publikasi in MongoDB
        await Publikasi.findByIdAndUpdate(id, updateFields, { new: true });

        // Redirect or respond based on application needs
        res.redirect('/adm/data/publikasi');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
