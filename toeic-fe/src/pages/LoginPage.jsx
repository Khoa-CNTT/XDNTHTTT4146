import React, { useState, useEffect } from "react";
import Login from "./auth/Login";
import Register from "./auth/Register";
import { useLocation } from "react-router-dom";
import "../styles/global.css";

const LoginPage = () => {
  const location = useLocation();
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (location.pathname === "/register") {
<<<<<<< HEAD
      setIsActive(true);
    } else {
      setIsActive(false);
=======
      setIsActive(true); // Khi ở trang đăng ký, đặt isActive là true
    } else {
      setIsActive(false); // Khi ở trang đăng nhập, đặt isActive là false
>>>>>>> 3fd30cc8a5683af940d62d4b1b41ce5ccd11fc34
    }
  }, [location]);

  return (
    <div className={`container ${isActive ? "active" : ""}`} id="container">
      <Register setIsActive={setIsActive} />
      <Login setIsActive={setIsActive} />
      <div className="toggle-container">
        <div className="toggle">
          <div className="toggle-panel toggle-left">
            <h1>Welcome Back!</h1>
            <p>Enter your personal details to use all of site features</p>
            <button onClick={() => setIsActive(false)}>Sign In</button>
          </div>
          <div className="toggle-panel toggle-right">
            <h1>Hello, Friend!</h1>
            <p>
              Register with your personal details to use all of site features
            </p>
            <button onClick={() => setIsActive(true)}>Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
