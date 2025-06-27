
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import TNavbar from '../components/TNavbar';
// import Footer from '../components/Footer';

// const ManagerBookings = () => {
//   const [bookings, setBookings] = useState([]);
//   const [turfs, setTurfs] = useState([]);
//   const [events, setEvents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [showForm, setShowForm] = useState(false);

//   const [formData, setFormData] = useState({
//     turfname: '',
//     eventSelected: '',
//     courtType: 'Half Court',
//     hours: 1,
//     date: '',
//     startTime: '',
//     endTime: '',
//     price: 0
//   });

//   const fetchBookings = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.get(' ${import.meta.env.VITE_BACKEND_BASE_URL}/api/auth/getmgrbooking', {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       const data = response.data;
//       setBookings(Array.isArray(data.bookings) ? data.bookings : (Array.isArray(data) ? data : []));
//       setLoading(false);
//     } catch (err) {
//       console.error('Fetch error:', err);
//       setError('Failed to fetch bookings.');
//       setLoading(false);
//     }
//   };

//   const fetchTurfs = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.get('${import.meta.env.VITE_BACKEND_BASE_URL}/api/auth/mngrturfs', {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setTurfs(response.data);
//     } catch (err) {
//       console.error("Failed to fetch turfs:", err);
//     }
//   };

//   useEffect(() => {
//     fetchTurfs();
//     fetchBookings();
//   }, []);

//   useEffect(() => {
//     const fetchEvents = async () => {
//       if (!formData.turfname) return;
//       const selectedTurf = turfs.find(t => t.turfname === formData.turfname);
//       if (!selectedTurf) return;

//       try {
//         const token = localStorage.getItem('token');
//         const response = await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/auth/getevents/${selectedTurf._id}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setEvents(response.data.events || []);
//       } catch (err) {
//         console.error("Failed to fetch events:", err);
//         setEvents([]);
//       }
//     };

//     fetchEvents();
//   }, [formData.turfname]);

//   const cancelBooking = async (bookingId) => {
//     try {
//       const token = localStorage.getItem('token');
//       await axios.put(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/auth/userCancelBooking/${bookingId}`, {}, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       toast.success("Booking cancelled successfully!");
//       fetchBookings();
//     } catch (err) {
//       toast.error("Failed to cancel booking.");
//       console.error(err);
//     }
//   };

//   const handleBookingSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const token = localStorage.getItem('token');
//       await axios.post('${import.meta.env.VITE_BACKEND_BASE_URL}/api/auth/mgrbookturf', formData, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       toast.success("Turf booked successfully!");
//       setShowForm(false);
//       fetchBookings();
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Booking failed.");
//       console.error(err);
//     }
//   };

//   const timeOptions = Array.from({ length: 24 }).map((_, i) => {
//     const hour24 = i.toString().padStart(2, '0') + ":00";
//     const hour12 = i % 12 === 0 ? 12 : i % 12;
//     const ampm = i < 12 ? 'AM' : 'PM';
//     return { value: hour24, label: `${hour12}:00 ${ampm}` };
//   });

//   if (loading) return <div>Loading bookings...</div>;
//   if (error) return <div className="text-danger">{error}</div>;

//   return (
// <>
// <TNavbar/>
//     <div className="container mt-5 min-vh-100">
//       <h2 className="mb-4">My Turf Bookings</h2>

//       <div className="my-3">
//         <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
//           {showForm ? 'Close Booking Form' : 'Book Turf'}
//         </button>
//       </div>

//       {showForm && (
//         <form onSubmit={handleBookingSubmit} className="mb-4 border p-3 rounded">
//           <div className="row g-3">
//             <div className="col-md-4">
//               <label className="form-label">Turf Name</label>
//               <select className="form-select" required
//                 value={formData.turfname}
//                 onChange={(e) => setFormData({ ...formData, turfname: e.target.value, eventSelected: '' })}
//               >
//                 <option value="">Select Turf</option>
//                 {turfs.map(turf => (
//                   <option key={turf._id} value={turf.turfname}>{turf.turfname}</option>
//                 ))}
//               </select>
//             </div>

