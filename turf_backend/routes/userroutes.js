//routes/userroutes.js
const express = require("express");
const router = express.Router();
const authenticateToken = require('../middleware/middleware');
// const upload=require('../middleware/upload')
const authorizeRole = require('../middleware/authorizeRole')
const { registerAs, login, logout, getUserProfile, updateUserProfile } = require('../controllers/userauth');
const { addTurfWithEvents, addEventsToTurf, getEventsByTurf,
  updateTurfEvent, updateTurf, deleteTurfEvent, deleteTurfAndEvents,
  getAllTurfs, getMngrTurfs,searchTurfs } = require("../controllers/turfController");
const { bookTurf, cancelBooking, getUserBookings, bookTurfForUser,
  getAllUsersForMgr, getManagerBookings, userCancelBooking, managerBookTurf
} = require('../controllers/bookingController');
const { ReviewRating, deleteReview, getReviews, getAllReviews } = require('../controllers/reviewController');
const { getTurfsByAdmin, deleteUser, getAllUsers, updateUserByAdmin, createUserByAdmin, createManager,
  updateManager, deleteManagers, getAllManagers, getAllBookings, AdmincancelBooking } = require('../controllers/adminController');


const { turfUpload, eventUpload } = require('../middleware/upload');


// Registration route for user,manager,admin
router.post('/registeras', registerAs);
router.post('/login', login); //login for user,manager,admin
router.post('/logout', logout);//login for user,manager,admin
router.get('/getprofile', authenticateToken, getUserProfile)//getprofile of user,manager,admin
router.put('/updateprofile', authenticateToken, updateUserProfile)//updateprofile of user,manager,admin

//add Turf and event only by manager and admin
// 
// router.post('/addevent/', authenticateToken, addEventsToTurf);//addevents to existing turf

// router.post(
//   '/addturf',
//   authenticateToken,
//   authorizeRole('Admin', 'Manager'),
//   upload, // uses upload.fields([{ name: 'heroimg' }, { name: 'eventimgs' }])
//   addTurfWithEvents
// );

router.post('/addturf', authenticateToken, authorizeRole('Admin', 'Manager'), turfUpload, addTurfWithEvents);

router.post('/addevent/:turfId', authenticateToken, eventUpload, addEventsToTurf);

// router.post('/addevent/:turfId', authenticateToken, addEventsToTurf);//addevents to existing turf

router.get('/getevents/:turfId', authenticateToken, getEventsByTurf);//get events of turf
router.get('/allturf', authenticateToken, getAllTurfs);//getall turf

// router.patch('/upturf-event/:turfId/:eventId', authenticateToken, updateTurfEvent);//update turf and events



// const { eventUpload } = require('../middleware/upload'); // or wherever your upload config is

router.patch('/upturf-event/:turfId/:eventId', authenticateToken, eventUpload, updateTurfEvent);


// router.patch('/upturf/:turfId', authenticateToken, updateTurf);//update turf 

router.patch('/upturf/:turfId', authenticateToken, turfUpload, updateTurf);


router.delete("/delturfevent/:turfId/:eventId", authenticateToken, deleteTurfEvent);//delete an event 
router.delete("/delturf/:turfId", authenticateToken, deleteTurfAndEvents);//delete a turf and all events

router.get('/allturfs', getAllTurfs);//getall turf

router.get('/mngrturfs', authenticateToken, authorizeRole('Admin', 'Manager'), getMngrTurfs);//getall turf

router.get('/searchturf',authenticateToken,searchTurfs)
//bookings 
router.post('/book', authenticateToken, bookTurf);//booktuturf
router.delete('/cancelbooking/:bookingId', authenticateToken, cancelBooking);//cancelbooking
router.get('/userbookings', authenticateToken, getUserBookings);//booktuturf

router.post('/managerbooking', authenticateToken, bookTurfForUser)

//review and rating
router.post('/ratereview', authenticateToken, ReviewRating);
router.delete("/delreview/:id", authenticateToken, deleteReview);
router.get("/getreviews", authenticateToken, getReviews);

//admin controller
router.get('/getallturf', authenticateToken, authorizeRole('Admin'), getTurfsByAdmin);
router.post('/addturf', authenticateToken, authorizeRole('Admin'), turfUpload, addTurfWithEvents);
router.post('/addevent/:turfId', authenticateToken, authorizeRole('Admin'), addEventsToTurf);//addevents to existing turf
router.get('/getevents/:turfId', authenticateToken, authorizeRole('Admin'), getEventsByTurf);//get events of turf
router.patch('/upturf-event/:turfId/:eventId', authorizeRole('Admin'), updateTurfEvent);//update turf and events
router.patch('/upturf/:turfId', authenticateToken, authorizeRole('Admin'), updateTurf);//update turf 
router.delete("/delturfevent/:turfId/:eventId", authenticateToken, authorizeRole('Admin'), deleteTurfEvent);//delete an event 
router.delete("/delturf/:turfId", authenticateToken, authorizeRole('Admin'), deleteTurfAndEvents);//delete a turf and all events

router.post('/admbook', authenticateToken, authorizeRole('Admin'), bookTurf);//booktuturf
router.delete('/admcancelbook/:bookingId', authenticateToken, authorizeRole('Admin'), AdmincancelBooking);//cancelbooking
router.get('/admgetallbookings', authenticateToken, authorizeRole('Admin'), getAllBookings)

router.delete("/admdelreview/:id", authenticateToken, authorizeRole('Admin'), deleteReview);
router.get("/admgetallreviews", authenticateToken, authorizeRole('Admin'), getAllReviews)

router.post('/admcreateuser', authenticateToken, authorizeRole('Admin'), createUserByAdmin);
router.put('/admupdateuser/:id', authenticateToken, authorizeRole('Admin'), updateUserByAdmin)
router.delete('/deluser/:id', authenticateToken, authorizeRole('Admin'), deleteUser);
router.get('/admgetalluser', authenticateToken, authorizeRole('Admin'), getAllUsers)

router.post('/admcreatemanager', authenticateToken, authorizeRole('Admin'), createManager)
router.get('/admgetmanagers', authenticateToken, authorizeRole('Admin'), getAllManagers)
router.put('/admupdatemanager/:id', authenticateToken, authorizeRole('Admin'), updateManager)
router.delete('/admdelmanager/:id', authenticateToken, authorizeRole('Admin'), deleteManagers);

router.get('/getalluserformgr', authenticateToken, getAllUsersForMgr)
router.get('/getmgrbooking', authenticateToken, getManagerBookings)
router.put('/userCancelBooking/:id', authenticateToken, userCancelBooking);
router.post('/mgrbookturf',authenticateToken,managerBookTurf)







module.exports = router; 