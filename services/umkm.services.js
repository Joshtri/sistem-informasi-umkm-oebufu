/* eslint-disable no-useless-catch */
import Umkm from '../models/umkm.model.js';
import * as umkmRepository from '../repositories/umkm.repository.js';


export const createdUmkm = async(umkmData)=>{
    try {
        const createdUmkm = await  umkmRepository.createUmkm(umkmData);
        return createdUmkm;
    } catch (error) {
        console.log(error);
    }
};

export const getUmkmPage = async(page = 1, limit = 10)=>{
    try {
        const offset = (page - 1) * limit;
        const umkmData = await umkmRepository.getAllPage(offset, limit);

        const totalDocuments = await umkmRepository.getTotalUmkm();
        // return keluargaData
        
        if(umkmData.length === 0) console.log('data is empty');

        return{
            data: umkmData,
            page,
            total: totalDocuments,
            pages: Math.ceil(totalDocuments / limit)
        }
    } catch (error) {
        console.log(error);
    }
}


// You can add more service functions here as needed
export const getUmkmById = async (_id) => {
    try {
      const umkmDetail = await umkmRepository.findUmkmById(_id);
      return umkmDetail;
    } catch (error) {
      throw error;
    }
};

export const deleteUmkm = async(id)=>{
    try {
        const deletedUmkm = await umkmRepository.deleteUmkmById(id);
        return deletedUmkm;
    } catch (error) {
        throw error;
    }
}


// Service to update Umkm data by ID
export const updateUmkm = async (id, updatedData) => {
    try {
        const updatedUmkm = await umkmRepository.updateUmkm(id, updatedData);
        return updatedUmkm;
    } catch (error) {
        throw new Error(`Error updating Umkm data: ${error.message}`);
    }
};

export const getTotalUmkm = async ()=>{
    try {
        const totalUmkm = await umkmRepository.getTotalUmkm();
        return totalUmkm;
    } catch (error) {
        throw new Error(`Error updating Umkm data: ${error.message}`);
    }
}

export const findUmkmByKeluargaId = async (keluargaId) => {
    try {
        const umkm = await Umkm.find({ keluarga_Id: keluargaId });
        return umkm;
    } catch (error) {
        throw error;
    }
};

export const findUmkmByKbliId = async (kbliId) => {
    try {
        const umkm = await Umkm.find({ kbli_Id: kbliId });
        return umkm;
    } catch (error) {
        throw error;
    }
};

export const findUmkmByPendudukId = async (pendudukId) => {
    try {
        const umkm = await Umkm.find({ nama_pemilik: pendudukId });
        return umkm;
    } catch (error) {
        throw error;
    }
};


export const getTotalKecil = async () => {
    try {
        const totalKecil = await umkmRepository.getTotalUmkmKecil();
        return totalKecil;
    } catch (error) {
        console.log(error);
        throw new Error('Error fetching kecil UMKM');
    }
};


export const getTotalMikro = async () => {
    try {
        const totalMikro = await umkmRepository.getTotalUmkmMikro();
        return totalMikro;
    } catch (error) {
        console.log(error);
        throw new Error('Error fetching Mikro UMKM');
    }
};

export const getTotalMenengah = async () => {
    try {
        const totalMenengah = await umkmRepository.getTotalUmkmMenengah();
        return totalMenengah;
    } catch (error) {
        console.log(error);
        throw new Error('Error fetching Menengah UMKM');
    }
};