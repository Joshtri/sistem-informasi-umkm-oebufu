import mongoose from 'mongoose';

const kegiatanSchema = new mongoose.Schema({
    nama_kegiatan: {
        type: String,
        required: true,
        trim: true
    },
    tanggal_kegiatan: {
        type: Date,
        required: true
    },
    deskripsi_kegiatan: {
        type: String,
        required: true,
        trim: true
    },
    foto_kegiatan: {
        type: String,
        required: true
    }
});

const Kegiatan = mongoose.model('Kegiatan', kegiatanSchema);

export default Kegiatan;
