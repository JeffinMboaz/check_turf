
// import React, { useState } from 'react';
// import { Modal, Button, Form } from 'react-bootstrap';

// const AddEvents = ({ show, handleClose, turfOptions, onSubmit }) => {
//   const [formData, setFormData] = useState({
//     turfId: '',
//     name: '',
//     type: '',
//     price: '',
//     img: ''
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = () => {
//     onSubmit(formData);
//     setFormData({ turfId: '', name: '', type: '', price: '', img: '' }); // reset
//     handleClose();
//   };

//   return (
//     <Modal show={show} onHide={handleClose} centered>
//       <Modal.Header closeButton>
//         <Modal.Title>Add New Event</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <Form>
//           <Form.Group className="mb-3">
//             <Form.Label>Turf Name</Form.Label>
//             <Form.Select name="turfId" onChange={handleChange} value={formData.turfId}>
//               <option value="">Select Turf</option>
//               {turfOptions.map((turf) => (
//                 <option key={turf._id} value={turf._id}>
//                   {turf.turfname}
//                 </option>
//               ))}
//             </Form.Select>
//           </Form.Group>

//           <Form.Group className="mb-3">
//   <Form.Label>Event Name</Form.Label>
//   <Form.Control
//     type="text"
//     name="name"
//     placeholder="Enter event name"
//     onChange={handleChange}
//     value={formData.name}
//   />
// </Form.Group>

// <Form.Group className="mb-3">
//   <Form.Label>Court Type</Form.Label>
//   <Form.Control
//     type="text"
//     name="type"
//     placeholder="Enter court type"
//     onChange={handleChange}
//     value={formData.type}
//   />
// </Form.Group>

// <Form.Group className="mb-3">
//   <Form.Label>Price</Form.Label>
//   <Form.Control
//     type="number"
//     name="price"
//     placeholder="Enter price"
//     onChange={handleChange}
//     value={formData.price}
//   />
// </Form.Group>

// {/* <Form.Group className="mb-3">
//   <Form.Label>Event Image URL</Form.Label>
//   <Form.Control
//     type="text"
//     name="img"
//     placeholder="Paste image URL"
//     onChange={handleChange}
//     value={formData.img}
//   />
// </Form.Group> */}
//  <Form.Group className="mb-3">
//             <Form.Label>Upload Event Image</Form.Label>
//             <Form.Control
//               type="file"
//               name="img"
//               accept="image/*"
//               onChange={handleChange}
//             />
//           </Form.Group>

//         </Form>
//       </Modal.Body>
//       <Modal.Footer>
//         <Button variant="secondary" onClick={handleClose}>Cancel</Button>
//         <Button variant="dark" onClick={handleSubmit}>Add Event</Button>
//       </Modal.Footer>
//     </Modal>
//   );
// };

// export default AddEvents;




// import React, { useState } from 'react';
// import { Modal, Button, Form } from 'react-bootstrap';

// const AddEvents = ({ show, handleClose, turfOptions, onSubmit }) => {
//   const [formData, setFormData] = useState({
//     turfId: '',
//     name: '',
//     type: '',
//     price: '',
//   });

//   const [imageFile, setImageFile] = useState(null);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleFileChange = (e) => {
//     setImageFile(e.target.files[0]);
//   };

//   const handleSubmit = () => {
//     const data = new FormData();
//     data.append('turfId', formData.turfId);
//     data.append('name', formData.name);
//     data.append('type', formData.type);
//     data.append('price', formData.price);
//     if (imageFile) data.append('img', imageFile);

//     onSubmit(data); // Send FormData to parent handler
//     setFormData({ turfId: '', name: '', type: '', price: '' });
//     setImageFile(null);
//     handleClose();
//   };

//   return (
//     <Modal show={show} onHide={handleClose} centered>
//       <Modal.Header closeButton>
//         <Modal.Title>Add New Event</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <Form>
//           <Form.Group className="mb-3">
//             <Form.Label>Turf Name</Form.Label>
//             <Form.Select name="turfId" onChange={handleChange} value={formData.turfId}>
//               <option value="">Select Turf</option>
//               {turfOptions.map((turf) => (
//                 <option key={turf._id} value={turf._id}>
//                   {turf.turfname}
//                 </option>
//               ))}
//             </Form.Select>
//           </Form.Group>

//           <Form.Group className="mb-3">
//             <Form.Label>Event Name</Form.Label>
//             <Form.Control
//               type="text"
//               name="name"
//               placeholder="Enter event name"
//               onChange={handleChange}
//               value={formData.name}
//             />
//           </Form.Group>

//           <Form.Group className="mb-3">
//             <Form.Label>Court Type</Form.Label>
//             <Form.Control
//               type="text"
//               name="type"
//               placeholder="Enter court type"
//               onChange={handleChange}
//               value={formData.type}
//             />
//           </Form.Group>

//           <Form.Group className="mb-3">
//             <Form.Label>Price</Form.Label>
//             <Form.Control
//               type="number"
//               name="price"
//               placeholder="Enter price"
//               onChange={handleChange}
//               value={formData.price}
//             />
//           </Form.Group>

//           <Form.Group className="mb-3">
//             <Form.Label>Upload Event Image</Form.Label>
//             <Form.Control
//               type="file"
//               name="img"
//               accept="image/*"
//               onChange={handleFileChange}
//             />
//           </Form.Group>
//         </Form>
//       </Modal.Body>
//       <Modal.Footer>
//         <Button variant="secondary" onClick={handleClose}>Cancel</Button>
//         <Button variant="dark" onClick={handleSubmit}>Add Event</Button>
//       </Modal.Footer>
//     </Modal>
//   );
// };

// export default AddEvents;

// import React, { useState } from 'react';
// import { Modal, Button, Form, Row, Col, Container } from 'react-bootstrap';

// const AddEvents = ({ show, handleClose, turfOptions, onSubmit }) => {
//   const [formData, setFormData] = useState({
//     turfId: '',
//     name: '',
//     type: '',
//     price: '',
//   });

//   const [imageFile, setImageFile] = useState(null);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleFileChange = (e) => {
//     setImageFile(e.target.files[0]);
//   };

//   const handleSubmit = () => {
//     const data = new FormData();
//     data.append('turfId', formData.turfId);
//     data.append('name', formData.name);
//     data.append('type', formData.type);
//     data.append('price', formData.price);
//     if (imageFile) data.append('img', imageFile);

//     onSubmit(data);
//     setFormData({ turfId: '', name: '', type: '', price: '' });
//     setImageFile(null);
//     handleClose();
//   };

//   return (
//     <Modal show={show} onHide={handleClose} centered scrollable size="lg">
//       <Modal.Header closeButton>
//         <Modal.Title>Add New Event</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <Container fluid>
//           <Form>
//             <Row className="g-3">
//               <Col xs={12}>
//                 <Form.Group>
//                   <Form.Label>Turf</Form.Label>
//                   <Form.Select name="turfId" onChange={handleChange} value={formData.turfId} required>
//                     <option value="">Select Turf</option>
//                     {turfOptions.map((turf) => (
//                       <option key={turf._id} value={turf._id}>
//                         {turf.turfname}
//                       </option>
//                     ))}
//                   </Form.Select>
//                 </Form.Group>
//               </Col>

//               <Col xs={12} md={6}>
//                 <Form.Group>
//                   <Form.Label>Event Name</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="name"
//                     placeholder="Enter event name"
//                     value={formData.name}
//                     onChange={handleChange}
//                     required
//                   />
//                 </Form.Group>
//               </Col>

//               <Col xs={12} md={6}>
//                 <Form.Group>
//                   <Form.Label>Court Type</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="type"
//                     placeholder="Enter court type"
//                     value={formData.type}
//                     onChange={handleChange}
//                     required
//                   />
//                 </Form.Group>
//               </Col>

//               <Col xs={12} md={6}>
//                 <Form.Group>
//                   <Form.Label>Price</Form.Label>
//                   <Form.Control
//                     type="number"
//                     name="price"
//                     placeholder="Enter price"
//                     value={formData.price}
//                     onChange={handleChange}
//                     required
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
//                     onChange={handleFileChange}
//                   />
//                 </Form.Group>
//               </Col>
//             </Row>
//           </Form>
//         </Container>
//       </Modal.Body>
//       <Modal.Footer>
//         <Button variant="secondary" onClick={handleClose} className="w-100 w-md-auto">
//           Cancel
//         </Button>
//         <Button variant="dark" onClick={handleSubmit} className="w-100 w-md-auto">
//           Add Event
//         </Button>
//       </Modal.Footer>
//     </Modal>
//   );
// };

// export default AddEvents;

// existing

// import React, { useState } from 'react';
// import { Modal, Button, Form, Row, Col, Container, Image } from 'react-bootstrap';
// import Select from 'react-select';

// const AddEvents = ({ show, handleClose, turfOptions, onSubmit }) => {
//   const [formData, setFormData] = useState({
//     turfId: '',
//     name: '',
//     type: '',
//     price: '',
//   });

//   const [imageFile, setImageFile] = useState(null);
//   const [imagePreview, setImagePreview] = useState(null);

//   const turfSelectOptions = turfOptions.map((turf) => ({
//     value: turf._id,
//     label: turf.turfname,
//   }));

//   const handleSelectChange = (selectedOption) => {
//     setFormData((prev) => ({ ...prev, turfId: selectedOption?.value || '' }));
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     setImageFile(file);
//     if (file) {
//       setImagePreview(URL.createObjectURL(file));
//     } else {
//       setImagePreview(null);
//     }
//   };

//   const handleSubmit = () => {
//     const data = new FormData();
//     data.append('turfId', formData.turfId);
//     data.append('name', formData.name);
//     data.append('type', formData.type);
//     data.append('price', formData.price);
//     if (imageFile) data.append('img', imageFile);

//     onSubmit(data);
//     setFormData({ turfId: '', name: '', type: '', price: '' });
//     setImageFile(null);
//     setImagePreview(null);
//     handleClose();
//   };

//   return (
//     <Modal show={show} onHide={handleClose} centered scrollable size="lg">
//       <Modal.Header closeButton>
//         <Modal.Title>Add New Event</Modal.Title>
//       </Modal.Header>
//       <Modal.Body style={{ maxHeight: '100vh', overflowY: 'auto' }}>
//         <Container fluid>
//           <Form>
//             <Row className="g-3">
//               <Col xs={12}>
//                 <Form.Group>
//                   <Form.Label>Turf</Form.Label>
//                   <Select
//                     options={turfSelectOptions}
//                     onChange={handleSelectChange}
//                     value={turfSelectOptions.find((opt) => opt.value === formData.turfId) || null}
//                     placeholder="Select Turf"
//                     isClearable
//                     className='mt-3'
//                   />
//                 </Form.Group>
//               </Col>

//               <Col xs={12} md={6}>
//                 <Form.Group>
//                   <Form.Label>Event Name</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="name"
//                     placeholder="Enter event name"
//                     value={formData.name}
//                     onChange={handleChange}
//                     required
//                   />
//                 </Form.Group>
//               </Col>

//               <Col xs={12} md={6}>
//                 <Form.Group>
//                   <Form.Label>Court Type</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="type"
//                     placeholder="Enter court type"
//                     value={formData.type}
//                     onChange={handleChange}
//                     required
//                   />
//                 </Form.Group>
//               </Col>

//               <Col xs={12} md={6}>
//                 <Form.Group>
//                   <Form.Label>Price</Form.Label>
//                   <Form.Control
//                     type="number"
//                     name="price"
//                     placeholder="Enter price"
//                     value={formData.price}
//                     onChange={handleChange}
//                     required
//                   />
//                 </Form.Group>
//               </Col>

//               <Col xs={12} md={6}>
//                 <Form.Group className='mb-4'>
//                   <Form.Label>Upload Event Image</Form.Label>
//                   <Form.Control
//                     type="file"
//                     name="img"
//                     accept="image/*"
//                     onChange={handleFileChange}
//                   />
//                   {imagePreview && (
//                     <div className="mt-2 text-center">
//                       <Image
//                         src={imagePreview}
//                         thumbnail
//                         alt="Preview"
//                         style={{ maxHeight: '150px', objectFit: 'contain' }}
//                       />
//                     </div>
//                   )}
//                 </Form.Group>
//               </Col>
//             </Row>
//           </Form>
//         </Container>
//       </Modal.Body>
//       <Modal.Footer className="d-flex flex-column flex-md-row gap-2">
//         <Button variant="secondary" onClick={handleClose} className="w-100 w-md-auto">
//           Cancel
//         </Button>
//         <Button variant="dark" onClick={handleSubmit} className="w-100 w-md-auto">
//           Add Event
//         </Button>
//       </Modal.Footer>
//     </Modal>
//   );
// };

// export default AddEvents;


import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col, Container, Image } from 'react-bootstrap';
import Select from 'react-select';

