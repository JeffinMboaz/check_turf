import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider} from "./contexts/ThemeContext"

import HomePage from "./pages/HomePage";
import UserDashboard from "./pages/UserDashboard";
import ManagerDashboard from "./pages/ManagerDashboard"; // spelling corrected
import AdminDashboard from "./pages/AdminDashboard";
import BookTurf from "./pages/BookTurf";
import MyBookings from "./pages/MyBookings";
import ReviewRating from "./pages/ReviewRating";
import ProfilePage from "./pages/ProfilePage";
import TurfDetail from "./pages/TurfDetail";
import ManageTurf from "./components/AdminDB/ManageTurf";
import ManageReviews from "./components/AdminDB/ManageReviews";
import ManageUsers from "./components/AdminDB/ManageUsers";
import ManageManagers from "./components/AdminDB/ManageManagers";
import ManageBookings from "./components/AdminDB/ManageBookings";
import ManagerBookingForm from "./pages/ManagerBookingForm";
import AboutPage from "./pages/AboutPage";
import SearchResults from "./pages/SearchResults";
function App() {
  return (
    
 <div>
  <ThemeProvider>
  
    <BrowserRouter>
     
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/userdashboard" element={<UserDashboard />} />
          <Route path="/managerdashboard" element={<ManagerDashboard />} />
          <Route path="/admindashboard" element={<AdminDashboard />} />
          <Route path="/bookturf/:id" element={<BookTurf />} />
          <Route path="/mybooking" element={<MyBookings />} />
          <Route path="/reviewrate" element={<ReviewRating />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/turfdetail/:id" element={<TurfDetail />} />
          <Route path="/manageturf" element={<ManageTurf />} />
          <Route path="/managereviews" element={<ManageReviews />} />
          <Route path="/manageusers" element={<ManageUsers />} />
          <Route path="/managemangers" element={<ManageManagers />} />
          <Route path="/managebookings" element={<ManageBookings />} />
          <Route path="/managerbookingfrom" element={<ManagerBookingForm />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/search" element={<SearchResults />} />




        </Routes>
       
    </BrowserRouter>
    <ToastContainer position="top-right" autoClose={3000} />
    </ThemeProvider>
     </div>
  );
}

export default App;
