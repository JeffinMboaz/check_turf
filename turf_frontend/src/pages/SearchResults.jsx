// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useLocation } from "react-router-dom";
// import { Container, Row, Col, Card } from 'react-bootstrap';
// import TNavbar from "../components/TNavbar";
// import Footer from "../components/Footer";

// const SearchResults = () => {
//   const [turfs, setTurfs] = useState([]);
//   const location = useLocation();

//   useEffect(() => {
//    const fetchResults = async () => {
//   try {
//     const token = localStorage.getItem("token");
//     const res = await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/auth/searchturf${location.search}`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     setTurfs(res.data);
//   } catch (error) {
//     console.error("Error fetching search results:", error);
//   }
// };


//     fetchResults();
//   }, [location.search]);

//   return (
   
// <>

// <TNavbar/>

// <Container className="my-5">
//   <h2 className="text-center mb-4">Search Results</h2>
//   {turfs.length === 0 ? (
//     <p className="text-center text-muted">No turfs found.</p>
//   ) : (
//     <Row xs={1} sm={2} md={3} className="g-4">
//       {turfs.map((turf) => (
//         <Col key={turf._id}>
//           <Card className="h-100 shadow-sm">
//            <Card.Link href={`/bookturf/${turf._id}`}>
//                                  <img
//                                    // src={`${import.meta.env.VITE_BACKEND_BASE_URL}${turf.heroimg}`}
//                                   src={turf.heroimg}
                                   
//                                    alt="Turf"
//                                    className="card-img-top"
//                                    style={{
//                                      height: "200px",
//                                      objectFit: "cover",
//                                    }}
//                                  />
//                                </Card.Link>
//             <Card.Body>
//               <Card.Title>{turf.turfname}</Card.Title>
//               <Card.Text>
//                 <strong>Address:</strong> {turf.address}<br />
//                 <strong>Price:</strong> ₹{turf.price}
//               </Card.Text>
//             </Card.Body>
//           </Card>
//         </Col>
//       ))}
//     </Row>
//   )}
// </Container>
// <Footer/>
// </>
//   );
// };

// export default SearchResults;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useLocation } from "react-router-dom";
// import { Container, Row, Col, Card, Spinner } from 'react-bootstrap';
// import TNavbar from "../components/TNavbar";
// import Footer from "../components/Footer";

// const SearchResults = () => {
//   const [turfs, setTurfs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const location = useLocation();

//   useEffect(() => {
//     const fetchResults = async () => {
//       setLoading(true);
//       try {
//         const token = localStorage.getItem("token");
//         const res = await axios.get(
//           `${import.meta.env.VITE_BACKEND_BASE_URL}/api/auth/searchturf${location.search}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         setTurfs(res.data);
//       } catch (error) {
//         console.error("Error fetching search results:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchResults();
//   }, [location.search]);

//   return (
//     <>
//       <TNavbar />

//       <Container className="my-5">
//         <h2 className="text-center mb-4">
//           Search Results {loading ? "" : `(${turfs.length})`}
//         </h2>

//         {loading ? (
//           <div className="text-center">
//             <Spinner animation="border" variant="primary" />
//             <p className="text-muted mt-2">Loading turfs...</p>
//           </div>
//         ) : turfs.length === 0 ? (
//           <p className="text-center text-muted">No turfs found.</p>
//         ) : (
//           <Row xs={1} sm={2} md={3} className="g-4">
//             {turfs.map((turf) => (
//               <Col key={turf._id}>
//                 <Card className="h-100 shadow-sm">
//                   <Card.Link href={`/bookturf/${turf._id}`}>
//                     <img
//                       src={turf.heroimg}
//                       alt="Turf"
//                       className="card-img-top"
//                       style={{
//                         height: "200px",
//                         objectFit: "cover",
//                       }}
//                     />
//                   </Card.Link>
//                   <Card.Body>
//                     <Card.Title>{turf.turfname}</Card.Title>
//                     <Card.Text>
//                       <strong>Address:</strong> {turf.address}
//                       <br />
//                       <strong>Price:</strong> ₹{turf.price}
//                     </Card.Text>
//                   </Card.Body>
//                 </Card>
//               </Col>
//             ))}
//           </Row>
//         )}
//       </Container>

//       <Footer />
//     </>
//   );
// };

// export default SearchResults;

// adding
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Container, Row, Col, Card, Spinner } from 'react-bootstrap';
import TNavbar from "../components/TNavbar";
import Footer from "../components/Footer";

const SearchResults = () => {
  const [turfs, setTurfs] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const keyword = queryParams.get("keyword");

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_BASE_URL}/api/auth/searchturf?keyword=${keyword}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setTurfs(res.data);
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setLoading(false);
      }
    };

    if (keyword) {
      fetchResults();
    }
  }, [keyword]);

  return (
    <>
      <TNavbar />

      <Container className="my-5">
        <h2 className="text-center mb-4">
          {keyword ? `Results for "${keyword}"` : "Search Results"}{" "}
          {!loading && `(${turfs.length})`}
        </h2>

        {loading ? (
          <div className="text-center">
            <Spinner animation="border" variant="primary" />
            <p className="text-muted mt-2">Loading turfs...</p>
          </div>
        ) : turfs.length === 0 ? (
          <p className="text-center text-muted">No turfs found.</p>
        ) : (
          <Row xs={1} sm={2} md={3} className="g-4">
            {turfs.map((turf) => (
              <Col key={turf._id}>
                <Card className="h-100 shadow-sm">
                  <Card.Link href={`/bookturf/${turf._id}`}>
                    <img
                      src={turf.heroimg}
                      alt="Turf"
                      className="card-img-top"
                      style={{
                        height: "200px",
                        objectFit: "cover",
                      }}
                    />
                  </Card.Link>
                  <Card.Body>
                    <Card.Title>{turf.turfname}</Card.Title>
                    <Card.Text>
                      <strong>Address:</strong> {turf.address}
                      <br />
                      <strong>Price:</strong> ₹{turf.price}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>

      <Footer />
    </>
  );
};

export default SearchResults;
