import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";

const DeleteEvent = ({ show, handleClose, turfOptions, fetchTurfs }) => {
  const [selectedTurf, setSelectedTurf] = useState("");
  const [selectedEvent, setSelectedEvent] = useState("");
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      if (selectedTurf) {
        try {
          const token = localStorage.getItem("token");
          const res = await axios.get(
            `http://localhost:5006/api/auth/getevents/${selectedTurf}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setEvents(res.data.events);
        } catch (error) {
          console.error("Error fetching events:", error);
          toast.error("Failed to fetch events.");
        }
      } else {
        setEvents([]);
      }
    };

    fetchEvents();
  }, [selectedTurf]);

  const handleDeleteEvent = async () => {
    if (!selectedTurf || !selectedEvent) {
      toast.warning("Please select both turf and event.");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this event?")) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `http://localhost:5006/api/auth/delturfevent/${selectedTurf}/${selectedEvent}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Event deleted successfully.");
      setSelectedEvent("");
      fetchTurfs(); // Optional: Refresh list if needed
      handleClose();
    } catch (error) {
      console.error("Error deleting event:", error);
      toast.error("Failed to delete event.");
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Delete Turf Event</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Select Turf</Form.Label>
            <Form.Select
              value={selectedTurf}
              onChange={(e) => setSelectedTurf(e.target.value)}
            >
              <option value="">Select Turf</option>
              {turfOptions.map((turf) => (
                <option key={turf._id} value={turf._id}>
                  {turf.turfname}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          {events.length > 0 && (
            <Form.Group className="mb-3">
              <Form.Label>Select Event to Delete</Form.Label>
              <Form.Select
                value={selectedEvent}
                onChange={(e) => setSelectedEvent(e.target.value)}
              >
                <option value="">Select Event</option>
                {events.map((event) => (
                  <option key={event._id} value={event._id}>
                    {event.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleDeleteEvent}>
          Delete Event
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteEvent;
