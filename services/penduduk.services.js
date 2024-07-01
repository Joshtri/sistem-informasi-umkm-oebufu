/* eslint-disable no-useless-catch */
import Penduduk from '../models/penduduk.model.js';
import * as pendudukRepository from '../repositories/penduduk.repository.js';


export const createPenduduk = async(pendudukData)=>{
    try {
        const createdPenduduk = await pendudukRepository.createPenduduk(pendudukData);

        return createdPenduduk;
    } catch (error) {
        console.log(error);
    }
}

export const getPendudukPage = async(page = 1, limit = 10)=>{
    try {
        const offset = (page - 1) * limit;
        const pendudukData = await pendudukRepository.getAllPage(offset, limit);

        const totalDocuments = await pendudukRepository.getTotalPenduduk();
        // return keluargaData
        
        if(pendudukData.length === 0) console.log('data is empty');

        return{
            data: pendudukData,
            page,
            total: totalDocuments,
            pages: Math.ceil(totalDocuments / limit)
        }
    } catch (error) {
        console.log(error);
    }
}

export const getTotalPenduduk = async()=>{
    try {
        const totalPenduduk = await pendudukRepository.getTotalPenduduk();
        return totalPenduduk;
    } catch (error) {
        console.log(error);
    }
};


export const getAll = async()=>{
    try {
        const pendudukData = await pendudukRepository.getAll();
        return pendudukData;
    } catch (error) {
        console.log(error);
    }
};


// You can add more service functions here as needed
export const getPendudukById = async (_id) => {
    try {
      const pendudukDetail = await pendudukRepository.findPendudukById(_id);
      return pendudukDetail;
    } catch (error) {
      throw error;
    }
};


export const deletePenduduk = async(id)=>{
    try {
        const deletedPenduduk = await pendudukRepository.deletePendudukById(id);
        return deletedPenduduk;
    } catch (error) {
        throw error;
    }
}

// Service to update Penduduk data by ID
export const updatePenduduk = async (id, updatedData) => {
    try {
        const updatedPenduduk = await pendudukRepository.updatePenduduk(id, updatedData);
        return updatedPenduduk;
    } catch (error) {
        throw new Error(`Error updating Penduduk data: ${error.message}`);
    }
};




export const findPendudukByKeluargaId = async (keluargaId) => {
    try {
        const penduduk = await Penduduk.find({ keluargaId });
        return penduduk;
    } catch (error) {
        throw error;
    }
};