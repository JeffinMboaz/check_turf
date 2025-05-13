
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from "react-bootstrap/Card";
import TNavbar from "../components/TNavbar";
import Footer from "../components/Footer";
import AddTurfForm from "../components/AddTurfForm";
import { Button, OverlayTrigger, Tooltip, Row, Col } from "react-bootstrap";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { toast } from "react-toastify";
import AddEvents from '../components/AddEvents';
import EditTurf from '../components/EditTurf';
import DeleteTurf from '../components/DeleteTurf';
import UpdateEvent from '../components/UpdateEvent';
import DeleteEvent from '../components/DeleteEvent';
import { useNavigate } from "react-router-dom";

function ManagerDashboard() {
  const [getMTurf, setGetMTurf] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddTurfModal, setShowAddTurfModal] = useState(false);
  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [showEditTurfModal, setShowEditTurfModal] = useState(false);
  const [showDeleteTurfModal, setShowDeleteTurfModal] = useState(false);
  const [showEditEventModal, setShowEditEventModal] = useState(false);
  const [showDeleteEventModal, setShowDeleteEventModal] = useState(false);
  const navigate = useNavigate();

  const fetchTurfs = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5006/api/auth/mngrturfs", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setGetMTurf(res.data || []);
    } catch (error) {
      console.error("Fetch Error:", error.response?.data?.message || error.message);
      toast.error(error.response?.data?.message || "Failed to fetch turfs");
    } finally {
      setLoading(false);
    }
  };

  // const handleAddEvent = async (data) => {
  //   try {
  //     const token = localStorage.getItem("token");
  //     await axios.post(
  //       "http://localhost:5006/api/auth/addevent",
  //       data,
  //       {
  //         headers: { Authorization: `Bearer ${token}` },
  //       }
  //     );
  //     toast.success("Event added successfully!");
  //   } catch (error) {
  //     toast.error("Failed to add event");
  //     console.error(error);
  //   }
  // };

