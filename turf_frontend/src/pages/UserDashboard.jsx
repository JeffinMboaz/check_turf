import React, { useEffect, useState } from "react";
import TNavbar from "../components/TNavbar";
import Card from "react-bootstrap/Card";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify"; // ⬅️ Also import Toast
import "react-toastify/dist/ReactToastify.css";
import Footer from "../components/Footer";
function UserDashboard() {
  const [turf, SetTurfs] = useState([]);

  useEffect(() => {
    const getTurfs = async () => {
      try {
        const res = await axios.get("http://localhost:5006/api/auth/allturf",
           {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        SetTurfs(res.data || []);
      } catch (error) {
        console.error(error.response?.data?.message || error.message);
        toast.error(error.response?.data?.message || "Failed to fetch turfs", {
          position: "top-right",
        });
      }
    };
    getTurfs();
  }, []);

  return (
    <>
      <div>
        <TNavbar />
        <div className="px-4 py-3">
          <h2 className="mb-4">Available Turfs</h2>

          <div className="d-flex flex-wrap gap-4">
            {turf.length > 0 ? (
              turf.map((turf, index) => (
                
                <Card key={turf._id || index} style={{ width: "18rem" }}>
                  <Card.Link href={`/bookturf/${turf._id}`}>
                   <img
                      src={`http://localhost:5006${turf.heroimg}`}
                      alt="Turf"
                      style={{ width: '100%', maxHeight: '200px', objectFit: 'cover' }}
                    />
                    </Card.Link>
                
                  <Card.Body>
                           <Card.Title style={{ textTransform: 'capitalize' }}>
                      {turf.turfname}
                    </Card.Title>
                   
                   
                     <strong>Address:</strong> {turf.address}<br />

                    <Card.Link href={`/bookturf/${turf._id}`}>
                      Book Now
                    </Card.Link>
                  </Card.Body>
                </Card>
              ))
            ) : (
              <p>No turfs available</p>
            )}
          </div>
        </div>
        {/* Toast Container */}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar
          pauseOnHover
          theme="colored"
        />
        <Footer/>
      </div>
    </>
  );
}

export default UserDashboard;