//             <div className="col-md-4">
//               <label className="form-label">Event</label>
//               <select className="form-select" required
//                 value={formData.eventSelected}
//                 onChange={(e) => setFormData({ ...formData, eventSelected: e.target.value })}
//               >
//                 <option value="">Select Event</option>
//                 {events.map((event, index) => (
//                   <option key={index} value={event.name}>{event.name}</option>
//                 ))}
//               </select>
//             </div>

//             <div className="col-md-4">
//               <label className="form-label">Court Type</label>
//               <select className="form-select" value={formData.courtType}
//                 onChange={(e) => setFormData({ ...formData, courtType: e.target.value })}
//               >
//                 <option value="Half Court">Half Court</option>
//                 <option value="Full Court">Full Court</option>
//               </select>
//             </div>

//             <div className="col-md-3">
//               <label className="form-label">Hours</label>
//               <input type="number" className="form-control" required
//                 value={formData.hours}
//                 onChange={(e) => setFormData({ ...formData, hours: parseInt(e.target.value) })}
//               />
//             </div>

//             <div className="col-md-3">
//               <label className="form-label">Date</label>
//               <input type="date" className="form-control" required
//                 value={formData.date}
//                 onChange={(e) => setFormData({ ...formData, date: e.target.value })}
//               />
//             </div>

//             <div className="col-md-3">
//               <label className="form-label">Start Time</label>
//               <select className="form-select" name="startTime"
//                 value={formData.startTime}
//                 onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
//               >
//                 {timeOptions.map((t) => (
//                   <option key={t.value} value={t.value}>{t.label}</option>
//                 ))}
//               </select>
//             </div>

//             <div className="col-md-3">
//               <label className="form-label">End Time</label>
//               <select className="form-select" name="endTime"
//                 value={formData.endTime}
//                 onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
//               >
//                 {timeOptions.map((t) => (
//                   <option key={t.value} value={t.value}>{t.label}</option>
//                 ))}
//               </select>
//             </div>

//             <div className="col-md-3">
//               <label className="form-label">Price</label>
//               <input type="number" className="form-control" required
//                 value={formData.price}
//                 onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
//               />
//             </div>

//             <div className="col-md-3 d-flex align-items-end">
//               <button type="submit" className="btn btn-success w-100">Submit Booking</button>
//             </div>
//           </div>
//         </form>
//       )}

//       {bookings.length === 0 ? (
//         <p>No bookings found for your turfs.</p>
//       ) : (
//         <table className="table table-bordered table-striped">
//           <thead>
//             <tr>
//               <th>Turf</th>
//               <th>Event</th>
//               <th>Court Type</th>
//               <th>Date</th>
//               <th>Time</th>
//               <th>Booked By</th>
//               <th>Status</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {bookings.map((booking) => (
//               <tr key={booking._id}>
//                 <td>{booking.turfname}</td>
//                 <td>{booking.eventSelected}</td>
//                 <td>{booking.courtType}</td>
//                 <td>{booking.date}</td>
//                 <td>{`${booking.startTime} - ${booking.endTime}`}</td>
//                 <td>{booking.username.role}</td>
//                 <td>
//                   <span className={booking.status === 'Booked' ? 'text-success' : 'text-danger'}>
//                     {booking.status}
//                   </span>
//                 </td>
//                 <td>
//                   {booking.status === 'Booked' && (
//                     <button className="btn btn-sm btn-danger" onClick={() => cancelBooking(booking._id)}>
//                       Cancel
//                     </button>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>

//     <Footer/>
//     </>
//   );
// };

// export default ManagerBookings;

// // working
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import TNavbar from '../components/TNavbar';
// import Footer from '../components/Footer';
// import './ManagerBookings.css'; // Create this file for optional custom styles

