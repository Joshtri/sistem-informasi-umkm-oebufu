/* eslint-disable no-useless-catch */
import Kegiatan from '../models/kegiatan.model.js';


export const getAllKegiatan = async()=>{
    try {
        const kegiatanData = await Kegiatan.find();
        return kegiatanData;
    } catch (error) {
        throw error;
    }
};


export const createKegiatan = async(kegiatanData)=>{
    try {
        const newKegiatan = await Kegiatan.create(kegiatanData);
        return newKegiatan
    } catch (error) {
        throw error;
    }
}


// Delete KBLI data by ID
export const deleteKegiatanById = async (id) => {
    try {
        const deletedKegiatan = await Kegiatan.findByIdAndDelete(id);
        return deletedKegiatan;
    } catch (error) {
        console.log(error);
    }
};