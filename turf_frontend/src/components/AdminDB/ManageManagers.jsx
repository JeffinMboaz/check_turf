import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Table,
  Button,
  Modal,
  Form,
  Spinner,
  Alert,
} from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../Footer";
import TNavbar from "../TNavbar";

function ManageManagers() {
  const [managers, setManagers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phonenumber: "",
    password: "",
  });
  const [editId, setEditId] = useState(null);

  const fetchManagers = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5006/api/auth/admgetmanagers", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setManagers(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      const url = isEditing
        ? `http://localhost:5006/api/auth/admupdatemanager/${editId}`
        : "http://localhost:5006/api/auth/admcreatemanager";
      const method = isEditing ? "put" : "post";

      await axios[method](url, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success(`Manager ${isEditing ? "updated" : "created"} successfully`);
      setShowModal(false);
      setFormData({ fullname: "", email: "", phonenumber: "", password: "" });
      fetchManagers();
    } catch (err) {
      toast.error("Operation failed");
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this manager?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5006/api/auth/admdelmanager/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Manager deleted");
      fetchManagers();
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  const openCreateModal = () => {
    setIsEditing(false);
    setFormData({ fullname: "", email: "", phonenumber: "", password: "" });
    setShowModal(true);
  };

  const openEditModal = (manager) => {
    setIsEditing(true);
    setEditId(manager._id);
    setFormData({
      fullname: manager.fullname,
      email: manager.email,
      phonenumber: manager.phonenumber,
      password: "",
    });
    setShowModal(true);
  };

  useEffect(() => {
    fetchManagers();
  }, []);

  return (
    <>
    <TNavbar/>
      <Container className="my-5">
      <ToastContainer />
      <h2 className="mb-4 text-center fw-bold">Manage Managers</h2>
      <div className="text-end mb-3">
        <Button onClick={openCreateModal}>+ Add Manager</Button>
      </div>

      {loading ? (
        <Spinner animation="border" />
      ) : managers.length === 0 ? (
        <Alert variant="info">No managers found.</Alert>
      ) : (
        <Table bordered hover>
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {managers.map((mgr, idx) => (
              <tr key={mgr._id}>
                <td>{idx + 1}</td>
                <td>{mgr.fullname}</td>
                <td>{mgr.email}</td>
                <td>{mgr.role}</td>
                <td>{mgr.phonenumber}</td>
                <td>
                  <Button variant="outline-primary" size="sm" className="me-2" onClick={() => openEditModal(mgr)}>
                    <FaEdit /> Edit
                  </Button>
                  <Button variant="outline-danger" size="sm" onClick={() => handleDelete(mgr._id)}>
                    <FaTrashAlt /> Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {/* Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? "Edit Manager" : "Create Manager"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                value={formData.fullname}
                onChange={(e) => setFormData({ ...formData, fullname: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                value={formData.phonenumber}
                onChange={(e) => setFormData({ ...formData, phonenumber: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>{isEditing ? "New Password (optional)" : "Password"}</Form.Label>
              <Form.Control
                type="password"
                placeholder={isEditing ? "Leave blank to keep current password" : ""}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            {isEditing ? "Update" : "Create"}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
    <Footer/>
  
  </>
);
}

export default ManageManagers;
