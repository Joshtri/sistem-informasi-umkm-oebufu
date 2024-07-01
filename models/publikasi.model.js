import mongoose from "mongoose";


const publikasiSchema = new mongoose.Schema({
    judul_publikasi: {
        type: String,
        required: true,
    },

    tanggal_publikasi: {
        type: Date,
        required: true,
    },

    deskripsi_publikasi: {
        type: String,
        required: true,
    },

    berkas_publikasi_pdf: {
        type: String,
        // required: true,
    },
    berkas_publikasi_doc: {
        type: String,
        // required: true,
    },
    berkas_publikasi_excel: {
        type: String,
        // required: true,
    },
});


const Publikasi = mongoose.model('Publikasi', publikasiSchema);

export default Publikasi;