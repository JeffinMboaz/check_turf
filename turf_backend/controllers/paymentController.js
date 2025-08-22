const razorpay = require("../config/razorpay");
const Booking = require("../models/turfBookings");
const User = require("../models/user_Details");
const crypto = require("crypto");
const createOrder = async (req, res) => {
  try {
    const { bookingId } = req.body;
    const { id: userId } = req.user;

    const booking = await Booking.findById(bookingId);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    if (booking.paymentStatus === "Paid") {
      return res.status(400).json({ message: "Booking already paid" });
    }

    const user = await User.findById(userId).select("fullname email phonenumber");
    if (!user) return res.status(404).json({ message: "User not found" });

    const amount = booking.price * booking.hours * 100; // Razorpay uses paise

    const options = {
      amount,
      currency: "INR",
      receipt: `receipt_${bookingId}`,
      notes: {
        bookingId: booking._id.toString(),
        fullname: user.fullname,
        email: user.email,
        phonenumber: user.phonenumber,
      },
    };

    const order = await razorpay.orders.create(options);

    res.status(200).json({
      orderId: order.id,
      amount,
      currency: "INR",
      bookingId: booking._id,
      user,
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (err) {
    console.error("Order creation error:", err);
    res.status(500).json({ message: "Failed to create order" });
  }
};



const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, bookingId } = req.body;

    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return res.status(400).json({ message: "Invalid signature" });
    }

    const booking = await Booking.findById(bookingId);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    booking.paymentStatus = "Paid";
    await booking.save();

    res.status(200).json({ message: "Payment verified & booking updated" });
  } catch (err) {
    console.error("Payment verification error:", err);
    res.status(500).json({ message: "Payment verification failed" });
  }
};





module.exports={ createOrder,verifyPayment,}