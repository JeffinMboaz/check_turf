// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   Container,
//   Table,
//   Spinner,
//   Alert,
//   Button,
//   Row,
//   Col,
//   Card,
// } from "react-bootstrap";
// import { FaEdit, FaTrashAlt } from "react-icons/fa";
// import TNavbar from '../TNavbar'
// import Footer from '../Footer'

// function ManageUsers() {
//     const [users, setUsers] = useState([]);
//     const [loading, setLoading] = useState(true);

//     const fetchUsers = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const res = await axios.get("http://localhost:5006/api/auth/admgetalluser", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setUsers(res.data.data);
//       } catch (err) {
//         console.error("Failed to fetch users:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     useEffect(() => {
//       fetchUsers();
//     }, []);
//   return (
//     <>
//      <TNavbar/>
//      <div className='min-vh-100'>
//      <Container className="my-5">
//       <h2 className="text-center mb-4 fw-bold">Manage Users</h2>

//       {loading ? (
//         <div className="text-center my-5">
//           <Spinner animation="border" variant="primary" />
//           <p className="mt-2">Loading users...</p>
//         </div>
//       ) : users.length === 0 ? (
//         <Alert variant="info" className="text-center">
//           No users found.
//         </Alert>
//       ) : (
//         <Table striped bordered hover responsive className="shadow">
//           <thead className="table-dark">
//             <tr>
//               <th>#</th>
//               <th>Full Name</th>
//               <th>Email</th>
//               <th>Phone</th>
//               <th>Role</th>
//               <th>Password (Hashed)</th>
//               <th>Registered On</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.map((user, index) => (
//               <tr key={user._id}>
//                 <td>{index + 1}</td>
//                 <td>{user.fullname}</td>
//                 <td>{user.email}</td>
//                 <td>{user.phonenumber}</td>
//                 <td>{user.role}</td>
//                 <td className="text-break" style={{ maxWidth: "200px" }}>
//                   {user.password}
//                 </td>
//                 <td>{new Date(user.createdAt).toLocaleDateString()}</td>
//                 <td>
//                   <Button variant="outline-primary" size="sm" className="me-2">
//                     <FaEdit /> Edit
//                   </Button>
//                   <Button variant="outline-danger" size="sm">
//                     <FaTrashAlt /> Delete
//                   </Button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//       )}
//     </Container>
//      </div>
//      <Footer/>
//     </>
//   )
// }

// export default ManageUsers

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Table,
  Spinner,
  Alert,
  Button,
  Modal,
  Form,
} from "react-bootstrap";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TNavbar from "../TNavbar";
import Footer from "../Footer";

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState({});

  const [showCreateModal, setShowCreateModal] = useState(false);
const [newUserData, setNewUserData] = useState({
  fullname: "",
  email: "",
  phonenumber: "",
  role: "user",
  password: ""
});

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5006/api/auth/admgetalluser", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(res.data.data);
    } catch (err) {
      console.error("Failed to fetch users:", err);
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5006/api/auth/deluser/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("User deleted successfully");
      setUsers((prev) => prev.filter((user) => user._id !== userId));
    } catch (err) {
      console.error("Delete error:", err);
      toast.error("Failed to delete user");
    }
  };

  const openEditModal = (user) => {
    setEditData(user);
    setShowModal(true);
  };

 const handleUpdate = async () => {
  try {
    const token = localStorage.getItem("token");
    const { _id, fullname, email, phonenumber, role, password } = editData;

    // Prepare payload; only send password if it's filled
    const payload = {
      fullname,
      email,
      phonenumber,
      role,
    };
    if (password) payload.password = password;

    const res = await axios.put(`http://localhost:5006/api/auth/admupdateuser/${_id}`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    toast.success("User updated successfully");
    setShowModal(false);
    setEditData({});
    fetchUsers(); // Refresh user list
  } catch (err) {
    console.error("Update error:", err);
    toast.error("Failed to update user");
  }
};
const handleCreateUser = async () => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.post("http://localhost:5006/api/auth/admcreateuser", newUserData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    toast.success("User created successfully");
    setShowCreateModal(false);
    setNewUserData({
      fullname: "",
      email: "",
      phonenumber: "",
      role: "user",
      password: ""
    });
    fetchUsers(); // Refresh list
  } catch (err) {
    console.error("Create user error:", err);
    const msg = err.response?.data?.message || "Failed to create user";
    toast.error(msg);
  }
};


  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <TNavbar />
      <ToastContainer />
      <div className="min-vh-100">
        <Container className="my-5">
          <h2 className="text-center mb-4 fw-bold">Manage Users</h2>
