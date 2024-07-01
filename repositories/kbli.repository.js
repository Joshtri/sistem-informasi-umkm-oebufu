/* eslint-disable no-useless-catch */
import Kbli from '../models/kbli.model.js';

export const getAllPage = async(offset, limit)=>{

    try {
        const kbliData = await Kbli.find().skip(offset).limit(limit);
        return kbliData;
    } catch (error) {
        throw new Error(`Error fetching KBLI data: ${error.message}`);
    }

};


export const getAll = async ()=>{
    try {
        const kbliData = await Kbli.find();
        return kbliData;
    } catch (error) {
        console.log(error);
    }
};


export const createKbli = async (kbliData)=>{
    try {
        const createKbliData = await Kbli.create(kbliData);
        return createKbliData;
    } catch (error) {
        console.log(error);
    }
};


export const getTotalKbli = async()=>{
    try {
        const totalKbli = await Kbli.countDocuments();
        return totalKbli;
    } catch (error) {
        console.log(error);
    }
};


// Find KBLI data by ID
export const findKbliById = async (id) => {
    try {
        const kbliData = await Kbli.findById(id);
        return kbliData;
    } catch (error) {
        console.log(error);
    }
};

// Delete KBLI data by ID
export const deleteKbliById = async (id) => {
    try {
        const deletedKbli = await Kbli.findByIdAndDelete(id);
        return deletedKbli;
    } catch (error) {
        console.log(error);
    }
};


// Update KBLI data by ID
export const updateKbli = async (id, updatedData) => {
    try {
        const updatedKbli = await Kbli.findByIdAndUpdate(id, updatedData, { new: true });
        return updatedKbli;
    } catch (error) {
        throw new Error(`Error updating KBLI data: ${error.message}`);
    }
};


