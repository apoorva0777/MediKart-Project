import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";
import { AuthContext } from "../../context/AuthContext";
import medImage from "/images/med.jpg";


const HomePage = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleShopNow = () => {
    if (user) {
      navigate("/products");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="home-page">
      <div className="home-content">
        <h1>Welcome to MediKart</h1>
        <p>
          Healthcare Made Simple & Safe.<br></br>
          Your trusted partner for medicines, prescriptions, and healthcare
          needs.
        </p>
        <button className="btn-shop-now" onClick={handleShopNow}>
          Shop Now
        </button>
      </div>
      <div className="home-image">
        <img src={medImage} alt="medikart" />
      </div>
    </div>
  );
};

export default HomePage;
