/* eslint-disable no-useless-catch */
import Publikasi from "../models/publikasi.model.js";




export const getAllPublikasi = async()=>{
    try {
        const publikasiData = await Publikasi.find();
        return publikasiData;
    } catch (error) {
        throw error;
    }
};


// Delete Publikasi data by ID
export const deletePublikasiById = async (id) => {
    try {
        const deletedPublikasi = await Publikasi.findByIdAndDelete(id);
        return deletedPublikasi;
    } catch (error) {
        console.log(error);
    }
};