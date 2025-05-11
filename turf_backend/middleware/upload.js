// //middleware/upload.js
// const multer = require('multer');
// const path = require('path');

// // Define the storage configuration
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     // Ensure the directory exists
//     cb(null, 'uploads/turfs/');
//   },
//   filename: function (req, file, cb) {
//     // Create unique filenames using the current timestamp and the file extension
//     cb(null, Date.now() + path.extname(file.originalname));
//   }
// });

// // File filter to ensure only image files are uploaded
// const fileFilter = (req, file, cb) => {
//   const allowedTypes = /jpg|jpeg|png|gif/;
//   const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
//   const mimetype = allowedTypes.test(file.mimetype);

//   if (extname && mimetype) {
//     return cb(null, true);
//   } else {
//     return cb(new Error('Only image files are allowed'), false);
//   }
// };

// // Set up the upload configuration with file size limit and file filter
// const upload = multer({
//   storage,
//   limits: { fileSize: 5 * 1024 * 1024 }, // Set a file size limit of 5MB
//   fileFilter
// });

// module.exports = upload;
 const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure uploads directory exists
const uploadPath = path.join(__dirname, '..', 'uploads', 'turfs');
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

// Multer storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

// File filter: Only images
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpg|jpeg|png|gif/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);
  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed'), false);
  }
};

// Multer instance with limits
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter,
});

// Export field-based middleware
module.exports = upload.fields([
  { name: 'heroimg', maxCount: 1 },
  { name: 'eventimgs', maxCount: 10 }
]);
