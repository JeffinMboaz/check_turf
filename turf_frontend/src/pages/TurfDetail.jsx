
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Container, Card, Col, Row, Button } from 'react-bootstrap';
import TNavbar from '../components/TNavbar';
import Footer from '../components/Footer';

function TurfDetail() {
  const { id } = useParams();
  const [turfData, setTurfData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTurfEvents = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(` ${import.meta.env.VITE_BACKEND_BASE_URL}/api/auth/getevents/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTurfData(res.data);
      } catch (error) {
        console.error("Error fetching turf details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTurfEvents();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!turfData) return <p>No turf data found.</p>;

  const latitude = turfData.location?.coordinates?.[1];
  const longitude = turfData.location?.coordinates?.[0];
  const events = turfData.events;

  const handleShow = (event) => {
    // Booking logic here
    alert(`Booking for: ${event.name}`);
  };

  return (
    <>
    <TNavbar/>
    <Container className="my-4">
      <Card className="shadow-sm">
        <Card.Header className="bg-primary text-white text-center">
          <h4 className="mb-0"> Turf Details</h4>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col md={6}>
            <h5 className="text-capitalize">{turfData.turfname}</h5>
            <p><strong>Address:</strong> {turfData.address}</p>
              <p><strong>Price:</strong> ₹{turfData.price}</p>
              {turfData.heroimg && (
                <img
                  src={` ${import.meta.env.VITE_BACKEND_BASE_URL}${turfData.heroimg}`}
                  alt="Turf"
                  className="img-fluid rounded shadow-sm"
                  style={{ height: "200px", width:"300px", objectFit: "cover" }}
                />

//                 <img
//   src={turfData.heroimg} // ✅ use directly
//   alt="Turf"
//   className="img-fluid rounded shadow-sm"
//   style={{ height: "200px", width:"300px", objectFit: "cover" }}
// />

              )}

            </Col>
            <Col md={6}>
              {latitude && longitude ? (
                <div className='rounded shadow' style={{ width: "100%", height: "300px" }}>
                  <iframe
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    style={{ border: 0 }}
                    src={`https://www.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`}
                    allowFullScreen
                    title="Turf Location"
                  ></iframe>
                </div>
              ) : (
                <p>Location not available</p>
              )}
            </Col>
          </Row>

          <hr />

          {events && events.length > 0 ? (
            <div>
              <h5 className="mt-4">Available Events</h5>
              <Row>
                {events.map((event, idx) => (
                  <Col md={6} lg={3} key={idx} className="mb-4">
                    <Card className="h-100 shadow-sm">
                      {event.img && (
                        <Card.Img
                          variant="top"
                          src={` ${import.meta.env.VITE_BACKEND_BASE_URL}${event.img}`}
                          
                          alt={event.name}
                          style={{ height: "180px", objectFit: "cover" }}
                        />
//                         <Card.Img
//   variant="top"
//   src={event.img} // ✅ use directly
//   alt={event.name}
//   style={{ height: "180px", objectFit: "cover" }}
// />

                      )}
                      <Card.Body className="d-flex flex-column">
                        <Card.Title>{event.name}</Card.Title>
                        <Card.Text>Type: {event.type}</Card.Text>
                        <Card.Text>Price: ₹{event.price}/hour</Card.Text>
                       
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>
          ) : (
            <p>No events available for this turf.</p>
          )}
        </Card.Body>
        <Card.Footer className="text-muted text-center">
          <Link to="/managerdashboard">
            <Button>Back</Button>
          </Link>
        </Card.Footer>
      </Card>
    </Container>
    <Footer/>
    </>
  );
}

export default TurfDetail;
