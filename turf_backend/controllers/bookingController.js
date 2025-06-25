const mongoose = require("mongoose");
const Booking = require("../models/turfBookings");
const Turf = require("../models/turf");
const User = require("../models/user_Details");
const Manager = require("../models/manager");
const Admin = require("../models/admin");


const bookTurf = async (req, res) => {
  try {
    const {
      turfname,
      eventSelected,
      courtType,
      hours,
      date,
      startTime,
      endTime,
      price,
    } = req.body;

    const user = await User.findById(req.user.id)
      || await Manager.findById(req.user.id)
      || await Admin.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const turf = await Turf.findOne({ turfname });
    if (!turf) {
      return res.status(404).json({ message: "Turf not found" });
    }

    const createdBy = turf.createdBy;

    // ⛔️ Time overlap check
    const existingBookings = await Booking.find({
      turfname,
      courtType,
      date,
      status: "Booked",
      $or: [
        { startTime: { $lt: endTime }, endTime: { $gt: startTime } }
      ]
    });

    if (courtType === "Full Court" && existingBookings.length > 0) {
      return res.status(400).json({
        message: "The Full Court is already booked for this timeslot",
      });
    }

    if (courtType === "Half Court" && existingBookings.length >= 2) {
      return res.status(400).json({
        message: "The Half Court is already fully booked for this timeslot",
      });
    }
    const capitalizeRole = (role) => role.charAt(0).toUpperCase() + role.slice(1).toLowerCase();

    const booking = new Booking({
      turfname,
      eventSelected,
      courtType,
      hours,
      date,
      startTime,
      endTime,
      price,
      username: {
        role: user.role,
        id: user._id
      },
      createdBy: {
        role: capitalizeRole(turf.createdBy.role), // Capitalize creator role
        id: turf.createdBy.id
      },
      status: "Booked",
    });

    await booking.save();
    res.status(201).json({ message: "Booking created successfully", booking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Cancel booking logic
const cancelBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(bookingId)) {
      return res.status(400).json({ message: "Invalid booking ID" });
    }

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Fetch the requesting user (User/Admin/Manager)
    const user =
      await User.findById(req.user.id) ||
      await Manager.findById(req.user.id) ||
      await Admin.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the requester is the original booker
    const isBookingOwner =
      booking.username.id.toString() === user._id.toString() &&
      booking.username.role.toLowerCase() === user.role.toLowerCase();

    // Check if the requester is the turf owner (admin or manager)
    const isTurfOwner =
      booking.createdBy.id.toString() === user._id.toString() &&
      booking.createdBy.role.toLowerCase() === user.role.toLowerCase();

    if (!isBookingOwner && !isTurfOwner) {
      return res.status(403).json({ message: "Unauthorized to cancel this booking" });
    }

    booking.status = "Cancelled";
    await booking.save();

    res.status(200).json({ message: "Booking cancelled successfully", booking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

//view bookings
 // Get bookings for logged-in user
 const getUserBookings = async (req, res) => {
  try {
    const { id: userId, role: userRole } = req.user;

    const bookings = await Booking.find({ 
      "username.id": userId, 
      "username.role": userRole
    })
    .populate("createdBy.id", "fullname phonenumber")
    .sort({ date: -1 });

    const formattedBookings = bookings.map(b => ({
      _id: b._id,//to cancel
      turfname: b.turfname,
      event: b.eventSelected,
      date: b.date,
      time: `${b.startTime} - ${b.endTime}`,
      status: b.status,
      manager: b.createdBy?.id?.fullname || "N/A",
      managerPhone: b.createdBy?.id?.phonenumber || "N/A"
    }));

    res.status(200).json(formattedBookings);
  } catch (error) {
    console.error("Error getting bookings:", error);
    res.status(500).json({ message: "Failed to fetch bookings" });
  }

};

const bookTurfForUser = async (req, res) => {
  try {
    const {
      turfname,
      eventSelected,
      courtType,
      hours,
      date,
      startTime,
      endTime,
      price,
      userIdToBookFor  // 👈 New: pass this if manager books on behalf of user
    } = req.body;

    const requester = await User.findById(req.user.id)
      || await Manager.findById(req.user.id)
      || await Admin.findById(req.user.id);

    if (!requester) {
      return res.status(404).json({ message: "Requester not found" });
    }

    // 👇 If manager books for someone else
    let bookForUser = requester;
    if (requester.role === "manager" && userIdToBookFor) {
      bookForUser = await User.findById(userIdToBookFor);
      if (!bookForUser) {
        return res.status(404).json({ message: "Target user not found" });
      }
    }

    const turf = await Turf.findOne({ turfname });
    if (!turf) {
      return res.status(404).json({ message: "Turf not found" });
    }

    const existingBookings = await Booking.find({
      turfname,
      courtType,
      date,
      status: "Booked",
      $or: [
        { startTime: { $lt: endTime }, endTime: { $gt: startTime } }
      ]
    });

    if (courtType === "Full Court" && existingBookings.length > 0) {
      return res.status(400).json({
        message: "The Full Court is already booked for this timeslot",
      });
    }

    if (courtType === "Half Court" && existingBookings.length >= 2) {
      return res.status(400).json({
        message: "The Half Court is already fully booked for this timeslot",
      });
    }

    const capitalizeRole = (role) => role.charAt(0).toUpperCase() + role.slice(1).toLowerCase();

    const booking = new Booking({
      turfname,
      eventSelected,
      courtType,
      hours,
      date,
      startTime,
      endTime,
      price,
      username: {
        role: bookForUser.role,
        id: bookForUser._id
      },
      createdBy: {
        role: capitalizeRole(turf.createdBy.role),
        id: turf.createdBy.id
      },
      status: "Booked",
    });

    await booking.save();
    res.status(201).json({ message: "Booking created successfully", booking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getAllUsersForMgr = async (req, res) => {
  try {
    // Exclude password field using select
    const users = await User.find().select("-password").sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "All users fetched successfully",
      data: users,
    });
  } catch (error) {
    console.error("Admin User Fetch Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch users",
      error: error.message,
    });
  }
};
// working
// const getManagerBookings = async (req, res) => {
//   try {
//     const managerId = req.user.id; // assuming middleware sets req.user

//     // Step 1: Get all turfs created by this manager
//     const turfs = await Turf.find({ "createdBy.role": "manager", "createdBy.id": managerId });

//     if (!turfs.length) {
//        return res.status(200).json({
//         hasTurf: false,
//         bookings: []
//       });
//     }

//     // Step 2: Extract turf names
//     const turfNames = turfs.map(turf => turf.turfname);

//     // Step 3: Get all bookings for these turfs
//     const bookings = await Booking.find({ turfname: { $in: turfNames } }).sort({ createdAt: -1 });

//     res.status(200).json({ 
//       hasTurf: true,
//       bookings });

//   } catch (error) {
//     console.error("Error fetching manager bookings:", error);
//     res.status(500).json({ message: "Server error while fetching bookings." });
//   }
// };


// addingnew
const getManagerBookings = async (req, res) => {
  try {
    const managerId = req.user.id; // assuming middleware sets req.user

    // Step 1: Get all turfs created by this manager
    const turfs = await Turf.find({ "createdBy.role": "manager", "createdBy.id": managerId });

    if (!turfs.length) {
      return res.status(404).json({ message: "No turfs found for this manager." });
    }

    // Step 2: Extract turf names
    const turfNames = turfs.map(turf => turf.turfname);

    // Step 3: Get all bookings for these turfs
    const bookings = await Booking.find({ turfname: { $in: turfNames } }).sort({ createdAt: -1 });

    res.status(200).json({ bookings });
  } catch (error) {
    console.error("Error fetching manager bookings:", error);
    res.status(500).json({ message: "Server error while fetching bookings." });
  }
};

const userCancelBooking = async (req, res) => {
  try {
    const bookingId = req.params.id;
    const userId = req.user.id;
    const userRole = req.user.role;

    // Step 1: Find the booking (no populate)
    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found." });
    }

    // Step 2: Find the turf using turfname
    const turf = await Turf.findOne({ turfname: booking.turfname });

    // Step 3: Check authorization
    const isBooker = booking.username.id.toString() === userId;
    const isAdmin = userRole === 'admin';
    const isManager =
      userRole === 'manager' &&
      turf &&
      turf.createdBy &&
      turf.createdBy.id.toString() === userId;

    if (!isBooker && !isAdmin && !isManager) {
      return res.status(403).json({ message: "Not authorized to cancel this booking." });
    }

    // Step 4: Cancel booking
    booking.status = "Cancelled";
    await booking.save();

    res.status(200).json({ message: "Booking cancelled successfully.", booking });

  } catch (error) {
    console.error("Error cancelling booking:", error);
    res.status(500).json({ message: "Server error during cancellation." });
  }
};

const managerBookTurf = async (req, res) => {
  try {
    const {
      turfname,
      eventSelected,
      courtType,
      hours,
      date,
      startTime,
      endTime,
      price,
    } = req.body;

    const user = await User.findById(req.user.id)
      || await Manager.findById(req.user.id)
      || await Admin.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const turf = await Turf.findOne({ turfname });
    if (!turf) {
      return res.status(404).json({ message: "Turf not found" });
    }

    const createdBy = turf.createdBy;

    // ⛔️ Time overlap check
    const existingBookings = await Booking.find({
      turfname,
      courtType,
      date,
      status: "Booked",
      $or: [
        { startTime: { $lt: endTime }, endTime: { $gt: startTime } }
      ]
    });

    if (courtType === "Full Court" && existingBookings.length > 0) {
      return res.status(400).json({
        message: "The Full Court is already booked for this timeslot",
      });
    }

    if (courtType === "Half Court" && existingBookings.length >= 2) {
      return res.status(400).json({
        message: "The Half Court is already fully booked for this timeslot",
      });
    }
    const capitalizeRole = (role) => role.charAt(0).toUpperCase() + role.slice(1).toLowerCase();

    const booking = new Booking({
      turfname,
      eventSelected,
      courtType,
      hours,
      date,
      startTime,
      endTime,
      price,
      username: {
        role: user.role,
        id: user._id
      },
      createdBy: {
        role: capitalizeRole(turf.createdBy.role), // Capitalize creator role
        id: turf.createdBy.id
      },
      status: "Booked",
    });

    await booking.save();
    res.status(201).json({ message: "Booking created successfully", booking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports= {bookTurf,cancelBooking, getUserBookings,bookTurfForUser,getAllUsersForMgr,getManagerBookings,userCancelBooking,managerBookTurf};
