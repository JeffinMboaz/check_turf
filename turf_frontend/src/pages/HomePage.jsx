
import React, { useEffect, useState } from "react";
import TNavbar from "../components/TNavbar";
import Footer from "../components/Footer";
import Card from "react-bootstrap/Card";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function HomePage() {
  const [sports] = useState([
    {
      title: "Football",
      pic: "https://cdn.pixabay.com/photo/2014/10/14/20/24/football-488714_1280.jpg",
    },
    {
      title: "Cricket",
      pic: "https://plus.unsplash.com/premium_photo-1722351690065-210079a0a82c?fm=jpg&q=60&w=3000",
    },
    {
      title: "Volleyball",
      pic: "https://m.media-amazon.com/images/I/81b7-KRsYIS._AC_UF894,1000_QL80_.jpg",
    },
    {
      title: "Badminton",
      pic: "https://t3.ftcdn.net/jpg/03/10/62/12/360_F_310621281_foEqKBGtGlNWFQRePgdF5BpLOFyTsnzO.jpg",
    },
    {
      title: "Basketball",
      pic: "https://st3.depositphotos.com/14115800/16832/i/450/depositphotos_168325352-stock-photo-basketball-players-on-big-professional.jpg",
    },
    {
      title: "Hockey",
      pic: "https://media.istockphoto.com/id/1457057147/photo/sports-fitness-field-hockey-game-and-women-challenge-for-ball-in-stadium-competition-club.jpg?s=612x612&w=0&k=20&c=o41JWFRq1cUyko8a3BFxEp636vF3TmcjAOG42vsujnw=",
    },
  {
    title:"Tennis",
    pic:"https://images.unsplash.com/flagged/photo-1576972405668-2d020a01cbfa?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dGVubmlzJTIwZ2FtZXxlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    title:"Fitness Bootcamp",
    pic:"https://images.ctfassets.net/ipjoepkmtnha/1IMXNIXuGiRmeWomYKsWM3/be83d712939895e8698aeac985fac13c/header-skillrun-bootcamp-desktop_22.jpg"
  }
  ]);

  const handleCardClick = () => {
    toast.info("Please login", {
      position: "top-right",
    });
  };

  return (
    <>
      <TNavbar />
      <div className="min-vh-100 d-flex flex-column justify-content-start">
        {/* Hero Section */}
        <div className="container-fluid p-0">
          <img
            src="https://s3-figma-hubfile-images-production.figma.com/hub/file/carousel/img/9def5a2e5a441fc4cfe3ba9ea57c614b448848af"
            alt="hero"
            className="hero-img w-100"
          />
        </div>

        {/* Welcome Section */}
        <div className="container-fluid bg-secondary text-white text-center">
          <h4 className="fw-semibold">
            <i>Welcome to EFC Fitness Hub & Academies</i>
          </h4>
        </div>

        {/* Sports Category Cards */}
        <div className="container-fluid my-4">
          <h2 className="mb-4 text-center">Explore Sports</h2>
          <div className="row g-4 container-fluid justify-content-center ">
            {sports.map((sport, index) => (
              <div className="col-md-4 col-lg-3 " key={index}>
                <Card
                  onClick={handleCardClick}
                  className="h-100  shadow-sm cursor-pointer sport-card"
                  style={{ cursor: "pointer" }}
                >
                  <Card.Img
                    variant="top"
                    src={sport.pic}
                    style={{ height: "250px", objectFit: "cover" }}
                  />
                  <Card.Body className="text-center">
                    <Card.Title>{sport.title}</Card.Title>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>
        </div>
      

        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar
          pauseOnHover
          theme="colored"
        />
      </div>
      <Footer />
    </>
  );
}

export default HomePage;
