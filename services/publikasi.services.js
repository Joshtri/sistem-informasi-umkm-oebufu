import * as publikasiRepository from '../repositories/publikasi.repository.js'

/* eslint-disable no-useless-catch */
export const deletePublikasi = async(id)=>{
    try {
        const deletedPublikasi = await publikasiRepository.deletePublikasiById(id);
        return deletedPublikasi;
    } catch (error) {
        throw error;
    }
}