


// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');

// // Utility: ensure upload directories exist
// const ensureDir = (dirPath) => {
//   if (!fs.existsSync(dirPath)) {
//     fs.mkdirSync(dirPath, { recursive: true });
//   }
// };

// // Common file filter for images
// const fileFilter = (req, file, cb) => {
//   const allowedTypes = /jpg|jpeg|png|gif/;
//   const isValidExt = allowedTypes.test(path.extname(file.originalname).toLowerCase());
//   const isValidMime = allowedTypes.test(file.mimetype);

//   if (isValidExt && isValidMime) {
//     cb(null, true);
//   } else {
//     cb(new Error('Only image files are allowed'), false);
//   }
// };

// // Common file size limit
// const limits = {
//   fileSize: 5 * 1024 * 1024 // 5MB
// };

// /* --- TURF UPLOAD CONFIG --- */
// const turfUploadPath = path.join(__dirname, '..', 'uploads', 'turfs');
// ensureDir(turfUploadPath);

// const turfStorage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, turfUploadPath),
//   filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
// });

// const turfUpload = multer({ storage: turfStorage, fileFilter, limits }).fields([
//   { name: 'heroimg', maxCount: 1 },
//   { name: 'eventimgs', maxCount: 10 }
// ]);

// /* --- EVENT UPLOAD CONFIG --- */
// const eventUploadPath = path.join(__dirname, '..', 'uploads', 'events');
// ensureDir(eventUploadPath);

// const eventStorage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, eventUploadPath),
//   filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
// });

// const eventUpload = multer({ storage: eventStorage, fileFilter, limits }).single('img');


// module.exports = {
//   turfUpload,
//   eventUpload
// };

// working
// const multer = require('multer');
// const { turfStorage, eventStorage } = require('../config/cloudinaryConfig'); // relative path

// const turfUpload = multer({ storage: turfStorage }).fields([
//   { name: 'heroimg', maxCount: 1 },
//   { name: 'eventimgs', maxCount: 10 }
// ]);

// const eventUpload = multer({ storage: eventStorage }).single('img');

// module.exports = {
//   turfUpload,
//   eventUpload
// };

// const multer = require('multer');
// const { turfStorage, eventStorage } = require('../config/cloudinaryConfig');

// const turfUpload = multer({ storage: turfStorage }).fields([
//   { name: 'heroimg', maxCount: 1 },
//   { name: 'eventimgs', maxCount: 10 }
// ]);

// const eventUpload = multer({ storage: eventStorage }).single('img');

// module.exports = { turfUpload, eventUpload };
// config/multerConfig.js

const multer = require('multer');
const path = require('path');

// --- Storage configuration for turf hero images ---
const turfStorage = multer.diskStorage({
  // Define the destination directory for hero images
  destination: (req, file, cb) => {
    // Ensure this directory exists in your backend root (e.g., your_project_root/uploads/turf-hero-images)
    cb(null, 'uploads/turf');
  },
  // Define the filename for hero images
  filename: (req, file, cb) => {
    // Create a unique filename using timestamp and original extension
    cb(null, Date.now() + '-' + file.fieldname + path.extname(file.originalname));
  }
});

// --- Storage configuration for event images ---
const eventStorage = multer.diskStorage({
  // Define the destination directory for event images
  destination: (req, file, cb) => {
    // Ensure this directory exists in your backend root (e.g., your_project_root/uploads/event-images)
    cb(null, 'uploads/events');
  },
  // Define the filename for event images
  filename: (req, file, cb) => {
    // Create a unique filename using timestamp and original extension
    cb(null, Date.now() + '-' + file.fieldname + path.extname(file.originalname));
  }
});

// --- Multer upload middleware for turfs (hero image and multiple event images) ---
const turfUpload = multer({ storage: turfStorage }).fields([
  { name: 'heroimg', maxCount: 1 },    // For the single hero image
  { name: 'eventimgs', maxCount: 10 }  // For multiple event images
]);

// --- Multer upload middleware for a single event image ---
const eventUpload = multer({ storage: eventStorage }).single('img');

module.exports = { turfUpload, eventUpload };
