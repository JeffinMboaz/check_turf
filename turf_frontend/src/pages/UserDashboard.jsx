// import React, { useEffect, useState } from "react";
import React, { useEffect, useState } from "react"
import TNavbar from "../components/TNavbar";
import Card from "react-bootstrap/Card";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css";
import Footer from "../components/Footer";

function UserDashboard() {
  const [turf, SetTurfs] = useState([]);

  useEffect(() => {
    const getTurfs = async () => {
      try {
        const res = await axios.get(`${import.meta.env.Backend_Base_Url}/api/auth/allturf`, {
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
        <div className="container px-4 py-5">
          <h2 className="mb-4 text-center">Available Turfs</h2>

          {/* Bootstrap grid system to make the cards responsive */}
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
            {turf.length > 0 ? (
              turf.map((turf, index) => (
                <div className="col" key={turf._id || index}>
                  <Card className="h-100">
                    <Card.Link href={`/bookturf/${turf._id}`}>
                      <img
                        src={`${import.meta.env.Backend_Base_Url}${turf.heroimg}`}
                        alt="Turf"
                        className="card-img-top"
                        style={{
                          height: "200px",
                          objectFit: "cover",
                        }}
                      />
                    </Card.Link>
                    <Card.Body>
                      <Card.Title className="text-capitalize">{turf.turfname}</Card.Title>
                      <p><strong>Address:</strong> {turf.address}</p>
                      <Card.Link href={`/bookturf/${turf._id}`} className="btn btn-primary w-100">
                        Book Now
                      </Card.Link>
                    </Card.Body>
                  </Card>
                </div>
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
        
        <Footer />
      </div>
    </>
  );
}

export default UserDashboard;
