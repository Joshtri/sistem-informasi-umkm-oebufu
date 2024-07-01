import mongoose from 'mongoose';

const keluargaSchema = new mongoose.Schema({

  nama_kepala_keluarga: {
    type: String,
    maxlength: 50,
    required: true
  },
  alamat_kepala_keluarga: {
    type: String,
    maxlength: 50,
    required: true
  },
}, {
  timestamps: true
});

const Keluarga = mongoose.model('Keluarga', keluargaSchema);

export default Keluarga;