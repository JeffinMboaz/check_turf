import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Container, Row, Col, Card } from 'react-bootstrap';
import TNavbar from "../components/TNavbar";
import Footer from "../components/Footer";

const SearchResults = () => {
  const [turfs, setTurfs] = useState([]);
  const location = useLocation();

  useEffect(() => {
   const fetchResults = async () => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.get(` http://localhost:5006/api/auth/searchturf${location.search}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setTurfs(res.data);
  } catch (error) {
    console.error("Error fetching search results:", error);
  }
};


    fetchResults();
  }, [location.search]);

  return (
   
<>

<TNavbar/>

<Container className="my-5">
  <h2 className="text-center mb-4">Search Results</h2>
  {turfs.length === 0 ? (
    <p className="text-center text-muted">No turfs found.</p>
  ) : (
    <Row xs={1} sm={2} md={3} className="g-4">
      {turfs.map((turf) => (
        <Col key={turf._id}>
          <Card className="h-100 shadow-sm">
            <Card.Img 
              variant="top" 
              src={` http://localhost:5006${turf.heroimg}`} 
              alt={turf.turfname} 
              style={{ height: '200px', objectFit: 'cover' }} 
            />
            <Card.Body>
              <Card.Title>{turf.turfname}</Card.Title>
              <Card.Text>
                <strong>Address:</strong> {turf.address}<br />
                <strong>Price:</strong> ₹{turf.price}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  )}
</Container>
<Footer/>
</>
  );
};

export default SearchResults;
