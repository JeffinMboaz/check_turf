// import React, { useState, useEffect } from 'react';
// import { Modal, Button, Form } from 'react-bootstrap';

// const EditTurf = ({ show, handleClose, turfOptions, onSubmit }) => {
  
//   // const [formData, setFormData] = useState({
//   //   turfId: '',
//   //   turfname: '', // 👈 add this
//   //   address: '',
//   //   coordinates: '',
//   //   heroimg: '',
//   //   court: '',
//   //   price: '',
//   //   availability: true,
//   // });

//   const [formData, setFormData] = useState({
//   turfId: '',
//   turfname: '',
//   address: '',
//   heroimg: null, // now a File object
//   court: '',
//   price: '',
//   availability: true,
// });

//   useEffect(() => {
//     if (formData.turfId) {
//       const selectedTurf = turfOptions.find(turf => turf._id === formData.turfId);
//       if (selectedTurf) {
//         setFormData({
//           turfId: selectedTurf._id,
//           turfname: selectedTurf.turfname || '', // 👈 include turfname
//           address: selectedTurf.address || '',
//           coordinates: Array.isArray(selectedTurf.location?.coordinates)
//             ? selectedTurf.location.coordinates.join(',')
//             : '',
//           heroimg: selectedTurf.heroimg || '',
//           court: selectedTurf.court || '',
//           price: selectedTurf.price || '',
//           availability: selectedTurf.availability ?? true,
//         });
//       }
//     }
//   }, [formData.turfId, turfOptions]);

//   // const handleChange = (e) => {
//   //   const { name, value, type, checked } = e.target;
//   //   setFormData({
//   //     ...formData,
//   //     [name]: type === 'checkbox' ? checked : value
//   //   });
//   // };

// const handleChange = (e) => {
//   const { name, value, type, checked, files } = e.target;

//   if (name === 'heroimg') {
//     setFormData({ ...formData, heroimg: files[0] }); // capture file
//   } else {
//     setFormData({
//       ...formData,
//       [name]: type === 'checkbox' ? checked : value
//     });
//   }
// };

//   // const handleSubmit = () => {
//   //   const payload = {
//   //     turfname: formData.turfname, // 👈 include this
//   //     address: formData.address,
//   //     coordinates: formData.coordinates.split(',').map(Number),
//   //     heroimg: formData.heroimg,
//   //     court: formData.court,
//   //     price: formData.price,
//   //     availability: formData.availability,
//   //   };
//   //   onSubmit(formData.turfId, payload);

//   //   setFormData({
//   //     turfId: '',
//   //     turfname: '',
//   //     address: '',
//   //     coordinates: '',
//   //     heroimg: '',
//   //     court: '',
//   //     price: '',
//   //     availability: true,
//   //   });
//   //   handleClose();
//   // };


// const getCoordinatesFromAddress = async (address) => {
//   const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`);
//   const data = await response.json();

//   if (!Array.isArray(data) || data.length === 0) {
//     console.error("No data from geocoding API:", data);
//     throw new Error("Coordinates not found for the given address");
//   }

//   return [parseFloat(data[0].lon), parseFloat(data[0].lat)];
// };

//   const handleSubmit = async () => {
//   try {
//     const coords = await getCoordinatesFromAddress(formData.address);
//     const data = new FormData();
//     data.append('turfname', formData.turfname);
//     data.append('address', formData.address);
//     data.append('coordinates', JSON.stringify(coords));
//     data.append('court', formData.court);
//     data.append('price', formData.price);
//     data.append('availability', formData.availability);
//     if (formData.heroimg) data.append('heroimg', formData.heroimg);

//     onSubmit(formData.turfId, data);

//     setFormData({ turfId: '', turfname: '', address: '', heroimg: null, court: '', price: '', availability: true });
//     handleClose();
//   } catch (error) {
//     console.error("Error converting address:", error);
//   }
// };

//   return (
//     <Modal show={show} onHide={handleClose} centered>
//       <Modal.Header closeButton>
//         <Modal.Title>Edit Turf</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <Form>
//           <Form.Group className="mb-3">
//             <Form.Label>Turf Name</Form.Label>
//             <Form.Select name="turfId" onChange={handleChange} value={formData.turfId}>
//               <option value="">Select Turf</option>
//               {turfOptions.map(turf => (
//                 <option key={turf._id} value={turf._id}>{turf.turfname}</option>
//               ))}
//             </Form.Select>
//           </Form.Group>
//           <Form.Group className="mb-3">
//             <Form.Label>Turf Name</Form.Label>
//             <Form.Control type="text" name="turfname" value={formData.turfname} onChange={handleChange} />
//           </Form.Group>