<div className="text-end mb-3">
  <Button onClick={() => setShowCreateModal(true)}>+ Create New User</Button>
</div>

          {loading ? (
            <div className="text-center my-5">
              <Spinner animation="border" variant="primary" />
              <p className="mt-2">Loading users...</p>
            </div>
          ) : users.length === 0 ? (
            <Alert variant="info" className="text-center">
              No users found.
            </Alert>
          ) : (
            <Table striped bordered hover responsive className="shadow">
              <thead className="table-dark">
                <tr>
                  <th>#</th>
                  <th>Full Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Role</th>
                  <th>Password (Hashed)</th>
                  <th>Registered On</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={user._id}>
                    <td>{index + 1}</td>
                    <td>{user.fullname}</td>
                    <td>{user.email}</td>
                    <td>{user.phonenumber}</td>
                    <td>{user.role}</td>
                    <td className="text-break" style={{ maxWidth: "200px" }}>
                      {user.password}
                    </td>
                    <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                    <td>
                      <Button
                        variant="outline-primary"
                        size="sm"
                        className="me-2"
                        onClick={() => openEditModal(user)}
                      >
                        <FaEdit /> Edit
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => deleteUser(user._id)}
                      >
                        <FaTrashAlt /> Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Container>
      </div>
      <Footer />

      {/* Edit Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                value={editData.fullname || ""}
                onChange={(e) =>
                  setEditData({ ...editData, fullname: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={editData.email || ""}
                onChange={(e) =>
                  setEditData({ ...editData, email: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                value={editData.phonenumber || ""}
                onChange={(e) =>
                  setEditData({ ...editData, phonenumber: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
  <Form.Label>Role</Form.Label>
  <Form.Select
    value={editData.role || ""}
    onChange={(e) => setEditData({ ...editData, role: e.target.value })}
  >
    <option value="user">User</option>
    <option value="manager">Manager</option>
    <option value="admin">Admin</option>
  </Form.Select>
</Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Leave blank to keep current password"
                onChange={(e) =>
                  setEditData({ ...editData, password: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      {/* to create new user */}
      <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)}>
  <Modal.Header closeButton>
    <Modal.Title>Create New User</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>Full Name</Form.Label>
        <Form.Control
          type="text"
          value={newUserData.fullname}
          onChange={(e) => setNewUserData({ ...newUserData, fullname: e.target.value })}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          value={newUserData.email}
          onChange={(e) => setNewUserData({ ...newUserData, email: e.target.value })}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Phone</Form.Label>
        <Form.Control
          type="text"
          value={newUserData.phonenumber}
          onChange={(e) => setNewUserData({ ...newUserData, phonenumber: e.target.value })}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Role</Form.Label>
        <Form.Select
          value={newUserData.role}
          onChange={(e) => setNewUserData({ ...newUserData, role: e.target.value })}
        >
          <option value="user">User</option>
          <option value="manager">Manager</option>
          <option value="admin">Admin</option>
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          value={newUserData.password}
          onChange={(e) => setNewUserData({ ...newUserData, password: e.target.value })}
        />
      </Form.Group>
    </Form>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={() => setShowCreateModal(false)}>
      Cancel
    </Button>
    <Button variant="primary" onClick={handleCreateUser}>
      Create
    </Button>
  </Modal.Footer>
</Modal>

    </>
  );
}

export default ManageUsers;
