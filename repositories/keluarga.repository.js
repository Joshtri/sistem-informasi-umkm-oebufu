import Keluarga from '../models/keluarga.model.js';

export const getAllPage = async(offset,limit)=>{
    try {
        const getDataKeluarga = await Keluarga.find().skip(offset).limit(limit);

        return getDataKeluarga;
    } catch (error) {
       console.log(error) 
    }
}


export const getAll = async()=>{
    try {
        const getDataKeluarga = await Keluarga.find();

        return getDataKeluarga;
    } catch (error) {
       console.log(error) 
    }
}



export const createKeluarga = async(keluargaData)=>{
    try {
        const createDataKeluarga = await Keluarga.create(keluargaData);
        return createDataKeluarga;

    } catch (error) {
        console.log(error);
    }
};


export const getTotalKeluarga = async()=>{
    try {
        const totalKbli = await Keluarga.countDocuments();
        return totalKbli;
    } catch (error) {
        console.log(error);
    }
};


// Find Keluarga data by ID
export const findKeluargaById = async (id) => {
    try {
        const keluarga = await Keluarga.findById(id);
        return keluarga;
    } catch (error) {
        console.log(error);
    }
};

// Delete Keluarga data by ID
export const deleteKeluargaById = async (id) => {
    try {
        const deletedKeluarga = await Keluarga.findByIdAndDelete(id);
        return deletedKeluarga;
    } catch (error) {
        console.log(error);
    }
};

// Update Keluarga data by ID
export const updateKeluarga = async (id, updatedData) => {
    try {
        const updatedKeluarga = await Keluarga.findByIdAndUpdate(id, updatedData, { new: true });
        return updatedKeluarga;
    } catch (error) {
        throw new Error(`Error updating Keluarga data: ${error.message}`);
    }
};

