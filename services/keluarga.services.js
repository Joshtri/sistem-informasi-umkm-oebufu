/* eslint-disable no-useless-catch */
import * as keluargaRepository from '../repositories/keluarga.repository.js';






export const createKeluarga = async(keluargaData)=>{
    try {
        const createKeluarga = await keluargaRepository.createKeluarga(keluargaData);
        return createKeluarga;
    } catch (error) {
        console.log(error);        
    }
};


export const getKeluargaPage = async (page = 1, limit = 10) => {
    try {
        const offset = (page - 1) * limit;
        const keluargaData = await keluargaRepository.getAllPage(offset, limit);

        const totalDocuments = await keluargaRepository.getTotalKeluarga();
        // return keluargaData
        
        if(keluargaData.length === 0) console.log('data is empty');
        
        return{
            data: keluargaData,
            page,
            total: totalDocuments,
            pages: Math.ceil(totalDocuments / limit)

        }
    } catch (error) {
        throw new Error(`Service error: ${error.message}`);
    }
};


// You can add more service functions here as needed
export const getKeluargaById = async (_id) => {
    try {
      const keluargaDetail = await keluargaRepository.findKeluargaById(_id);
      return keluargaDetail;
    } catch (error) {
      throw error;
    }
};




export const getTotalKeluarga = async()=>{
    try {
        const totalKeluarga = await keluargaRepository.getTotalKeluarga();
        return totalKeluarga;
    } catch (error) {
        console.log(error);
    }
};


export const getAll = async()=>{
    try {
        const getAllKeluarga = await keluargaRepository.getAll();

        return getAllKeluarga;
    } catch (error) {
        console.log(error);
    }
};


export const deleteKeluarga = async(id)=>{
    try {
        const deletedKeluarga = await keluargaRepository.deleteKeluargaById(id);
        return deletedKeluarga;
    } catch (error) {
        throw error;
    }
}

// Service to update Keluarga data by ID
export const updateKeluarga = async (id, updatedData) => {
    try {
        const updatedKeluarga = await keluargaRepository.updateKeluarga(id, updatedData);
        return updatedKeluarga;
    } catch (error) {
        throw new Error(`Error updating Keluarga data: ${error.message}`);
    }
};