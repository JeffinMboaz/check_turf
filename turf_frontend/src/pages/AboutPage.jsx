import React from 'react';
import TNavbar from '../components/TNavbar';
import Footer from '../components/Footer';

function AboutPage() {
  return (
    <> 
    <TNavbar/>
    <div className="about-page  " style={{ padding: '2rem', maxWidth: '800px', margin: 'auto' }}>
      <h1>About Us</h1>
      <p>
        Welcome to <strong>EFC Fitness Hub & Academies </strong>, your one-stop destination for premium turf bookings 
        designed to deliver the best experience for players and event organizers alike.
      </p>

      <h2>Why Choose Us?</h2>
      <ul>
        <li>
          <strong>All Turfs Include Washroom Facilities:</strong> We understand the importance of comfort and convenience. 
          That’s why every turf listed on our platform is equipped with clean and accessible washroom facilities 
          for players and visitors.
        </li>
        <li>
          <strong>Commitment to Quality & Cleanliness:</strong> Our team regularly inspects and maintains every turf 
          to keep it in excellent condition for your safety and enjoyment.
        </li>
        <li>
          <strong>Fair Use & Damage Policy:</strong> Any damage caused to the turf, equipment, or premises during the 
          booking period will result in a fine, depending on the extent of the damage. This ensures the quality is 
          preserved for all users.
        </li>
      </ul>

      <h2>Our Mission</h2>
      <p>
        To create a seamless turf booking experience with top-tier amenities and a focus on customer satisfaction, 
        making sports accessible, fun, and worry-free.
      </p>

      <h2>Get in Touch</h2>
      <p>
        Have questions or need support? Feel free to <a href="/contact">contact us</a> – our team is always here to help.
      </p>
    </div>
    <Footer/>
    </>
  );
}

export default AboutPage;
