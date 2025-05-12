
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TNavbar from '../TNavbar';
import Footer from '../Footer';
import { Modal, Button, Form } from 'react-bootstrap';
import { AiOutlineCloseCircle } from 'react-icons/ai';

function ManageTurf() {
    const [turfs, setTurfs] = useState([]);
    const [selectedTurf, setSelectedTurf] = useState('');
    const [events, setEvents] = useState([]);
    const [turfDetails, setTurfDetails] = useState(null);
    const [editTurfData, setEditTurfData] = useState(null); // for second dropdown turf

    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [editEventData, setEditEventData] = useState({ name: '', type: '', price: '', img: '' });

    const [showAddModal, setShowAddModal] = useState(false);
    const [newTurfData, setNewTurfData] = useState({
        turfname: '',
        address: '',
        coordinates: '',
        heroimg: '',
        court: '',
        price: '',
        availability: true,
        events: [{ name: '', type: '', price: '', img: '' }]
    });

    const [showAddEventModal, setShowAddEventModal] = useState(false);
    const [newEventData, setNewEventData] = useState({
        name: '',
        type: '',
        price: '',
        img: ''
    });

    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchTurfs = async () => {
            try {
                const res = await axios.get('http://localhost:5006/api/auth/getallturf', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setTurfs(res.data);
            } catch (err) {
                console.error("Failed to fetch turfs", err);
            }
        };

        fetchTurfs();
    }, [token]);

    const handleTurfSelect = async (turfId) => {
        setSelectedTurf(turfId);
        try {
            const res = await axios.get(`http://localhost:5006/api/auth/getevents/${turfId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setEvents(res.data.events);
            setTurfDetails(res.data);
        } catch (err) {
            console.error("Failed to fetch events", err);
            setEvents([]);
            setTurfDetails(null);
        }
    };

    const handleDelete = async (eventId) => {
        try {
            const res = await axios.delete(`http://localhost:5006/api/auth/delturfevent/${selectedTurf}/${eventId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setEvents(res.data.remainingEvents);
        } catch (err) {
            console.error("Failed to delete event", err);
        }
    };

    const handleEventUpdate = async () => {
        if (!selectedEvent || !selectedTurf) return;
        try {
            const res = await axios.patch(
                `http://localhost:5006/api/auth/upturf-event/${selectedTurf}/${selectedEvent._id}`,
                editEventData,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            alert('Event updated successfully');
            // Refresh events list
            handleTurfSelect(selectedTurf);
            setShowEditModal(false);
        } catch (err) {
            console.error("Failed to update event", err);
            alert("Failed to update event");
        }
    };


    const handleSecondTurfSelect = (id) => {
        const turf = turfs.find(t => t._id === id);
        setEditTurfData(turf || null);
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditTurfData(prev => ({ ...prev, [name]: value }));
    };

    const handleTurfUpdate = async () => {
        try {
            const res = await axios.patch(`http://localhost:5006/api/auth/upturf/${editTurfData._id}`, editTurfData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert('Turf updated successfully');
        } catch (err) {
            console.error("Update failed", err);
        }
    };
    // const handleTurfUpdate = async () => {
    //     try {
    //         const formData = new FormData();
    //         formData.append('turfname', editTurfData.turfname);
    //         formData.append('address', editTurfData.address);
    //         formData.append('court', editTurfData.court);
    //         formData.append('price', editTurfData.price);
    //         formData.append('availability', editTurfData.availability);
    //         formData.append('coordinates', editTurfData.location.coordinates.join(','));

    //         if (editTurfData.heroimg instanceof File) {
    //             formData.append('heroimg', editTurfData.heroimg);
    //         }

    //         await axios.patch(`http://localhost:5006/api/auth/upturf/${editTurfData._id}`, formData, {
    //             headers: {
    //                 Authorization: `Bearer ${token}`,
    //                 'Content-Type': 'multipart/form-data',
    //             },
    //         });

    //         alert('Turf updated successfully');
    //     } catch (err) {
    //         console.error("Update failed", err);
    //         alert("Failed to update turf");
    //     }
    // };

    const handleTurfDelete = async () => {
        try {
            await axios.delete(`http://localhost:5006/api/auth/delturf/${editTurfData._id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert('Turf deleted');
            setEditTurfData(null);
            setTurfs(turfs.filter(t => t._id !== editTurfData._id));
        } catch (err) {
            console.error("Delete failed", err);
        }
    };
    
    
    const handleAddEvent = async () => {
        if (!editTurfData?._id) {
            alert("Select a turf first.");
            return;
        }

        try {
            const formData = new FormData();
            formData.append('turfId', editTurfData._id);
            formData.append('name', newEventData.name);
            formData.append('type', newEventData.type);
            formData.append('price', newEventData.price);
            if (newEventData.img) {
                formData.append('img', newEventData.img);
            }

            await axios.post(
                `http://localhost:5006/api/auth/addevent/${editTurfData._id}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            alert("Event added successfully");
            setShowAddEventModal(false);
            setNewEventData({ name: '', type: '', price: '', img: '' });
            handleTurfSelect(editTurfData._id);
        } catch (err) {
            console.error("Error adding event", err);
            alert("Failed to add event");
        }
    };

    return (
        <>
            <TNavbar />
            <div className='container my-5 min-vh-100'>
                <Button className='btn btn-success mx-2' onClick={() => setShowAddModal(true)}>New turf</Button>

                <h3 className='mb-4 border-bottom'>Manage Turf Events</h3>


                <div className='mb-4 w-25 d-flex align-items-center'>
                    <select className='form-select' value={selectedTurf} onChange={(e) => handleTurfSelect(e.target.value)}>
                        <option value="">Select Turf</option>
                        {turfs.map(turf => (
                            <option key={turf._id} value={turf._id}>{turf.turfname}</option>
                        ))}
                    </select>
                    {selectedTurf && (
                        <AiOutlineCloseCircle
                            size={24}
                            className='ms-2 text-danger cursor-pointer'
                            onClick={() => {
                                setSelectedTurf('');
                                setTurfDetails(null);
                                setEvents([]);
                            }}
                        />
                    )}
                </div>

                {turfDetails && (
                    <div className='mb-4'>
                        <h5 className='text-capitalize'>{turfDetails.turfname}</h5>
                        <p>Address : {turfDetails.address}</p>
                        <p>Price : {turfDetails.price}-/per hour</p>
                        <img src={`http://localhost:5006${turfDetails.heroimg}`} alt="Turf" style={{ width: '200px', height: 'auto' }} />
                    </div>
                )}

                <div className='row'>
                    {events.map(event => (
                        <div className='col-md-4 mb-3' key={event._id}>
                            <div className='card h-100'>
                                <img src={`http://localhost:5006${event.img}`} className='card-img-top' alt={event.name} />
                                <div className='card-body'>
                                    <h5 className='card-title'>{event.name}</h5>
                                    <p className='card-text'>Type: {event.type}</p>
                                    <p className='card-text'>Price: ₹{event.price}</p>
                                    <button className='btn btn-warning me-2' onClick={() => {
                                        setSelectedEvent(event);
                                        setEditEventData({ name: event.name, type: event.type, price: event.price, img: event.img });
                                        setShowEditModal(true);
                                    }}>Edit</button>
                                    <button className='btn btn-danger' onClick={() => handleDelete(event._id)}>Delete</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className='mt-4 border-top pt-4'>
                    <h4 className='border-bottom mb-3 pb-2'>Manage Turf</h4>
                    <div className='mb-3 w-25'>
                        <select className='form-select' onChange={(e) => handleSecondTurfSelect(e.target.value)}>
                            <option value="">Select Turf</option>
                            {turfs.map(turf => (
                                <option key={turf._id} value={turf._id}>{turf.turfname}</option>
                            ))}
                        </select>
                    </div>

                    {editTurfData && (

                        <Form>

                            <Form.Group className="mb-3">
                                <Form.Label>Turf Name</Form.Label>
                                <Form.Control type="text" name="turfname" value={editTurfData.turfname} onChange={handleEditChange} />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Address</Form.Label>
                                <Form.Control type="text" name="address" value={editTurfData.address} onChange={handleEditChange} />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Coordinates (longitude, latitude)</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="coordinates"
                                    value={editTurfData?.location?.coordinates?.join(',') || ''}
                                    onChange={(e) => {
                                        const [lng, lat] = e.target.value.split(',').map(Number);
                                        setEditTurfData((prev) => ({
                                            ...prev,
                                            location: {
                                                ...prev.location,
                                                type: 'Point',
                                                coordinates: [lng, lat],
                                            },
                                        }));
                                    }}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Turf Image</Form.Label>
                                <Form.Control type="text" name="heroimg" value={editTurfData.heroimg} onChange={handleEditChange} />
                            </Form.Group>





                            <Form.Group className="mb-3">
                                <Form.Label>Court Type</Form.Label>
                                <Form.Control type="text" name="court" value={editTurfData.court} onChange={handleEditChange} />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Price</Form.Label>
                                <Form.Control type="number" name="price" value={editTurfData.price} onChange={handleEditChange} />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Check
                                    type="checkbox"
                                    label="Available"
                                    name="availability"
                                    checked={editTurfData.availability}
                                    onChange={handleEditChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Button className='btn btn-success mx-2' onClick={handleTurfUpdate}>Update</Button>
                                <Button className='btn btn-success mx-2' onClick={() => setShowAddEventModal(true)}>Add Event</Button>
                                <Button className='btn btn-danger mx-2' onClick={handleTurfDelete}>Delete</Button>

                            </Form.Group>
                        </Form>
                    )}
                </div>
            </div>
            <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Event</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={editEventData.name}
                                onChange={(e) => setEditEventData({ ...editEventData, name: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Type</Form.Label>
                            <Form.Control
                                type="text"
                                name="type"
                                value={editEventData.type}
                                onChange={(e) => setEditEventData({ ...editEventData, type: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type="number"
                                name="price"
                                value={editEventData.price}
                                onChange={(e) => setEditEventData({ ...editEventData, price: e.target.value })}
                            />
                        </Form.Group>
                       

                        <Form.Group className="mb-3">
                            <Form.Label>Upload Hero Image</Form.Label>
                            <Form.Control
                                type="file"
                                name="heroimg"
                                accept="image/*"
                                onChange={(e) => setEditEventData({ ...editEventData, heroimg: e.target.files[0] })}
                            />
                        </Form.Group>


                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowEditModal(false)}>Cancel</Button>
                    <Button variant="primary" onClick={handleEventUpdate}>Save Changes</Button>
                </Modal.Footer>
            </Modal>

            {/* to add new turf */}
            <Modal show={showAddModal} onHide={() => setShowAddModal(false)} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Add New Turf</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Turf Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="turfname"
                                value={newTurfData.turfname}
                                onChange={(e) => setNewTurfData({ ...newTurfData, turfname: e.target.value })}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                type="text"
                                name="address"
                                value={newTurfData.address}
                                onChange={(e) => setNewTurfData({ ...newTurfData, address: e.target.value })}
                            />
                        </Form.Group>

                      
                        <Form.Group className="mb-3">
                            <Form.Label>Hero Image</Form.Label>
                            <Form.Control
                                type="file"
                                accept="image/*"
                                onChange={(e) => setNewTurfData({ ...newTurfData, heroimg: e.target.files[0] })}
                            />
                        </Form.Group>



                        <Form.Group className="mb-3">
                            <Form.Label>Court Type</Form.Label>
                            <Form.Control
                                type="text"
                                value={newTurfData.court}
                                onChange={(e) => setNewTurfData({ ...newTurfData, court: e.target.value })}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type="number"
                                value={newTurfData.price}
                                onChange={(e) => setNewTurfData({ ...newTurfData, price: Number(e.target.value) })}
                            />
                        </Form.Group>

                        <Form.Check
                            type="checkbox"
                            label="Available"
                            checked={newTurfData.availability}
                            onChange={(e) => setNewTurfData({ ...newTurfData, availability: e.target.checked })}
                        />

                        <hr />
                        <h5>Add Event(s)</h5>
                        {newTurfData.events.map((event, index) => (
                            <div key={index} className="mb-3 border p-2 rounded">
                                <Form.Control
                                    type="text"
                                    placeholder="Name"
                                    value={event.name}
                                    onChange={(e) => {
                                        const updated = [...newTurfData.events];
                                        updated[index].name = e.target.value;
                                        setNewTurfData({ ...newTurfData, events: updated });
                                    }}
                                    className="mb-2"
                                />
                                <Form.Control
                                    type="text"
                                    placeholder="Type"
                                    value={event.type}
                                    onChange={(e) => {
                                        const updated = [...newTurfData.events];
                                        updated[index].type = e.target.value;
                                        setNewTurfData({ ...newTurfData, events: updated });
                                    }}
                                    className="mb-2"
                                />
                                <Form.Control
                                    type="number"
                                    placeholder="Price"
                                    value={event.price}
                                    onChange={(e) => {
                                        const updated = [...newTurfData.events];
                                        updated[index].price = e.target.value;
                                        setNewTurfData({ ...newTurfData, events: updated });
                                    }}
                                    className="mb-2"
                                />
                               
                                <Form.Control
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        const updated = [...newTurfData.events];
                                        updated[index].img = e.target.files[0];
                                        setNewTurfData({ ...newTurfData, events: updated });
                                    }}
                                />

                            </div>
                        ))}
                        <Button
                            variant="outline-primary"
                            onClick={() =>
                                setNewTurfData({ ...newTurfData, events: [...newTurfData.events, { name: '', type: '', price: '', img: '' }] })
                            }
                        >
                            Add Another Event
                        </Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowAddModal(false)}>Cancel</Button>
                   
                    <Button variant="success" onClick={async () => {
                        try {
                            const formData = new FormData();
                            formData.append('turfname', newTurfData.turfname);
                            formData.append('address', newTurfData.address);
                            formData.append('court', newTurfData.court);
                            formData.append('price', newTurfData.price);
                            formData.append('availability', newTurfData.availability);
                            if (newTurfData.heroimg) {
                                formData.append('heroimg', newTurfData.heroimg);
                            }

                            const eventsData = newTurfData.events.map(({ name, type, price }) => ({ name, type, price }));
                            formData.append('events', JSON.stringify(eventsData));

                            newTurfData.events.forEach((event, index) => {
                                if (event.img) {
                                    formData.append('eventimgs', event.img); // multer uses field name 'eventimgs'
                                }
                            });

                            await axios.post('http://localhost:5006/api/auth/addturf', formData, {
                                headers: {
                                    'Authorization': `Bearer ${token}`,
                                    'Content-Type': 'multipart/form-data',
                                },
                            });

                            alert("Turf added successfully!");
                            setShowAddModal(false);
                            window.location.reload();
                        } catch (err) {
                            console.error(err);
                            alert("Failed to add turf");
                        }
                    }}>
                        Add Turf
                    </Button>

                </Modal.Footer>
            </Modal>
            {/* to add event */}
            <Modal show={showAddEventModal} onHide={() => setShowAddEventModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Event</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={newEventData.name}
                                onChange={(e) => setNewEventData({ ...newEventData, name: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Type</Form.Label>
                            <Form.Control
                                type="text"
                                value={newEventData.type}
                                onChange={(e) => setNewEventData({ ...newEventData, type: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type="number"
                                value={newEventData.price}
                                onChange={(e) => setNewEventData({ ...newEventData, price: e.target.value })}
                            />
                        </Form.Group>
                       
                        <Form.Group className="mb-3">
                            <Form.Label>Upload Event Image</Form.Label>
                            <Form.Control
                                type="file"
                                accept="image/*"
                                onChange={(e) => setNewEventData({ ...newEventData, img: e.target.files[0] })}
                            />
                        </Form.Group>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowAddEventModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="success" onClick={handleAddEvent}>
                        Add Event
                    </Button>
                </Modal.Footer>
            </Modal>

            <Footer />
        </>
    );
}

export default ManageTurf;
