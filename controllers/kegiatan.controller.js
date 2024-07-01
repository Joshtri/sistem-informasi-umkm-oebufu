/* eslint-disable no-useless-catch */
import * as kegiatanServices from '../services/kegiatan.services.js';

import Kegiatan from '../models/kegiatan.model.js';

export const kegiatanPage = async(req,res)=>{
    const title = "Data Kegiatan"
    try {
        
        const messageCreateSuccess = await req.flash('messageCreateSuccess');
        const messageDeleteSuccess = await req.flash('messageDeleteSuccess');
        const messageUpdateSuccess = await req.flash('messageUpdateSuccess');
        const kegiatanData = await kegiatanServices.getAllKegiatan();
        res.render('data_kegiatan',{
            title,
            kegiatanData,
            messageCreateSuccess,
            messageDeleteSuccess,
            messageUpdateSuccess
        });
    } catch (error) {
        throw error;
    }

};

// Controller to update kegiatan
export const updateKegiatanPage = async (req, res) => {
    const { id } = req.params;
    let title = "Edit Kegiatan";
    try {
        const kegiatanEdit = await Kegiatan.findById(id)
        if (!kegiatanEdit) {
          return res.status(404).json({ message: 'Kegiatan not found' });
        }

        res.render('edit_kegiatan',{
            title,
            kegiatanEdit
            

        });
    } catch (error) {
        console.log(error);
    }
};

// Controller untuk mengupdate data kegiatan
export const updateDataKegiatan = async (req, res) => {
    const { id } = req.params;
    const { nama_kegiatan, tanggal_kegiatan_old, tanggal_kegiatan_new, deskripsi_kegiatan } = req.body;

    try {
        let updatedKegiatan;
        
        // Periksa apakah ada perubahan tanggal_kegiatan
        if (tanggal_kegiatan_new) {
            updatedKegiatan = await Kegiatan.findByIdAndUpdate(
                id,
                { nama_kegiatan, tanggal_kegiatan: tanggal_kegiatan_new, deskripsi_kegiatan },
                { new: true }
            );
        } else {
            updatedKegiatan = await Kegiatan.findByIdAndUpdate(
                id,
                { nama_kegiatan, tanggal_kegiatan: tanggal_kegiatan_old, deskripsi_kegiatan },
                { new: true }
            );
        }

        if (!updatedKegiatan) {
            return res.status(404).json({ message: 'Kegiatan tidak ditemukan' });
        }

        req.flash('messageUpdateSuccess', 'Data kegiatan berhasil diupdate.');
        res.redirect('/adm/data/kegiatan');
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Terjadi kesalahan saat memperbarui kegiatan' });
    }
};





// Create a new kegiatan
export const createKegiatan = async (req, res) => {
    try {
        const { nama_kegiatan, tanggal_kegiatan, deskripsi_kegiatan, foto_kegiatan } = req.body;

        const kegiatan = new Kegiatan({
            nama_kegiatan,
            tanggal_kegiatan,
            deskripsi_kegiatan,
            foto_kegiatan
        });

        await kegiatan.save();
        res.status(201).send(kegiatan);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const deleteKegiatan = async (req, res, next) => {
    const { id } = req.params;

    try {

        // Jika tidak ada UMKM yang berelasi, lanjutkan menghapus data penduduk
        const deletedKegiatan = await kegiatanServices.deleteKegiatan(id);

        await req.flash('messageDeleteSuccess', 'Data Kegiatan berhasil dihapus.');
        res.redirect('/adm/data/kegiatan');
    } catch (error) {
        next(error);
    }
};

export const addKegiatanPage = async(req,res)=>{
    const title = "Tambah Kegiatan"
    try {
        res.render('add_kegiatan',{
            title
        });
    } catch (error) {
        throw error;
    }
}