// const ManagerBookings = () => {
//   const [bookings, setBookings] = useState([]);
//   const [turfs, setTurfs] = useState([]);
//   const [events, setEvents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [showForm, setShowForm] = useState(false);
//   const [hasTurf, setHasTurf] = useState(true); // assume true initially

//   const [formData, setFormData] = useState({
//     turfname: '',
//     eventSelected: '',
//     courtType: 'Half Court',
//     hours: 1,
//     date: '',
//     startTime: '',
//     endTime: '',
//     price: 0
//   });

//   // const fetchBookings = async () => {
//   //   try {
//   //     const token = localStorage.getItem('token');
//   //     const response = await axios.get(` ${import.meta.env.VITE_BACKEND_BASE_URL}/api/auth/getmgrbooking`, {
//   //       headers: { Authorization: `Bearer ${token}` },
//   //     });

//   //     const data = response.data;
//   //     setBookings(Array.isArray(data.bookings) ? data.bookings : (Array.isArray(data) ? data : []));
//   //     setLoading(false);
//   //   } catch (err) {
//   //     console.error('Fetch error:', err);
//   //     setError('Failed to fetch bookings.');
//   //     setLoading(false);
//   //   }
//   // };
//   const fetchBookings = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/auth/getmgrbooking`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       const data = response.data;

//       setHasTurf(data.hasTurf);

//       if (data.hasTurf === false) {
//         setBookings([]);
//       } else {
//         setBookings(Array.isArray(data.bookings) ? data.bookings : []);
//       }

//     } catch (err) {
//       console.error('Fetch error:', err);
//       setError("Failed to fetch bookings.");
//     } finally {
//       setLoading(false);
//     }
//   };
//   const fetchTurfs = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.get(` ${import.meta.env.VITE_BACKEND_BASE_URL}/api/auth/mngrturfs`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setTurfs(response.data);
//     } catch (err) {
//       console.error("Failed to fetch turfs:", err);
//     }
//   };

//   useEffect(() => {
//     fetchTurfs();
//     fetchBookings();
//   }, []);

//   useEffect(() => {
//     const fetchEvents = async () => {
//       if (!formData.turfname) return;
//       const selectedTurf = turfs.find(t => t.turfname === formData.turfname);
//       if (!selectedTurf) return;

//       try {
//         const token = localStorage.getItem('token');
//         const response = await axios.get(` ${import.meta.env.VITE_BACKEND_BASE_URL}/api/auth/getevents/${selectedTurf._id}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setEvents(response.data.events || []);
//       } catch (err) {
//         console.error("Failed to fetch events:", err);
//         setEvents([]);
//       }
//     };

//     fetchEvents();
//   }, [formData.turfname]);

//   const cancelBooking = async (bookingId) => {
//     try {
//       const token = localStorage.getItem('token');
//       await axios.put(` ${import.meta.env.VITE_BACKEND_BASE_URL}/api/auth/userCancelBooking/${bookingId}`, {}, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       toast.success("Booking cancelled successfully!");
//       fetchBookings();
//     } catch (err) {
//       toast.error("Failed to cancel booking.");
//       console.error(err);
//     }
//   };

//   const handleBookingSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const token = localStorage.getItem('token');
//       await axios.post(` ${import.meta.env.VITE_BACKEND_BASE_URL}/api/auth/mgrbookturf`, formData, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       toast.success("Turf booked successfully!");
//       setShowForm(false);
//       fetchBookings();
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Booking failed.");
//       console.error(err);
//     }
//   };

//   const timeOptions = Array.from({ length: 24 }).map((_, i) => {
//     const hour24 = i.toString().padStart(2, '0') + ":00";
//     const hour12 = i % 12 === 0 ? 12 : i % 12;
//     const ampm = i < 12 ? 'AM' : 'PM';
//     return { value: hour24, label: `${hour12}:00 ${ampm}` };
//   });

