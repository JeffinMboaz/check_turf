const mongoose = require("mongoose");

const Turf = require("../models/turf");
const User = require("../models/user_Details")
const Manager = require("../models/manager");
const bcrypt = require("bcryptjs");
const Booking = require("../models/turfBookings")
const Admin = require("../models/admin")
const TurfEvents = require("../models/turfevents");
const { addTurfWithEvents, addEventsToTurf, getEventsByTurf,
  updateTurfEvent, updateTurf, deleteTurfEvent,
  deleteTurfAndEvents } = require('../controllers/turfController')

const { registerAs } = require('../controllers/userauth')

const getTurfsByAdmin = async (req, res) => {
  try {
    const userId = req.user.id;
    const userRole = req.user.role;

    if (userRole !== 'admin') {
      return res.status(403).json({ message: "Access denied: Admins only" });
    }

    const turfs = await Turf.find();

    res.status(200).json(turfs);
  } catch (err) {
    console.error("❌ Error fetching turfs:", err);
    res.status(500).json({ message: "Server error" });
  }
};
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await User.findByIdAndDelete(userId);

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// const deleteManager = async (req, res) => {
//     try {
//         const { id } = req.params;

//         const deletedManager = await Manager.findByIdAndDelete(id);

//         if (!deletedManager) {
//             return res.status(404).json({ message: "Manager not found" });
//         }

//         res.status(200).json({ message: "Manager deleted successfully" });

//     } catch (error) {
//         console.error("Delete manager error:", error);
//         res.status(500).json({ message: "Server error" });
//     }
// };

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 }); // includes password

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

const updateUserByAdmin = async (req, res) => {
  try {
    const userId = req.params.id;
    const { fullname, email, phonenumber, role } = req.body;

    // Validate fields (optional: add stricter checks here if needed)
    if (!fullname || !email || !phonenumber || !role) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        fullname,
        email,
        phonenumber,
        role,
      },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.status(200).json({ message: 'User updated successfully.', user: updatedUser });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};
const createUserByAdmin = async (req, res) => {
  try {
    const { fullname, email, phonenumber, role, password } = req.body;

    if (!fullname || !email || !phonenumber || !role || !password) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Check for existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already in use.' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullname,
      email,
      phonenumber,
      role,
      password: hashedPassword,
      createdBy: req.user.id // assuming the admin's ID is attached to req.user
    });

    await newUser.save();

    res.status(201).json({ message: 'User created successfully.', user: newUser });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

// Create manager
const createManager = async (req, res) => {
  try {
    const { fullname, email, phonenumber, password } = req.body;

    if (!fullname || !email || !phonenumber || !password) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const existing = await Manager.findOne({ email });
    if (existing) return res.status(409).json({ message: 'Email already in use.' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const manager = new Manager({
      fullname,
      email,
      phonenumber,
      role: 'manager',
      password: hashedPassword,
      createdBy: req.user.id,
    });

    await manager.save();
    res.status(201).json({ message: 'Manager created.', manager });
  } catch (err) {
    res.status(500).json({ message: 'Server error.', error: err.message });
  }
};

// Edit manager
const updateManager = async (req, res) => {
  try {
    const { id } = req.params;
    const { fullname, email, phonenumber, password } = req.body;

    const manager = await Manager.findById(id);
    if (!manager) return res.status(404).json({ message: 'Manager not found' });

    manager.fullname = fullname;
    manager.email = email;
    manager.phonenumber = phonenumber;
    if (password) {
      manager.password = await bcrypt.hash(password, 10);
    }

    await manager.save();
    res.json({ message: 'Manager updated.', manager });
  } catch (err) {
    res.status(500).json({ message: 'Update failed.', error: err.message });
  }
};

// Delete manager
const deleteManagers = async (req, res) => {
  try {
    const { id } = req.params;
    await Manager.findByIdAndDelete(id);
    res.json({ message: 'Manager deleted.' });
  } catch (err) {
    res.status(500).json({ message: 'Delete failed.', error: err.message });
  }
};

// Get all managers
const getAllManagers = async (req, res) => {
  try {
    const managers = await Manager.find().sort({ createdAt: -1 });
    res.json({ data: managers });
  } catch (err) {
    res.status(500).json({ message: 'Fetch failed.', error: err.message });
  }
};
// Get bookings for logged-in user

const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("createdBy.id", "fullname phonenumber")
      .sort({ date: -1 });

    const formattedBookings = bookings.map(b => ({
      _id: b._id, // for cancel
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

const AdmincancelBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;

    // Validate booking ID
    if (!mongoose.Types.ObjectId.isValid(bookingId)) {
      return res.status(400).json({ message: "Invalid booking ID" });
    }

    // Ensure the requester is an admin
    if (!req.user || req.user.role.toLowerCase() !== "admin") {
      return res.status(403).json({ message: "Unauthorized access: not an admin" });
    }

    // Confirm admin exists
    const admin = await Admin.findById(req.user.id);
    if (!admin) {
      return res.status(403).json({ message: "Only admins can cancel bookings" });
    }

    // Find the booking
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Check if already cancelled
    if (booking.status === "Cancelled") {
      return res.status(400).json({ message: "Booking is already cancelled" });
    }

    // Cancel the booking
    booking.status = "Cancelled";
    await booking.save();

    res.status(200).json({ message: "Booking cancelled successfully by admin", booking });
  } catch (error) {
    console.error("Error cancelling booking:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  getTurfsByAdmin, deleteUser,
  addTurfWithEvents,
  addEventsToTurf,
  getEventsByTurf,
  updateTurfEvent,
  updateTurf,
  deleteTurfEvent,
  deleteTurfAndEvents,
  registerAs, getAllUsers, updateUserByAdmin, createUserByAdmin,
  createManager,
  updateManager,
  deleteManagers,
  getAllManagers,
  getAllBookings,
  AdmincancelBooking
};
