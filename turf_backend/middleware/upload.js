

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

// currentexisting
// const multer = require('multer');
// const { turfStorage, eventStorage } = require('../config/cloudinaryConfig');

// const turfUpload = multer({ storage: turfStorage }).fields([
//   { name: 'heroimg', maxCount: 1 },
//   { name: 'eventimgs', maxCount: 10 }
// ]);

// const eventUpload = multer({ storage: eventStorage }).single('img');

// module.exports = { turfUpload, eventUpload };

// adding
const multer = require('multer');
const { turfStorage, eventStorage } = require('../config/cloudinaryConfig');

const turfUpload = multer({ storage: turfStorage }).fields([
  { name: 'heroimg', maxCount: 1 },
  { name: 'eventimgs', maxCount: 10 }
]);

const eventUpload = multer({ storage: eventStorage }).single('img');

module.exports = { turfUpload, eventUpload };
