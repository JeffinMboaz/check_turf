
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Container, Spinner, Alert } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TNavbar from "../TNavbar";
import Footer from "../Footer";

function ManageBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${import.meta.env.Backend_Base_Url}/api/auth/admgetallbookings`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch bookings");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (bookingId) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${import.meta.env.Backend_Base_Url}/api/auth/admcancelbook/${bookingId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Booking cancelled successfully");
      fetchBookings(); // Refresh list
    } catch (err) {
      console.error(err);
      toast.error("Failed to cancel booking");
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <>
      <TNavbar />
      <div>
        <Container className="my-5">
          <ToastContainer />
             
          <h2 className="mb-4 text-center fw-bold">All Turf Bookings</h2>
          {loading ? (
            <div className="text-center">
              <Spinner animation="border" />
            </div>
          ) : bookings.length === 0 ? (
            <Alert variant="info">No bookings found.</Alert>
          ) : (
            <Table striped bordered hover responsive>
              <thead className="table-dark">
                <tr>
                  <th>#</th>
                  <th>Turf</th>
                  <th>Event</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Status</th>
                  <th>Manager</th>
                  <th>Manager Phone</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b, index) => (
                  <tr key={b._id}>
                    <td>{index + 1}</td>
                    <td>{b.turfname}</td>
                    <td>{b.event}</td>
                    <td>{b.date}</td>
                    <td>{b.time}</td>
                    <td>
                      <span className={`badge ${b.status === "Booked" ? "bg-success" : "bg-danger"}`}>
                        {b.status}
                      </span>
                    </td>
                    <td>{b.manager}</td>
                    <td>{b.managerPhone}</td>
                    <td>
                      {b.status !== "Cancelled" ? (
                        <button className="btn btn-danger btn-sm" onClick={() => handleCancel(b._id)}>
                          Cancel
                        </button>
                      ) : (
                        <span className="text-muted">Already Cancelled</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Container>
      </div>
      <Footer />
    </>
  );
}

export default ManageBookings;
