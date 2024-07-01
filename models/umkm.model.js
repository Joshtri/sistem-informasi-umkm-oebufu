import mongoose from 'mongoose';

const umkmSchema = new mongoose.Schema({

  nama_pemilik: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Penduduk',
    required: true
  },

  nama_usaha: {
    type: String,
    maxlength: 130,
    required: true
  },
  alamat_tempat_usaha: {
    type: String,
    maxlength: 70,
    required: true
  },
  
  keluarga_Id:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Keluarga',
    required: true
  },
  pembinaan_usaha:{
    type:String,
    enum:[
        'ya',
        'tidak'
    ],
    required:true
  },

  rincian_kegiatan_usaha:{
    type:String,
    required:true,
  },

  alamat_tempat_tinggal:{
    type:String,
    maxlength:80,
    required:true,
  },

  //otomatis dapat dari data penduduk.
  pendidikan_pemilik:{
    type:String,
    required:true
  },

  jenis_lokasi_usaha:{
    type:String,
    enum:[
        'menetap',
        'keliling'
    ],
    required: true
  },

  jenis_pengelolaan_usaha:{
    type:String,
    enum:[
        'perorangan',
        'badan usaha'
    ]
  },

  omset_tahunan_usaha:{
    type:String,
    enum:[
        'Omset <= Rp.300 Juta',
        'Rp.300 Juta < Omset <= Rp.2,5 Milliar',
        'Rp.2,5 Milliar < Omset <= Rp.50 Milliar'
    ],
    required:true
  },

  kbli_Id:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Kbli',
    required: true
  },

  kekayaan_bersih_usaha:{
    type:String,
    enum:[
        'KBU <= Rp.50 Juta',    
        'Rp.50 Juta < KBU <= Rp.500 Juta',
        'Rp.500 Juta < KBU <= Rp.10 Milliar'
    ],
    required:true
  },

  jumlah_tenaga_kerja:{
    type:String,

    enum:[
        '1-5 tenaga kerja',
        '6-19 tenaga kerja',
        '≥ 20 tenaga kerja'
    ],
    required:true
  },
  
  sumber_modal_usaha:{
    type:String,

    enum:[
        'modal sendiri',
        'bantuan pemerintah',
        'modal sendiri & bantuan pemerintah'
    ],
    required:true
  }

}, {
  timestamps: true
});

const Umkm = mongoose.model('Umkm', umkmSchema);

export default Umkm;