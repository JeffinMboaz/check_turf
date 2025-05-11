

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    Container,
    Row,
    Col,
    Card,
    Button,
    Spinner,
    Alert,
    Toast,
    ToastContainer,
} from "react-bootstrap";
import { FaStar, FaTrashAlt } from "react-icons/fa";
import Footer from "../Footer";
import TNavbar from "../TNavbar";

const ManageReviews = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [toastMsg, setToastMsg] = useState("");
    const [showToast, setShowToast] = useState(false);

    const fetchReviews = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.get("http://localhost:5006/api/auth/admgetallreviews", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setReviews(res.data.data);
        } catch (err) {
            console.error("Failed to fetch reviews:", err);
        } finally {
            setLoading(false);
        }
    };

    const deleteReview = async (id) => {
        try {
            const token = localStorage.getItem("token");
            await axios.delete(`http://localhost:5006/api/auth/admdelreview/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setReviews((prev) => prev.filter((r) => r._id !== id));
            setToastMsg("Review deleted successfully.");
            setShowToast(true);
        } catch (err) {
            console.error("Delete failed:", err);
            setToastMsg("Failed to delete review.");
            setShowToast(true);
        }
    };

    useEffect(() => {
        fetchReviews();
    }, []);

    return (
        <>
            <TNavbar />
            <div className="min-vh-100">

                <Container className="my-5">
                    <h2 className="text-center mb-4 fw-bold">User Reviews Management</h2>

                    {loading ? (
                        <div className="text-center my-5">
                            <Spinner animation="border" variant="primary" />
                            <p className="mt-2">Loading reviews...</p>
                        </div>
                    ) : reviews.length === 0 ? (
                        <Alert variant="info" className="text-center">
                            No reviews found.
                        </Alert>
                    ) : (
                        <Row xs={1} sm={2} md={3} className="g-4">
                            {reviews.map((review) => (
                                <Col key={review._id}>
                                    <Card className="shadow-sm h-100  rounded-4" border="primary">
                                        <Card.Body>
                                            <Card.Title className="text-primary fw-bold text-capitalize">
                                                {review.turfname?.turfname || "Unknown Turf"}
                                            </Card.Title>
                                            <Card.Subtitle className="mb-2 text-muted text-capitalize ">
                                                by {review.username?.fullname || "Anonymous"}
                                            </Card.Subtitle>
                                            <Card.Text className="fst-italic mt-2">"{review.review}"</Card.Text>
                                            <div className="d-flex align-items-center mb-2">
                                                <FaStar className="text-warning me-1" />
                                                <span>{review.rating} / 5</span>
                                            </div>
                                            <small className="text-muted">
                                                {new Date(review.createdAt).toLocaleDateString()}
                                            </small>
                                        </Card.Body>
                                        <Card.Footer className="bg-transparent border-0">
                                            <Button
                                                variant="danger"
                                                size="sm"
                                                onClick={() => deleteReview(review._id)}
                                            >
                                                <FaTrashAlt className="me-2" />
                                                Delete
                                            </Button>
                                        </Card.Footer>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    )}

                    <ToastContainer position="top-end" className="p-3">
                        <Toast
                            show={showToast}
                            onClose={() => setShowToast(false)}
                            delay={3000}
                            autohide
                            bg="success"
                        >
                            <Toast.Body className="text-white">{toastMsg}</Toast.Body>
                        </Toast>
                    </ToastContainer>
                </Container>
            </div>
            <Footer />

        </>
    );
};

export default ManageReviews;
