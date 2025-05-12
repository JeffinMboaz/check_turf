import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';

const UpdateEvent = ({ show, handleClose, turfOptions, fetchTurfs }) => {
  
  const [formData, setFormData] = useState({
    turfId: '',
    eventId: '',
    name: '',
    type: '',
    price: '',
    img: ''
  });

  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      if (formData.turfId) {
        try {
          const token = localStorage.getItem("token");
          const res = await axios.get(
            `http://localhost:5006/api/auth/getevents/${formData.turfId}`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          setEvents(res.data.events);
        } catch (err) {
          console.error("Error fetching events", err);
        }
      }
    };
    fetchEvents();
  }, [formData.turfId]);

  useEffect(() => {
    if (formData.eventId) {
      const selectedEvent = events.find(event => event._id === formData.eventId);
      if (selectedEvent) {
        setFormData(prev => ({
          ...prev,
          name: selectedEvent.name,
          type: selectedEvent.type,
          price: selectedEvent.price,
          img: selectedEvent.img || ''
        }));
      }
    }
  }, [formData.eventId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // const handleSubmit = async () => {
  //   const payload = {
  //     name: formData.name,
  //     type: formData.type,
  //     price: formData.price,
  //     img: formData.img
  //   };
  //   try {
  //     const token = localStorage.getItem("token");
  //     await axios.patch(
  //       `http://localhost:5006/api/auth/upturf-event/${formData.turfId}/${formData.eventId}`,
  //       payload,
  //       { headers: { Authorization: `Bearer ${token}` } }
  //     );
  //     toast.success("Event updated successfully!");
  //     setFormData({
  //       turfId: '',
  //       eventId: '',
  //       name: '',
  //       type: '',
  //       price: '',
  //       img: ''
  //     });
  //     handleClose();
  //     fetchTurfs(); // Optional: Refresh turf list
  //   } catch (err) {
  //     toast.error("Failed to update event");
  //     console.error("Update error:", err.response?.data || err.message);
  //   }
  // };

  const handleSubmit = async () => {
  try {
    const token = localStorage.getItem("token");
    const payload = new FormData();
    payload.append("name", formData.name);
    payload.append("type", formData.type);
    payload.append("price", formData.price);
    if (formData.img) {
      payload.append("img", formData.img);
    }

    await axios.patch(
      `http://localhost:5006/api/auth/upturf-event/${formData.turfId}/${formData.eventId}`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      }
    );

    toast.success("Event updated successfully!");
    setFormData({
      turfId: '',
      eventId: '',
      name: '',
      type: '',
      price: '',
      img: ''
    });
    handleClose();
    fetchTurfs();
  } catch (err) {
    toast.error("Failed to update event");
    console.error("Update error:", err.response?.data || err.message);
  }
};

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Update Turf Event</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Select Turf</Form.Label>
            <Form.Select name="turfId" value={formData.turfId} onChange={handleChange}>
              <option value="">Select Turf</option>
              {turfOptions.map(turf => (
                <option key={turf._id} value={turf._id}>{turf.turfname}</option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Select Event</Form.Label>
            <Form.Select name="eventId" value={formData.eventId} onChange={handleChange}>
              <option value="">Select Event</option>
              {events.map(event => (
                <option key={event._id} value={event._id}>{event.name}</option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Event Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Type (Half/Full Court)</Form.Label>
            <Form.Control
              type="text"
              name="type"
              value={formData.type}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
            />
          </Form.Group>

          {/* <Form.Group className="mb-3">
            <Form.Label>Image URL / Filename</Form.Label>
            <Form.Control
              type="text"
              name="img"
              value={formData.img}
              onChange={handleChange}
            />
          </Form.Group> */}
          <Form.Group className="mb-3">
  <Form.Label>Upload Event Image</Form.Label>
  <Form.Control
    type="file"
    name="img"
    accept="image/*"
    onChange={(e) => setFormData(prev => ({ ...prev, img: e.target.files[0] }))}
  />
</Form.Group>

        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Cancel</Button>
        <Button variant="dark" onClick={handleSubmit}>Update Event</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateEvent;
