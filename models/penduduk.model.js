import mongoose from 'mongoose';

const pendudukSchema = new mongoose.Schema({
  nama_penduduk: {
    type: String,
    maxlength: 50,
    required: true
  },
  pendidikan_penduduk: {
    type: String,
    enum: [
      'Belum/Tidak Pernah Sekolah',
      'Belum/Tidak Tamat SD/SDLB/MI/Paket A',
      'SD/SDLB/MI/Paket A',
      'SMP/SMPLB/MTs/Paket B',
      'SMA/SMLB/MA/SMK/MAK/paket C',
      'DI/DII/DIII',
      'DIV/S1',
      'S2',
      'S3'
    ],
    required: true
  },

  jenis_kelamin: {
    type: String,
    enum: [
      'laki-laki',
      'perempuan',
    ],
    required: true
  },


  keluargaId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Keluarga',
    required: true
  }
}, {
  timestamps: true
});

const Penduduk = mongoose.model('Penduduk', pendudukSchema);

export default Penduduk;