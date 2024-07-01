import multer from 'multer';
import path from 'path';

// Define the storage location and file naming convention
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Anda dapat mengubah ini sesuai dengan direktori yang Anda inginkan
  },
  filename: function (req, file, cb) {
    // Generate a unique filename with timestamp
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// Define the limits
const limits = {
  fileSize: 3 * 1024 * 1024 // 3 MB
};

// Create the multer configuration
const multerConfig = multer({
  storage: storage,
  limits: limits
});

export default multerConfig;