//   if (loading) return <div className="text-center py-5">Loading bookings...</div>;


//   return (
//     <>
//       <TNavbar />
//      <div className="container py-5 min-vh-100">
//       <h2 className="text-center mb-4">My Turf Bookings</h2>

//       {hasTurf ? (
//         <>
//           <div className="text-start mb-3">
//             <button className="btn btn-primary w-md-auto" onClick={() => setShowForm(!showForm)}>
//               {showForm ? 'Close Booking Form' : 'Book Turf'}
//             </button>
//           </div>

//           {showForm && (
//             <form onSubmit={handleBookingSubmit} className="mb-5 border p-4 rounded shadow-sm bg-light">
//               {/* Form content remains unchanged */}
//                 <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
//                   <div>
//                     <label className="form-label">Turf Name</label>
//                     <select className="form-select" required
//                       value={formData.turfname}
//                       onChange={(e) => setFormData({ ...formData, turfname: e.target.value, eventSelected: '' })}
//                     >
//                       <option value="">Select Turf</option>
//                       {turfs.map(turf => (
//                         <option key={turf._id} value={turf.turfname}>{turf.turfname}</option>
//                       ))}
//                     </select>
//                   </div>

//                   <div>
//                     <label className="form-label">Event</label>
//                     <select className="form-select" required
//                       value={formData.eventSelected}
//                       onChange={(e) => setFormData({ ...formData, eventSelected: e.target.value })}
//                     >
//                       <option value="">Select Event</option>
//                       {events.map((event, index) => (
//                         <option key={index} value={event.name}>{event.name}</option>
//                       ))}
//                     </select>
//                   </div>

//                   <div>
//                     <label className="form-label">Court Type</label>
//                     <select className="form-select" value={formData.courtType}
//                       onChange={(e) => setFormData({ ...formData, courtType: e.target.value })}
//                     >
//                       <option value="Half Court">Half Court</option>
//                       <option value="Full Court">Full Court</option>
//                     </select>
//                   </div>

//                   <div>
//                     <label className="form-label">Hours</label>
//                     <input type="number" className="form-control" required
//                       value={formData.hours}
//                       onChange={(e) => setFormData({ ...formData, hours: parseInt(e.target.value) })}
//                     />
//                   </div>

//                   <div>
//                     <label className="form-label">Date</label>
//                     <input type="date" className="form-control" required
//                       value={formData.date}
//                       onChange={(e) => setFormData({ ...formData, date: e.target.value })}
//                     />
//                   </div>

//                   <div>
//                     <label className="form-label">Start Time</label>
//                     <select className="form-select"
//                       value={formData.startTime}
//                       onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
//                     >
//                       {timeOptions.map((t) => (
//                         <option key={t.value} value={t.value}>{t.label}</option>
//                       ))}
//                     </select>
//                   </div>

//                   <div>
//                     <label className="form-label">End Time</label>
//                     <select className="form-select"
//                       value={formData.endTime}
//                       onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
//                     >
//                       {timeOptions.map((t) => (
//                         <option key={t.value} value={t.value}>{t.label}</option>
//                       ))}
//                     </select>
//                   </div>

//                   <div>
//                     <label className="form-label">Price</label>
//                     <input type="number" className="form-control" required
//                       value={formData.price}
//                       onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
//                     />
//                   </div>

//                   <div className="d-flex align-items-end">
//                     <button type="submit" className="btn btn-success w-100">Submit Booking</button>
//                   </div>
//                 </div>
//                 </form>
//           )}

