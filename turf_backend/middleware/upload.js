
//  const multer = require('multer');
// const path = require('path');
// const fs = require('fs');

// // Ensure uploads directory exists
// const uploadPath = path.join(__dirname, '..', 'uploads', 'turfs');
// if (!fs.existsSync(uploadPath)) {
//   fs.mkdirSync(uploadPath, { recursive: true });
// }

// // Multer storage config
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, uploadPath);
//   },
//   filename: function (req, file, cb) {
//     const uniqueName = `${Date.now()}-${file.originalname}`;
//     cb(null, uniqueName);
//   },
// });

// // File filter: Only images
// const fileFilter = (req, file, cb) => {
//   const allowedTypes = /jpg|jpeg|png|gif/;
//   const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
//   const mimetype = allowedTypes.test(file.mimetype);
//   if (extname && mimetype) {
//     cb(null, true);
//   } else {
//     cb(new Error('Only image files are allowed'), false);
//   }
// };

// // Multer instance with limits
// const upload = multer({
//   storage,
//   limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
//   fileFilter,
// });

// // Export field-based middleware
// module.exports = upload.fields([
//   { name: 'heroimg', maxCount: 1 },
//   { name: 'eventimgs', maxCount: 10 }
// ]);




const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Utility: ensure upload directories exist
const ensureDir = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

// Common file filter for images
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpg|jpeg|png|gif/;
  const isValidExt = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const isValidMime = allowedTypes.test(file.mimetype);

  if (isValidExt && isValidMime) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed'), false);
  }
};

// Common file size limit
const limits = {
  fileSize: 5 * 1024 * 1024 // 5MB
};

/* --- TURF UPLOAD CONFIG --- */
const turfUploadPath = path.join(__dirname, '..', 'uploads', 'turfs');
ensureDir(turfUploadPath);

const turfStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, turfUploadPath),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});

const turfUpload = multer({ storage: turfStorage, fileFilter, limits }).fields([
  { name: 'heroimg', maxCount: 1 },
  { name: 'eventimgs', maxCount: 10 }
]);

/* --- EVENT UPLOAD CONFIG --- */
const eventUploadPath = path.join(__dirname, '..', 'uploads', 'events');
ensureDir(eventUploadPath);

const eventStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, eventUploadPath),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});

const eventUpload = multer({ storage: eventStorage, fileFilter, limits }).single('img');


module.exports = {
  turfUpload,
  eventUpload
};
