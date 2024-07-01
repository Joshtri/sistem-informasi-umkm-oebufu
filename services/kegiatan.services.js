/* eslint-disable no-useless-catch */
import * as kegiatanRepository from '../repositories/kegiatan.repository.js';




export const getAllKegiatan = async()=>{
    try {
        const kegiatanData = await kegiatanRepository.getAllKegiatan();
        return kegiatanData;
    } catch (error) {
        throw error;
    }
};

export const createKegiatan = async(kegiatanData)=>{
    try {
        const newKegiatan = await kegiatanRepository.createKegiatan(kegiatanData);
        return newKegiatan;
    } catch (error) {
        throw error;
    }
}

export const deleteKegiatan = async(id)=>{
    try {
        const deletedKegiatan = await kegiatanRepository.deleteKegiatanById(id);
        return deletedKegiatan;
    } catch (error) {
        throw error;
    }
}