//           {bookings.length === 0 ? (
//             <div className="text-center">No bookings found for your turfs.</div>
//           ) : (
//             <div className="table-responsive">
//               <table className="table table-bordered table-striped align-middle text-center">
//                 <thead className="table-dark">
//                   <tr>
//                     <th>Turf</th>
//                     <th>Event</th>
//                     <th>Court Type</th>
//                     <th>Date</th>
//                     <th>Time</th>
//                     <th>Booked By</th>
//                     <th>Status</th>
//                     <th>Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {bookings.map((booking) => (
//                     <tr key={booking._id}>
//                       <td>{booking.turfname}</td>
//                       <td>{booking.eventSelected}</td>
//                       <td>{booking.courtType}</td>
//                       <td>{booking.date}</td>
//                       <td>{`${booking.startTime} - ${booking.endTime}`}</td>
//                       <td>{booking.username.role}</td>
//                       <td>
//                         <span className={booking.status === 'Booked' ? 'text-success fw-bold' : 'text-danger fw-bold'}>
//                           {booking.status}
//                         </span>
//                       </td>
//                       <td>
//                         {booking.status === 'Booked' && (
//                           <button className="btn btn-sm btn-danger" onClick={() => cancelBooking(booking._id)}>
//                             Cancel
//                           </button>
//                         )}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </>
//       ) : (
//         <div className="alert alert-info text-center fw-semibold">
//           You do not have any turf yet.
//         </div>
//       )}
//     </div>
//       <Footer />
//     </>
//   );
// };

// export default ManagerBookings;


// existing 

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import TNavbar from '../components/TNavbar';
// import Footer from '../components/Footer';
// import './ManagerBookings.css'; // Optional custom styles

// const ManagerBookings = () => {
//   const [bookings, setBookings] = useState([]);
//   const [turfs, setTurfs] = useState([]);
//   const [events, setEvents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [showForm, setShowForm] = useState(false);
//   const [formData, setFormData] = useState({
//     turfname: '',
//     eventSelected: '',
//     courtType: 'Half Court',
//     hours: 1,
//     date: '',
//     startTime: '',
//     endTime: '',
//     price: 0
//   });

//   // const fetchBookings = async () => {
//   //   try {
//   //     const token = localStorage.getItem('token');
//   //     const response = await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/auth/getmgrbooking`, {
//   //       headers: { Authorization: `Bearer ${token}` },
//   //     });
//   //     const data = response.data;
//   //     setBookings(Array.isArray(data.bookings) ? data.bookings : []);
//   //     setLoading(false);
//   //   } catch (err) {
//   //     console.error('Fetch error:', err);
//   //     setError('Failed to fetch bookings.');
//   //     setLoading(false);
//   //   }
//   // };
// const fetchBookings = async () => {
//   try {
//     const token = localStorage.getItem('token');
//     const response = await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/auth/getmgrbooking`, {
//       headers: { Authorization: `Bearer ${token}` },
//     });

//     const data = response.data;
//     setBookings(Array.isArray(data.bookings) ? data.bookings : []);
    
//     // If message exists (like "You haven't created any turf yet.")
//     if (data.message) {
//       setError(data.message);
//     } else {
//       setError('');
//     }
//   } catch (err) {
//     console.error('Fetch error:', err);
   
//   } finally {
//     setLoading(false);
//   }
// };



//   const fetchTurfs = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/auth/mngrturfs`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setTurfs(response.data);
//     } catch (err) {
//       console.error("Failed to fetch turfs:", err);
//     }
//   };

//   useEffect(() => {
//     fetchTurfs();
//     fetchBookings();
//   }, []);

//   useEffect(() => {
//     const fetchEvents = async () => {
//       if (!formData.turfname) return;
//       const selectedTurf = turfs.find(t => t.turfname === formData.turfname);
//       if (!selectedTurf) return;

//       try {
//         const token = localStorage.getItem('token');
//         const response = await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/auth/getevents/${selectedTurf._id}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setEvents(response.data.events || []);
//       } catch (err) {
//         console.error("Failed to fetch events:", err);
//         setEvents([]);
//       }
//     };

//     fetchEvents();
//   }, [formData.turfname]);

