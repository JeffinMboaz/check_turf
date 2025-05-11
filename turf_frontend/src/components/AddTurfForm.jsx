
import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";

function AddTurfForm({ show, handleClose, refreshData }) {
  const [formData, setFormData] = useState({
    turfname: "",
    address: "",
    heroimg: null,
    court: "",
    price: "",
    availability: true,
    events: [],
  });

  const [eventForm, setEventForm] = useState({
    name: "",
    type: "",
    price: "",
    img: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEventChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "img") {
      setEventForm((prev) => ({ ...prev, img: files[0] }));
    } else {
      setEventForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleAddEvent = () => {
    const { name, type, price, img } = eventForm;
    if (name && type && price && img) {
      setFormData((prev) => ({
        ...prev,
        events: [...prev.events, { name, type, price: parseFloat(price), img }],
      }));
      setEventForm({ name: "", type: "", price: "", img: null });
    } else {
      toast.warn("Please fill all event fields and upload an image");
    }
  };

  const handleRemoveEvent = (index) => {
    const updated = formData.events.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, events: updated }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const form = new FormData();

      form.append("turfname", formData.turfname);
      form.append("address", formData.address);
      form.append("court", formData.court);
      form.append("price", formData.price);
      form.append("availability", formData.availability);
      if (formData.heroimg) form.append("heroimg", formData.heroimg);

      // Remove img (File) from event object before JSON.stringify
      const eventDataWithoutFiles = formData.events.map(({ img, ...rest }) => rest);
      form.append("events", JSON.stringify(eventDataWithoutFiles));

      // Append each image with key 'eventimgs'
      formData.events.forEach((event) => {
        if (event.img instanceof File) {
          form.append("eventimgs", event.img);
        }
      });

      await axios.post("http://localhost:5006/api/auth/addturf", form, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Turf added successfully");
      refreshData();
      handleClose();
    } catch (error) {
      console.error("Submit error:", error.response?.data);
      toast.error(error.response?.data?.message || "Failed to add turf");
    }
  };

  return (
    <Modal show={show} onHide={handleClose} scrollable size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Add New Turf with Events</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ maxHeight: "75vh", overflowY: "auto" }}>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Turf Name</Form.Label>
            <Form.Control type="text" name="turfname" onChange={handleChange} required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Address</Form.Label>
            <Form.Control type="text" name="address" onChange={handleChange} required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Upload Hero Image</Form.Label>
            <Form.Control
              type="file"
              name="heroimg"
              accept="image/*"
              onChange={(e) => setFormData({ ...formData, heroimg: e.target.files[0] })}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Court Type</Form.Label>
            <Form.Control type="text" name="court" onChange={handleChange} required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control type="number" name="price" onChange={handleChange} required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Check
              type="checkbox"
              label="Available"
              checked={formData.availability}
              onChange={(e) => setFormData({ ...formData, availability: e.target.checked })}
            />
          </Form.Group>

          <hr />
          <h5>Add Events</h5>
          <Form.Group className="mb-2">
            <Form.Label>Event Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={eventForm.name}
              onChange={handleEventChange}
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Court Type</Form.Label>
            <Form.Control
              type="text"
              name="type"
              value={eventForm.type}
              onChange={handleEventChange}
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Event Price</Form.Label>
            <Form.Control
              type="number"
              name="price"
              value={eventForm.price}
              onChange={handleEventChange}
            />
          </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Upload Event Image</Form.Label>
              <Form.Control
                type="file"
                name="img"
                accept="image/*"
                onChange={handleEventChange}
              />
            </Form.Group>
          <Button variant="secondary" onClick={handleAddEvent} className="mb-3">
            Add Event
          </Button>

          <ul>
            {formData.events.map((event, index) => (
              <li key={index}>
                {event.name} ({event.type}) - ₹{event.price}
                <Button
                  variant="outline-danger"
                  size="sm"
                  className="ms-2"
                  onClick={() => handleRemoveEvent(index)}
                >
                  ×
                </Button>
              </li>
            ))}
          </ul>

          <Button variant="primary" type="submit">
            Add Turf
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default AddTurfForm;
