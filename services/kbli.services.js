/* eslint-disable no-useless-catch */
import * as kbliRepository from '../repositories/kbli.repository.js';


export const getKbliPage = async (page = 1, limit = 10) => {
    try {
        const offset = (page - 1) * limit;
        const kbliData = await kbliRepository.getAllPage(offset, limit);

        const totalDocuments = await kbliRepository.getTotalKbli();
        // return kbliData
        
        if(kbliData.length === 0) console.log('data is empty');
        
        return{
            data: kbliData,
            page,
            total: totalDocuments,
            pages: Math.ceil(totalDocuments / limit)

        }
    } catch (error) {
        throw new Error(`Service error: ${error.message}`);
    }
};


export const createKbli = async (kbliData) => {
    try {
        const createdKbli = await kbliRepository.createKbli(kbliData);
        return createdKbli;
    } catch (error) {
        throw new Error(`Service error: ${error.message}`);
    }
};


export const getAll = async()=>{
    try {
        const getAllKbli = await kbliRepository.getAll();
        return getAllKbli;
    } catch (error) {
        console.log(error);
    }

};


// You can add more service functions here as needed
export const getKbliById = async (_id) => {
    try {
      const kbliDetail = await kbliRepository.findKbliById(_id);
      return kbliDetail;
    } catch (error) {
      throw error;
    }
};



export const deleteKbli = async(id)=>{
    try {
        const deletedKbli = await kbliRepository.deleteKbliById(id);
        return deletedKbli;
    } catch (error) {
        throw error;
    }
}


// Service to update KBLI data by ID
export const updateKbli = async (id, updatedData) => {
    try {
        const updatedKbli = await kbliRepository.updateKbli(id, updatedData);
        return updatedKbli;
    } catch (error) {
        throw new Error(`Error updating KBLI data: ${error.message}`);
    }
};

export const getTotalKbli = async()=>{
    try {
        const totalKbli = await kbliRepository.getTotalKbli();
        return totalKbli;
    } catch (error) {
        console.log(error);
    }
};