//   const cancelBooking = async (bookingId) => {
//     try {
//       const token = localStorage.getItem('token');
//       await axios.put(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/auth/userCancelBooking/${bookingId}`, {}, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       toast.success("Booking cancelled successfully!");
//       fetchBookings();
//     } catch (err) {
//       toast.error("Failed to cancel booking.");
//       console.error(err);
//     }
//   };

//   const handleBookingSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const token = localStorage.getItem('token');
//       await axios.post(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/auth/mgrbookturf`, formData, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       toast.success("Turf booked successfully!");
//       setShowForm(false);
//       fetchBookings();
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Booking failed.");
//       console.error(err);
//     }
//   };

//   const timeOptions = Array.from({ length: 24 }).map((_, i) => {
//     const hour24 = i.toString().padStart(2, '0') + ":00";
//     const hour12 = i % 12 === 0 ? 12 : i % 12;
//     const ampm = i < 12 ? 'AM' : 'PM';
//     return { value: hour24, label: `${hour12}:00 ${ampm}` };
//   });

//   if (loading) return <div className="text-center py-5">Loading bookings...</div>;
//   if (error) return <div className="text-danger text-center">{error}</div>;

//   return (
//     <>
//       <TNavbar />
//       <div className="container py-5 min-vh-100">
//         <h2 className="text-center mb-4">My Turf Bookings</h2>

//         <div className="text-start mb-3">
//           <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
//             {showForm ? 'Close Booking Form' : 'Book Turf'}
//           </button>
//         </div>

//         {showForm && (
//           <form onSubmit={handleBookingSubmit} className="mb-5 border p-4 rounded shadow-sm bg-light">
//             <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
//               <div>
//                 <label className="form-label">Turf Name</label>
//                 <select className="form-select" required
//                   value={formData.turfname}
//                   onChange={(e) => setFormData({ ...formData, turfname: e.target.value, eventSelected: '' })}
//                 >
//                   <option value="">Select Turf</option>
//                   {turfs.map(turf => (
//                     <option key={turf._id} value={turf.turfname}>{turf.turfname}</option>
//                   ))}
//                 </select>
//               </div>

//               <div>
//                 <label className="form-label">Event</label>
//                 <select className="form-select" required
//                   value={formData.eventSelected}
//                   onChange={(e) => setFormData({ ...formData, eventSelected: e.target.value })}
//                 >
//                   <option value="">Select Event</option>
//                   {events.map((event, index) => (
//                     <option key={index} value={event.name}>{event.name}</option>
//                   ))}
//                 </select>
//               </div>

//               <div>
//                 <label className="form-label">Court Type</label>
//                 <select className="form-select" value={formData.courtType}
//                   onChange={(e) => setFormData({ ...formData, courtType: e.target.value })}
//                 >
//                   <option value="Half Court">Half Court</option>
//                   <option value="Full Court">Full Court</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="form-label">Hours</label>
//                 <input type="number" className="form-control" required
//                   value={formData.hours}
//                   onChange={(e) => setFormData({ ...formData, hours: parseInt(e.target.value) })}
//                 />
//               </div>

//               <div>
//                 <label className="form-label">Date</label>
//                 <input type="date" className="form-control" required
//                   value={formData.date}
//                   onChange={(e) => setFormData({ ...formData, date: e.target.value })}
//                 />
//               </div>

//               <div>
//                 <label className="form-label">Start Time</label>
//                 <select className="form-select"
//                   value={formData.startTime}
//                   onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
//                 >
//                   {timeOptions.map((t) => (
//                     <option key={t.value} value={t.value}>{t.label}</option>
//                   ))}
//                 </select>
//               </div>

//               <div>
//                 <label className="form-label">End Time</label>
//                 <select className="form-select"
//                   value={formData.endTime}
//                   onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
//                 >
//                   {timeOptions.map((t) => (
//                     <option key={t.value} value={t.value}>{t.label}</option>
//                   ))}
//                 </select>
//               </div>

