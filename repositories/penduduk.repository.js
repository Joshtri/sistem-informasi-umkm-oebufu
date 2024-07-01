import Penduduk from "../models/penduduk.model.js";
import Keluarga from "../models/keluarga.model.js";


// export const getAllPage = async(offset,limit)=>{
//     try {
//         const getDataPenduduk = await Penduduk.find().skip(offset).limit(limit);
//         return getDataPenduduk;
//     } catch (error) {
//         console.log(error);
//     }
// };

export const getAllPage = async (offset, limit) => {
    try {
        const getDataPenduduk = await Penduduk.find()
            .skip(offset)
            .limit(limit)
            .populate('keluargaId'); // Populate the keluargaId field with data from the Keluarga collection
        return getDataPenduduk;
    } catch (error) {
        console.log(error);
    }
};


export const getAll = async()=>{
    try {
        const getDataPenduduk = await Penduduk.find();
        return getDataPenduduk;
    } catch (error) {
        console.log(error);
    }
};



export const createPenduduk = async(pendudukData)=>{
    try {
        const createdPenduduk = await Penduduk.create(pendudukData);
        return createdPenduduk;

    } catch (error) {
        console.log(error);
    }
};


export const getTotalPenduduk = async()=>{
    try {
        const totalPenduduk = await Penduduk.countDocuments();
        return totalPenduduk;
    } catch (error) {
        console.log(error);
    }
};


// Find Penduduk data by ID
export const findPendudukById = async (id) => {
    try {
        const penduduk = await Penduduk.findById(id).populate('keluargaId'); // Populate the keluargaId field
        return penduduk;
    } catch (error) {
        console.log(error);
    }
};

// Delete Penduduk data by ID
export const deletePendudukById = async (id) => {
    try {
        const deletedPenduduk = await Penduduk.findByIdAndDelete(id);
        return deletedPenduduk;
    } catch (error) {
        console.log(error);
    }
};


// Update Penduduk data by ID
export const updatePenduduk = async (id, updatedData) => {
    try {
        const updatedPenduduk = await Penduduk.findByIdAndUpdate(id, updatedData, { new: true });
        return updatedPenduduk;
    } catch (error) {
        throw new Error(`Error updating Penduduk data: ${error.message}`);
    }
};


export const getPendidikanStatistics = async (_, res) => {
    try {
      const pendidikanLevels = [
        'Belum/Tidak Pernah Sekolah', 'Belum/Tidak Tamat SD/SDLB/MI/Paket A', 'SD/SDLB/MI/Paket A',
        'SMP/SMPLB/MTs/Paket B', 'SMA/SMLB/MA/SMK/MAK/paket C', 'DI/DII/DIII', 
        'DIV/S1', 'S2', 'S3'
      ];
  
      const pendidikanStatistics = {};
  
      for (const level of pendidikanLevels) {
        const count = await Penduduk.countDocuments({ pendidikan_penduduk: level });
        pendidikanStatistics[level] = count;
      }
  
      res.status(200).json(pendidikanStatistics);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };