
// const cloudinary = require('cloudinary').v2;
// const { CloudinaryStorage } = require('multer-storage-cloudinary');

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// const turfStorage = new CloudinaryStorage({
//   cloudinary,
//   params: {
//     folder: 'turfs',
//     allowed_formats: ['jpg', 'jpeg', 'png'],
//   },
// });

// const eventStorage = new CloudinaryStorage({
//   cloudinary,
//   params: {
//     folder: 'events',
//     allowed_formats: ['jpg', 'jpeg', 'png'],
//   },
// });

// module.exports = {
//   cloudinary,
//   turfStorage,
//   eventStorage,
// };

const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const turfStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'turfs',
    allowed_formats: ['jpg', 'jpeg', 'png'],
  },
});

const eventStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'events',
    allowed_formats: ['jpg', 'jpeg', 'png'],
  },
});

module.exports = {
  cloudinary,
  turfStorage,
  eventStorage,
};