//               <div>
//                 <label className="form-label">Price</label>
//                 <input type="number" className="form-control" required
//                   value={formData.price}
//                   onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
//                 />
//               </div>

//               <div className="d-flex align-items-end">
//                 <button type="submit" className="btn btn-success w-100">Submit Booking</button>
//               </div>
//             </div>
//           </form>
//         )}

//         {bookings.length === 0 ? (
//           <p className="text-center">No bookings found for your turfs.</p>
//         ) : (
//           <div className="table-responsive">
//             <table className="table table-bordered table-striped align-middle text-center">
//               <thead className="table-dark">
//                 <tr>
//                   <th>Turf</th>
//                   <th>Event</th>
//                   <th>Court Type</th>
//                   <th>Date</th>
//                   <th>Time</th>
//                   <th>Booked By</th>
//                   <th>Status</th>
//                   <th>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {bookings.map((booking) => (
//                   <tr key={booking._id}>
//                     <td>{booking.turfname}</td>
//                     <td>{booking.eventSelected}</td>
//                     <td>{booking.courtType}</td>
//                     <td>{booking.date}</td>
//                     <td>{`${booking.startTime} - ${booking.endTime}`}</td>
//                     <td>{booking.username?.role || booking.username || 'N/A'}</td>
//                     <td>
//                       <span className={booking.status === 'Booked' ? 'text-success fw-bold' : 'text-danger fw-bold'}>
//                         {booking.status}
//                       </span>
//                     </td>
//                     <td>
//                       {booking.status === 'Booked' && (
//                         <button className="btn btn-sm btn-danger" onClick={() => cancelBooking(booking._id)}>
//                           Cancel
//                         </button>
//                       )}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default ManagerBookings;

// adding
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import TNavbar from '../components/TNavbar';
import Footer from '../components/Footer';
import './ManagerBookings.css'; // Optional custom styles

const ManagerBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [turfs, setTurfs] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    turfname: '',
    eventSelected: '',
    courtType: 'Half Court',
    hours: 1,
    date: '',
    startTime: '',
    endTime: '',
    price: 0
  });

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/auth/getmgrbooking`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = response.data;
      setBookings(Array.isArray(data.bookings) ? data.bookings : []);
      if (data.message) {
        setError(data.message); // like: "You haven't created any turf yet."
      } else {
        setError('');
      }
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Failed to fetch bookings.');
    } finally {
      setLoading(false);
    }
  };

  const fetchTurfs = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/auth/mngrturfs`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTurfs(response.data);
    } catch (err) {
      console.error("Failed to fetch turfs:", err);
    }
  };

  useEffect(() => {
    fetchTurfs();
    fetchBookings();
  }, []);

  useEffect(() => {
    const fetchEvents = async () => {
      if (!formData.turfname) return;
      const selectedTurf = turfs.find(t => t.turfname === formData.turfname);
      if (!selectedTurf) return;

      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/auth/getevents/${selectedTurf._id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEvents(response.data.events || []);
      } catch (err) {
        console.error("Failed to fetch events:", err);
        setEvents([]);
      }
    };

    fetchEvents();
  }, [formData.turfname]);

  const cancelBooking = async (bookingId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/auth/userCancelBooking/${bookingId}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Booking cancelled successfully!");
      fetchBookings();
    } catch (err) {
      toast.error("Failed to cancel booking.");
      console.error(err);
    }
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/auth/mgrbookturf`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Turf booked successfully!");
      setShowForm(false);
      fetchBookings();
    } catch (err) {
      toast.error(err.response?.data?.message || "Booking failed.");
      console.error(err);
    }
  };

  const timeOptions = Array.from({ length: 24 }).map((_, i) => {
    const hour24 = i.toString().padStart(2, '0') + ":00";
    const hour12 = i % 12 === 0 ? 12 : i % 12;
    const ampm = i < 12 ? 'AM' : 'PM';
    return { value: hour24, label: `${hour12}:00 ${ampm}` };
  });

  return (
    <>
      <TNavbar />
      <div className="container py-5 min-vh-100">
        <h2 className="text-center mb-4">My Turf Bookings</h2>

        {loading ? (
          <div className="text-center">Loading bookings...</div>
        ) : (
          <>
            {error && (
              <div className="alert alert-warning text-center">{error}</div>
            )}

            <div className="text-start mb-3">
              <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
                {showForm ? 'Close Booking Form' : 'Book Turf'}
              </button>
            </div>

            {showForm && (
              <form onSubmit={handleBookingSubmit} className="mb-5 border p-4 rounded shadow-sm bg-light">
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
                  <div>
                    <label className="form-label">Turf Name</label>
                    <select className="form-select" required
                      value={formData.turfname}
                      onChange={(e) => setFormData({ ...formData, turfname: e.target.value, eventSelected: '' })}
                    >
                      <option value="">Select Turf</option>
                      {turfs.map(turf => (
                        <option key={turf._id} value={turf.turfname}>{turf.turfname}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="form-label">Event</label>
                    <select className="form-select" required
                      value={formData.eventSelected}
                      onChange={(e) => setFormData({ ...formData, eventSelected: e.target.value })}
                    >
                      <option value="">Select Event</option>
                      {events.map((event, index) => (
                        <option key={index} value={event.name}>{event.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="form-label">Court Type</label>
                    <select className="form-select" value={formData.courtType}
                      onChange={(e) => setFormData({ ...formData, courtType: e.target.value })}
                    >
                      <option value="Half Court">Half Court</option>
                      <option value="Full Court">Full Court</option>
                    </select>
                  </div>

                  <div>
                    <label className="form-label">Hours</label>
                    <input type="number" className="form-control" required
                      value={formData.hours}
                      onChange={(e) => setFormData({ ...formData, hours: parseInt(e.target.value) })}
                    />
                  </div>

                  <div>
                    <label className="form-label">Date</label>
                    <input type="date" className="form-control" required
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="form-label">Start Time</label>
                    <select className="form-select"
                      value={formData.startTime}
                      onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                    >
                      {timeOptions.map((t) => (
                        <option key={t.value} value={t.value}>{t.label}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="form-label">End Time</label>
                    <select className="form-select"
                      value={formData.endTime}
                      onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                    >
                      {timeOptions.map((t) => (
                        <option key={t.value} value={t.value}>{t.label}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="form-label">Price</label>
                    <input type="number" className="form-control" required
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                    />
                  </div>

                  <div className="d-flex align-items-end">
                    <button type="submit" className="btn btn-success w-100">Submit Booking</button>
                  </div>
                </div>
              </form>
            )}

            {bookings.length > 0 && (
              <div className="table-responsive">
                <table className="table table-bordered table-striped align-middle text-center">
                  <thead className="table-dark">
                    <tr>
                      <th>Turf</th>
                      <th>Event</th>
                      <th>Court Type</th>
                      <th>Date</th>
                      <th>Time</th>
                      <th>Booked By</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((booking) => (
                      <tr key={booking._id}>
                        <td>{booking.turfname}</td>
                        <td>{booking.eventSelected}</td>
                        <td>{booking.courtType}</td>
                        <td>{booking.date}</td>
                        <td>{`${booking.startTime} - ${booking.endTime}`}</td>
                        <td>{booking.username?.role || booking.username || 'N/A'}</td>
                        <td>
                          <span className={booking.status === 'Booked' ? 'text-success fw-bold' : 'text-danger fw-bold'}>
                            {booking.status}
                          </span>
                        </td>
                        <td>
                          {booking.status === 'Booked' && (
                            <button className="btn btn-sm btn-danger" onClick={() => cancelBooking(booking._id)}>
                              Cancel
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default ManagerBookings;