const AddEvents = ({ show, handleClose, turfOptions, onSubmit }) => {
  const [formData, setFormData] = useState({
    turfId: '',
    name: '',
    type: '',
    price: '',
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const turfSelectOptions = turfOptions.map((turf) => ({
    value: turf._id,
    label: turf.turfname,
  }));

  const handleSelectChange = (selectedOption) => {
    setFormData((prev) => ({ ...prev, turfId: selectedOption?.value || '' }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setImagePreview(file ? URL.createObjectURL(file) : null);
  };

  const handleSubmit = () => {
    const data = new FormData();
    data.append('name', formData.name);
    data.append('type', formData.type);
    data.append('price', formData.price);
    if (imageFile) data.append('img', imageFile);

    onSubmit(data, formData.turfId); // Send turfId separately for URL
    setFormData({ turfId: '', name: '', type: '', price: '' });
    setImageFile(null);
    setImagePreview(null);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered scrollable size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Add New Event</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ maxHeight: '100vh', overflowY: 'auto' }}>
        <Container fluid>
          <Form>
            <Row className="g-3">
              <Col xs={12}>
                <Form.Group>
                  <Form.Label>Turf</Form.Label>
                  <Select
                    options={turfSelectOptions}
                    onChange={handleSelectChange}
                    value={turfSelectOptions.find((opt) => opt.value === formData.turfId) || null}
                    placeholder="Select Turf"
                    isClearable
                    className='mt-3'
                  />
                </Form.Group>
              </Col>

              <Col xs={12} md={6}>
                <Form.Group>
                  <Form.Label>Event Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="Enter event name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>

              <Col xs={12} md={6}>
                <Form.Group>
                  <Form.Label>Court Type</Form.Label>
                  <Form.Control
                    type="text"
                    name="type"
                    placeholder="Enter court type"
                    value={formData.type}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>

              <Col xs={12} md={6}>
                <Form.Group>
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="number"
                    name="price"
                    placeholder="Enter price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>

              <Col xs={12} md={6}>
                <Form.Group className='mb-4'>
                  <Form.Label>Upload Event Image</Form.Label>
                  <Form.Control
                    type="file"
                    name="img"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                  {imagePreview && (
                    <div className="mt-2 text-center">
                      <Image
                        src={imagePreview}
                        thumbnail
                        alt="Preview"
                        style={{ maxHeight: '150px', objectFit: 'contain' }}
                      />
                    </div>
                  )}
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Container>
      </Modal.Body>
      <Modal.Footer className="d-flex flex-column flex-md-row gap-2">
        <Button variant="secondary" onClick={handleClose} className="w-100 w-md-auto">
          Cancel
        </Button>
        <Button
          variant="dark"
          onClick={handleSubmit}
          className="w-100 w-md-auto"
          disabled={!formData.turfId}
        >
          Add Event
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddEvents;
