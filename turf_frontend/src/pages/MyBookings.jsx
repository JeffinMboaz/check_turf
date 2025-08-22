// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Table from "react-bootstrap/Table";
// import Button from "react-bootstrap/Button";
// import TNavbar from "../components/TNavbar";
// import Footer from "../components/Footer";
// const MyBookings = () => {
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const fetchBookings = async () => {
//     try {
//       const token = localStorage.getItem("token");

//       const response = await axios.get(
//         " ${import.meta.env.VITE_BACKEND_BASE_URL}/api/auth/userbookings",
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       setBookings(response.data);
//     } catch (err) {
//       console.error("Failed to fetch bookings", err);
//       setError("Failed to fetch bookings.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchBookings();
//   }, []);

//   const handleCancel = async (bookingId) => {
//     if (!window.confirm("Are you sure you want to cancel this booking?"))
//       return;

//     try {
//       const token = localStorage.getItem("token");

//       await axios.delete(
//         ` ${import.meta.env.VITE_BACKEND_BASE_URL}/api/auth/cancelbooking/${bookingId}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       setBookings((prev) =>
//         prev.map((b) =>
//           b._id === bookingId ? { ...b, status: "Cancelled" } : b
//         )
//       );
//     } catch (err) {
//       console.error("Cancellation failed", err.response?.data || err.message);
//       alert(err.response?.data?.message || "Failed to cancel booking.");
//     }
//   };

//   return (
//     <>
//       <TNavbar />
//       <div className="container mt-4 min-vh-100">
//         <h2>My Bookings</h2>

//         {loading ? (
//           <p>Loading...</p>
//         ) : error ? (
//           <p className="text-danger">{error}</p>
//         ) : bookings.length === 0 ? (
//           <p>No bookings found.</p>
//         ) : (
//           <Table striped bordered hover responsive>
//             <thead>
//               <tr>
//                 <th>Turf Name</th>
//                 <th>Event</th>
//                 <th>Date</th>
//                 <th>Time</th>
//                 <th>Status</th>
//                 <th>Manager</th>
//                 <th>Manager Phone</th>
//                 <th>Action</th>
//                 <th>Transaction</th>
//               </tr>
//             </thead>
//             <tbody>
//               {bookings.map((booking, index) => (
//                 <tr key={index}>
//                   <td>{booking.turfname}</td>
//                   <td>{booking.event}</td>
//                   <td>{booking.date}</td>
//                   <td>{booking.time}</td>
//                   <td>{booking.status}</td>
//                   <td>{booking.manager}</td>
//                   <td>{booking.managerPhone}</td>
//                   <td>
//                     {booking.status !== "Cancelled" ? (
//                       <Button
//                         variant="danger"
//                         size="sm"
//                         onClick={() => handleCancel(booking._id)}
//                       >
//                         Cancel
//                       </Button>
//                     ) : (
//                       <span className="text-muted">Cancelled</span>
//                     )}
//                   </td>
//                   <td>
//                     <a
//                       href="https://rzp.io/rzp/GFTLtI1"
//                       className="btn btn-primary"
//                       target="_blank"
//                       rel="noopener noreferrer"
//                     >
//                       Payment
//                     </a>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </Table>
//         )}
//       </div>
//       <Footer/>
//     </>
//   );
// };

// export default MyBookings;

import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/Spinner";
import TNavbar from "../components/TNavbar";
import Footer from "../components/Footer";
import "./MyBookings.css"; // <-- Add this for custom styles

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        ` ${import.meta.env.VITE_BACKEND_BASE_URL}/api/auth/userbookings`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setBookings(response.data);
    } catch (err) {
      console.error("Failed to fetch bookings", err);
      setError("Failed to fetch bookings.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleCancel = async (bookingId) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;

    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        ` ${import.meta.env.VITE_BACKEND_BASE_URL}/api/auth/cancelbooking/${bookingId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setBookings((prev) =>
        prev.map((b) =>
          b._id === bookingId ? { ...b, status: "Cancelled" } : b
        )
      );
    } catch (err) {
      console.error("Cancellation failed", err.response?.data || err.message);
      alert(err.response?.data?.message || "Failed to cancel booking.");
    }
  };
  const handlePayment = async (bookingId) => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/auth/payment/order`,
        { bookingId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const options = {
        key: data.key,
        amount: data.amount,
        currency: data.currency,
        name: "Turf Booking",
        description: "Payment for turf booking",
        order_id: data.orderId,
        prefill: {
          name: data.user.fullname,
          email: data.user.email,
          contact: data.user.phonenumber,
        },
        handler: async function (response) {
          await axios.post(
            `${import.meta.env.VITE_BACKEND_BASE_URL}/api/auth/payment/verify`,
            { ...response, bookingId },
            { headers: { Authorization: `Bearer ${token}` } }
          );

          setBookings((prev) =>
            prev.map((b) =>
              b._id === bookingId ? { ...b, paymentStatus: "Paid" } : b
            )
          );
        },
        theme: { color: "#3399cc" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Payment failed:", err);
      alert("Payment initiation failed");
    }
  };

  return (
    <>
      <TNavbar />
      <div className="container mt-4 mb-5 min-vh-100">
        <Card className="shadow p-3">
          <h2 className="mb-4 text-center">My Bookings</h2>

          {loading ? (
            <div className="text-center py-5">
              <Spinner animation="border" variant="primary" />
              <p>Loading bookings...</p>
            </div>
          ) : error ? (
            <p className="text-danger">{error}</p>
          ) : bookings.length === 0 ? (
            <p className="text-muted text-center">No bookings found.</p>
          ) : (
            <div className="table-responsive">
              <Table striped bordered hover className="text-center">
                <thead className="table-dark">
                  <tr>
                    <th>Turf</th>
                    <th>Event</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Status</th>
                    <th>Manager</th>
                    <th>Phone</th>
                    <th>Action</th>
                    <th>Transaction</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking, index) => (
                    <tr key={index}>
                      <td className="text-nowrap">{booking.turfname}</td>
                      <td className="text-nowrap">{booking.event}</td>
                      <td>{booking.date}</td>
                      <td>{booking.time}</td>
                      <td
                        className={
                          booking.status === "Cancelled"
                            ? "text-danger"
                            : "text-success"
                        }
                      >
                        {booking.status}
                      </td>
                      <td>{booking.manager}</td>
                      <td>{booking.managerPhone}</td>
                      <td>
                        {booking.status !== "Cancelled" ? (
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => handleCancel(booking._id)}
                          >
                            Cancel
                          </Button>
                        ) : (
                          <span className="text-muted">Cancelled</span>
                        )}
                      </td>
                      <td>
                        {booking.paymentStatus === "Paid" ? (
                          <Button variant="success" size="sm" disabled>
                            Paid
                          </Button>
                        ) : (
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() => handlePayment(booking._id)}
                          >
                            Pay
                          </Button>
                        )}
                      </td>

                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}
        </Card>
      </div>
      <Footer />
    </>
  );
};

export default MyBookings;
