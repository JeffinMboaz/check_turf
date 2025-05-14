// import React, { useState } from "react";
// import { Modal, Button, Form, Row, Col, Container } from "react-bootstrap";
// import axios from "axios";
// import { toast } from "react-toastify";

// function AddTurfForm({ show, handleClose, refreshData }) {
//   const [formData, setFormData] = useState({
//     turfname: "",
//     address: "",
//     heroimg: null,
//     court: "",
//     price: "",
//     availability: true,
//     events: [],
//   });

//   const [eventForm, setEventForm] = useState({
//     name: "",
//     type: "",
//     price: "",
//     img: null,
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleEventChange = (e) => {
//     const { name, value, files } = e.target;
//     if (name === "img") {
//       setEventForm((prev) => ({ ...prev, img: files[0] }));
//     } else {
//       setEventForm((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleAddEvent = () => {
//     const { name, type, price, img } = eventForm;
//     if (name && type && price && img) {
//       setFormData((prev) => ({
//         ...prev,
//         events: [...prev.events, { name, type, price: parseFloat(price), img }],
//       }));
//       setEventForm({ name: "", type: "", price: "", img: null });
//     } else {
//       toast.warn("Please fill all event fields and upload an image");
//     }
//   };

//   const handleRemoveEvent = (index) => {
//     const updated = formData.events.filter((_, i) => i !== index);
//     setFormData((prev) => ({ ...prev, events: updated }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const token = localStorage.getItem("token");
//       const form = new FormData();

//       form.append("turfname", formData.turfname);
//       form.append("address", formData.address);
//       form.append("court", formData.court);
//       form.append("price", formData.price);
//       form.append("availability", formData.availability);
//       if (formData.heroimg) form.append("heroimg", formData.heroimg);

//       const eventDataWithoutFiles = formData.events.map(({ img, ...rest }) => rest);
//       form.append("events", JSON.stringify(eventDataWithoutFiles));

//       formData.events.forEach((event) => {
//         if (event.img instanceof File) {
//           form.append("eventimgs", event.img);
//         }
//       });

//       await axios.post("${import.meta.env.Backend_Base_Url}/api/auth/addturf", form, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       toast.success("Turf added successfully");
//       refreshData();
//       handleClose();
//     } catch (error) {
//       console.error("Submit error:", error.response?.data);
//       toast.error(error.response?.data?.message || "Failed to add turf");
//     }
//   };

//   return (
//     <Modal
//       show={show}
//       onHide={handleClose}
//       scrollable
//       size="lg"
//       aria-labelledby="add-turf-modal"
//       centered
//     >
//       <Modal.Header closeButton>
//         <Modal.Title id="add-turf-modal">Add New Turf with Events</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <Container fluid>
//           <Form onSubmit={handleSubmit}>
//             <Row className="g-3">
//               <Col xs={12} md={6}>
//                 <Form.Group>
//                   <Form.Label>Turf Name</Form.Label>
//                   <Form.Control type="text" name="turfname" onChange={handleChange} required />
//                 </Form.Group>
//               </Col>
//               <Col xs={12} md={6}>
//                 <Form.Group>
//                   <Form.Label>Address</Form.Label>
//                   <Form.Control type="text" name="address" onChange={handleChange} required />
//                 </Form.Group>
//               </Col>

//               <Col xs={12}>
//                 <Form.Group>
//                   <Form.Label>Upload Hero Image</Form.Label>
//                   <Form.Control
//                     type="file"
//                     name="heroimg"
//                     accept="image/*"
//                     onChange={(e) => setFormData({ ...formData, heroimg: e.target.files[0] })}
//                   />
//                 </Form.Group>
//               </Col>

//               <Col xs={12} md={6}>
//                 <Form.Group>
//                   <Form.Label>Court Type</Form.Label>
//                   <Form.Control type="text" name="court" onChange={handleChange} required />
//                 </Form.Group>
//               </Col>
//               <Col xs={12} md={6}>
//                 <Form.Group>
//                   <Form.Label>Price</Form.Label>
//                   <Form.Control type="number" name="price" onChange={handleChange} required />
//                 </Form.Group>
//               </Col>

//               <Col xs={12}>
//                 <Form.Group>
//                   <Form.Check
//                     type="checkbox"
//                     label="Available"
//                     checked={formData.availability}
//                     onChange={(e) => setFormData({ ...formData, availability: e.target.checked })}
//                   />
//                 </Form.Group>
//               </Col>
//             </Row>

//             <hr className="my-4" />

//             <h5>Add Events</h5>
//             <Row className="g-3">
//               <Col xs={12} md={6}>
//                 <Form.Group>
//                   <Form.Label>Event Name</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="name"
//                     value={eventForm.name}
//                     onChange={handleEventChange}
//                   />
//                 </Form.Group>
//               </Col>
//               <Col xs={12} md={6}>
//                 <Form.Group>
//                   <Form.Label>Event Type</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="type"
//                     value={eventForm.type}
//                     onChange={handleEventChange}
//                   />
//                 </Form.Group>
//               </Col>
//               <Col xs={12} md={6}>
//                 <Form.Group>
//                   <Form.Label>Event Price</Form.Label>
//                   <Form.Control
//                     type="number"
//                     name="price"
//                     value={eventForm.price}
//                     onChange={handleEventChange}
//                   />
//                 </Form.Group>
//               </Col>
//               <Col xs={12} md={6}>
//                 <Form.Group>
//                   <Form.Label>Upload Event Image</Form.Label>
//                   <Form.Control
//                     type="file"
//                     name="img"
//                     accept="image/*"
//                     onChange={handleEventChange}
//                   />
//                 </Form.Group>
//               </Col>
//             </Row>

//             <Button
//               variant="secondary"
//               onClick={handleAddEvent}
//               className="mt-3 w-100"
//             >
//               Add Event
//             </Button>

//             {formData.events.length > 0 && (
//               <ul className="mt-3">
//                 {formData.events.map((event, index) => (
//                   <li key={index}>
//                     {event.name} ({event.type}) - ₹{event.price}
//                     <Button
//                       variant="outline-danger"
//                       size="sm"
//                       className="ms-2"
//                       onClick={() => handleRemoveEvent(index)}
//                     >
//                       ×
//                     </Button>
//                   </li>
//                 ))}
//               </ul>
//             )}

//             <Button variant="primary" type="submit" className="mt-4 w-100">
//               Add Turf
//             </Button>
//           </Form>
//         </Container>
//       </Modal.Body>
//     </Modal>
//   );
// }

// export default AddTurfForm;

import React, { useState } from "react";
import { Modal, Button, Form, Row, Col, Container } from "react-bootstrap";
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
    setFormData((prev) => ({ ...prev, [name]: value }));
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

      const eventDataWithoutFiles = formData.events.map(({ img, ...rest }) => rest);
      form.append("events", JSON.stringify(eventDataWithoutFiles));

      formData.events.forEach((event) => {
        if (event.img instanceof File) {
          form.append("eventimgs", event.img);
        }
      });

      await axios.post(`${import.meta.env.Backend_Base_Url}/api/auth/addturf`, form, {
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
    <Modal
      show={show}
      onHide={handleClose}
      scrollable
      size="lg"
      aria-labelledby="add-turf-modal"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="add-turf-modal">Add New Turf with Events</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container fluid>
          <Form onSubmit={handleSubmit}>
            <Row className="g-3">
              <Col xs={12} md={6}>
                <Form.Group>
                  <Form.Label>Turf Name</Form.Label>
                  <Form.Control type="text" name="turfname" onChange={handleChange} required />
                </Form.Group>
              </Col>
              <Col xs={12} md={6}>
                <Form.Group>
                  <Form.Label>Address</Form.Label>
                  <Form.Control type="text" name="address" onChange={handleChange} required />
                </Form.Group>
              </Col>
              <Col xs={12}>
                <Form.Group>
                  <Form.Label>Upload Hero Image</Form.Label>
                  <Form.Control
                    type="file"
                    name="heroimg"
                    accept="image/*"
                    onChange={(e) =>
                      setFormData({ ...formData, heroimg: e.target.files[0] })
                    }
                  />
                  {formData.heroimg && (
                    <div className="mt-2">
                      <img
                        src={URL.createObjectURL(formData.heroimg)}
                        alt="Hero Preview"
                        className="img-fluid rounded"
                        style={{ maxHeight: "150px", objectFit: "contain" }}
                      />
                    </div>
                  )}
                </Form.Group>
              </Col>

              <Col xs={12} md={6}>
                <Form.Group>
                  <Form.Label>Court Type</Form.Label>
                  <Form.Control type="text" name="court" onChange={handleChange} required />
                </Form.Group>
              </Col>
              <Col xs={12} md={6}>
                <Form.Group>
                  <Form.Label>Price</Form.Label>
                  <Form.Control type="number" name="price" onChange={handleChange} required />
                </Form.Group>
              </Col>

              <Col xs={12}>
                <Form.Group>
                  <Form.Check
                    type="checkbox"
                    label="Available"
                    checked={formData.availability}
                    onChange={(e) => setFormData({ ...formData, availability: e.target.checked })}
                  />
                </Form.Group>
              </Col>
            </Row>

            <hr className="my-4" />
            <h5 className="mt-3">Add Events</h5>
            <Row className="g-3">
              <Col xs={12} md={6}>
                <Form.Group>
                  <Form.Label>Event Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={eventForm.name}
                    onChange={handleEventChange}
                  />
                </Form.Group>
              </Col>
              <Col xs={12} md={6}>
                <Form.Group>
                  <Form.Label>Event Type</Form.Label>
                  <Form.Control
                    type="text"
                    name="type"
                    value={eventForm.type}
                    onChange={handleEventChange}
                  />
                </Form.Group>
              </Col>
              <Col xs={12} md={6}>
                <Form.Group>
                  <Form.Label>Event Price</Form.Label>
                  <Form.Control
                    type="number"
                    name="price"
                    value={eventForm.price}
                    onChange={handleEventChange}
                  />
                </Form.Group>
              </Col>
              <Col xs={12} md={6}>
                <Form.Group>
                  <Form.Label>Upload Event Image</Form.Label>
                  <Form.Control
                    type="file"
                    name="img"
                    accept="image/*"
                    onChange={handleEventChange}
                  />
                  {eventForm.img && (
                    <div className="mt-2">
                      <img
                        src={URL.createObjectURL(eventForm.img)}
                        alt="Event Preview"
                        className="img-fluid rounded"
                        style={{ maxHeight: "100px", objectFit: "contain" }}
                      />
                    </div>
                  )}
                </Form.Group>
              </Col>
            </Row>

            <Button variant="secondary" onClick={handleAddEvent} className="mt-3 w-100">
              Add Event
            </Button>

            {formData.events.length > 0 && (
              <Row className="mt-4 g-3">
                {formData.events.map((event, index) => (
                  <Col xs={12} md={6} key={index}>
                    <div className="border rounded p-2 h-100">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <strong>{event.name}</strong>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => handleRemoveEvent(index)}
                        >
                          ×
                        </Button>
                      </div>
                      <div><small>Type:</small> {event.type}</div>
                      <div><small>Price:</small> ₹{event.price}</div>
                      {event.img && (
                        <img
                          src={URL.createObjectURL(event.img)}
                          alt={event.name}
                          className="img-fluid mt-2 rounded"
                          style={{ maxHeight: "100px", objectFit: "cover" }}
                        />
                      )}
                    </div>
                  </Col>
                ))}
              </Row>
            )}

            <Button variant="primary" type="submit" className="mt-4 w-100">
              Add Turf
            </Button>
          </Form>
        </Container>
      </Modal.Body>
    </Modal>
  );
}

export default AddTurfForm;