const handleAddEvent = async (formData) => {
  try {
    const token = localStorage.getItem("token");
    await axios.post(
      `http://localhost:5006/api/auth/addevent/${formData.get('turfId')}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        },
      }
    ); 
    toast.success("Event added successfully!");
    fetchTurfs();
  } catch (error) {
    toast.error("Failed to add event");
    console.error(error);
  }
};



  const handleEditTurf = async (turfId, updateData) => {
    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `http://localhost:5006/api/auth/upturf/${turfId}`,
        updateData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Turf updated successfully!");
      fetchTurfs(); // Refresh the list
    } catch (error) {
      toast.error("Failed to update turf");
      console.error("Update error:", error.response?.data || error.message);
    }
  };

  const handleDeleteTurf = async (turfId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `http://localhost:5006/api/auth/delturf/${turfId}`,

        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Turf Deleted Successfully!");
      fetchTurfs(); // Refresh the list
    } catch (error) {
      toast.error("Failed to delete turf");
      console.error("Update error:", error.response?.data || error.message);
    }
  };
  const handleEditEvent = async (turfId, eventId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `http://localhost:5006/api/auth/upturf/${turfId, eventId}`,

        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("updated event successfully!");
      fetchTurfs(); // Refresh the list
    } catch (error) {
      toast.error("Failed to update event");
      console.error("Update error:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    fetchTurfs();
  }, []);

  return (
    <>
      <TNavbar />
      <div className="container-fluid py-4">
        <div className="text-center mb-4">
          <h4 className="fw-bold">Manager Panel</h4>
        </div>

        {/* Action Buttons */}
        <Row className="g-2 justify-content-center mb-4">
          <Col xs={12} sm={6} md="auto">
            <OverlayTrigger placement="bottom" overlay={<Tooltip>Add new turf</Tooltip>}>
              <Button className="bg-dark text-white w-100" onClick={() => setShowAddTurfModal(true)}>
                <IoMdAdd size={20} className="me-1" /> New Turf
              </Button>
            </OverlayTrigger>
          </Col>

          <Col xs={12} sm={6} md="auto">
            <OverlayTrigger placement="bottom" overlay={<Tooltip>Add new event to turf</Tooltip>}>
              <Button className="bg-dark text-white w-100" onClick={() => setShowAddEventModal(true)}>
                <IoMdAdd size={20} className="me-1" /> New Event
              </Button>
            </OverlayTrigger>
          </Col>

          <Col xs={12} sm={6} md="auto">
            <OverlayTrigger placement="bottom" overlay={<Tooltip>Edit turf</Tooltip>}>
              <Button className="bg-dark text-white w-100" onClick={() => setShowEditTurfModal(true)}>
                <FaRegEdit size={20} className="me-1" /> Edit Turf
              </Button>
            </OverlayTrigger>
          </Col>

          <Col xs={12} sm={6} md="auto">
            <OverlayTrigger placement="bottom" overlay={<Tooltip>Update turf event</Tooltip>}>
              <Button className="bg-dark text-white w-100" onClick={() => setShowEditEventModal(true)}>
                <FaRegEdit size={20} className="me-1" /> Edit Event
              </Button>
            </OverlayTrigger>
          </Col>

          <Col xs={12} sm={6} md="auto">
            <OverlayTrigger placement="bottom" overlay={<Tooltip>Delete turf</Tooltip>}>
              <Button className="bg-dark text-white w-100" onClick={() => setShowDeleteTurfModal(true)}>
                <MdDeleteOutline size={20} className="me-1" /> Delete Turf
              </Button>
            </OverlayTrigger>
          </Col>

          <Col xs={12} sm={6} md="auto">
            <OverlayTrigger placement="bottom" overlay={<Tooltip>Delete turf event</Tooltip>}>
              <Button className="bg-dark text-white w-100" onClick={() => setShowDeleteEventModal(true)}>
                <MdDeleteOutline size={20} className="me-1" /> Delete Event
              </Button>
            </OverlayTrigger>
          </Col>
        </Row>

        {/* Turf Cards */}
        <div className="px-4 py-3">
          <Row className="g-4 justify-content-center mt-3">
            {loading ? (
              <p>Loading...</p>
            ) : getMTurf.length > 0 ? (
              getMTurf.map((mt, index) => (
                <Col xs={12} sm={6} md={4} lg={3} key={mt._id || index}>
                  <Card
                    className="h-100"
                    style={{ cursor: 'pointer' }}
                    onClick={() => navigate(`/turfdetail/${mt._id}`)}
                  >
                   
                    <img
                      src={`http://localhost:5006${mt.heroimg}`}
                      alt="Turf"
                      style={{ width: '100%', maxHeight: '200px', objectFit: 'cover' }}
                    />

                    <Card.Body>
                      <Card.Title className='text-capitalize'>{mt.turfname}</Card.Title>
                      <Card.Text>
                        <strong>Address:</strong> {mt.address}<br />
                        <strong>Price:</strong> ₹{mt.price}<br />
                        <strong>Court:</strong> {mt.court}<br />
                        <strong>Available:</strong> {mt.availability ? "Yes" : "No"}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            ) : (
              <p>No turfs available</p> 
            )}
          </Row>
        </div>
      </div>

      {/* Modals */}
      <AddTurfForm
        show={showAddTurfModal}
        handleClose={() => setShowAddTurfModal(false)}
        refreshData={fetchTurfs}
      />
      <AddEvents
        show={showAddEventModal}
        handleClose={() => setShowAddEventModal(false)}
        turfOptions={getMTurf}
        onSubmit={handleAddEvent}
      />
      <EditTurf
        show={showEditTurfModal}
        handleClose={() => setShowEditTurfModal(false)}
        turfOptions={getMTurf}
        onSubmit={handleEditTurf}
      />
      <UpdateEvent
        show={showEditEventModal}
        handleClose={() => setShowEditEventModal(false)}
        turfOptions={getMTurf}
        onSubmit={handleEditEvent}
      />
      <DeleteTurf
        show={showDeleteTurfModal}
        handleClose={() => setShowDeleteTurfModal(false)}
        turfOptions={getMTurf}
        onSubmit={handleDeleteTurf}
      />
      <DeleteEvent
        show={showDeleteEventModal}
        handleClose={() => setShowDeleteEventModal(false)}
        turfOptions={getMTurf}
        fetchTurfs={fetchTurfs}
      />

      <Footer />
    </>
  );

}

export default ManagerDashboard;