//           <Form.Group className="mb-3">
//             <Form.Label>Address</Form.Label>
//             <Form.Control type="text" name="address" value={formData.address} onChange={handleChange} />
//           </Form.Group>

//           {/* <Form.Group className="mb-3">
//             <Form.Label>Coordinates (lat,lng)</Form.Label>
//             <Form.Control type="text" name="coordinates" value={formData.coordinates} onChange={handleChange} />
//           </Form.Group> */}
          
// <Form.Group className="mb-3">
//   <Form.Label>Turf Image</Form.Label>
//   <Form.Control type="file" name="heroimg" accept="image/*" onChange={handleChange} />
// </Form.Group>


//           <Form.Group className="mb-3">
//             <Form.Label>Court Type</Form.Label>
//             <Form.Control type="text" name="court" value={formData.court} onChange={handleChange} />
//           </Form.Group>

//           <Form.Group className="mb-3">
//             <Form.Label>Price</Form.Label>
//             <Form.Control type="number" name="price" value={formData.price} onChange={handleChange} />
//           </Form.Group>

//           <Form.Group className="mb-3">
//             <Form.Check
//               type="checkbox"
//               label="Available"
//               name="availability"
//               checked={formData.availability}
//               onChange={handleChange}
//             />
//           </Form.Group>
//         </Form>
//       </Modal.Body>
//       <Modal.Footer>
//         <Button variant="secondary" onClick={handleClose}>Cancel</Button>
//         <Button variant="dark" onClick={handleSubmit}>Update Turf</Button>
//       </Modal.Footer>
//     </Modal>
//   );
// };

// export default EditTurf;


import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const EditTurf = ({ show, handleClose, turfOptions, onSubmit }) => {
  const [formData, setFormData] = useState({
    turfId: '',
    turfname: '',
    address: '',
    heroimg: null,
    court: '',
    price: '',
    availability: true,
  });

  useEffect(() => {
    if (formData.turfId) {
      const selectedTurf = turfOptions.find(turf => turf._id === formData.turfId);
      if (selectedTurf) {
        setFormData({
          turfId: selectedTurf._id,
          turfname: selectedTurf.turfname || '',
          address: selectedTurf.address || '',
          heroimg: null, // Reset to null for new upload
          court: selectedTurf.court || '',
          price: selectedTurf.price || '',
          availability: selectedTurf.availability ?? true,
        });
      }
    }
  }, [formData.turfId, turfOptions]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (name === 'heroimg') {
      setFormData({ ...formData, heroimg: files[0] });
    } else {
      setFormData({
        ...formData,
        [name]: type === 'checkbox' ? checked : value,
      });
    }
  };

  const handleSubmit = async () => {
    try {
      const data = new FormData();
      data.append('turfname', formData.turfname);
      data.append('address', formData.address);
      data.append('court', formData.court);
      data.append('price', formData.price);
      data.append('availability', formData.availability);
      if (formData.heroimg) data.append('heroimg', formData.heroimg);

      onSubmit(formData.turfId, data);

      // Reset form and close modal
      setFormData({
        turfId: '',
        turfname: '',
        address: '',
        heroimg: null,
        court: '',
        price: '',
        availability: true,
      });
      handleClose();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Turf</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Select Turf</Form.Label>
            <Form.Select name="turfId" onChange={handleChange} value={formData.turfId}>
              <option value="">Select Turf</option>
              {turfOptions.map(turf => (
                <option key={turf._id} value={turf._id}>{turf.turfname}</option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Turf Name</Form.Label>
            <Form.Control type="text" name="turfname" value={formData.turfname} onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Address</Form.Label>
            <Form.Control type="text" name="address" value={formData.address} onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Turf Image</Form.Label>
            <Form.Control type="file" name="heroimg" accept="image/*" onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Court Type</Form.Label>
            <Form.Control type="text" name="court" value={formData.court} onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control type="number" name="price" value={formData.price} onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Check
              type="checkbox"
              label="Available"
              name="availability"
              checked={formData.availability}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Cancel</Button>
        <Button variant="dark" onClick={handleSubmit}>Update Turf</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditTurf;
