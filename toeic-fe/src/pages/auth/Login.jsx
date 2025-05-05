import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SocialLogin from "../../components/student/SocialLogin";
import InputField from "../../components/student/InputField";
import Button from "../../components/student/Button";
import { loginUser } from "../../api/userApi";
import { Link } from "react-router-dom"; // Fixed the link tag for react-router

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle login action
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // Reset error message

    try {
      const response = await loginUser(formData);
      const { token, user } = response.data.login; // Assuming API returns user info

      console.log("Login success:", user);
      alert("Đăng nhập thành công!");

      // Store token and user info in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // Update app state
      onLogin(user);

      // Navigate based on role
      navigate(user.role === "admin" ? "/admin/dashboard" : "/user/home");
    } catch (err) {
      console.error("Login error:", err);
      setError("Sai email hoặc mật khẩu!"); // Customize based on actual error
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container sign-in">
      <form onSubmit={handleLogin}>
        <h1>Sign In</h1>
        <SocialLogin />
        <span>or use your email password</span>

        {/* Input fields */}
        <InputField
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <InputField
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />

        {/* Forgot Password Link */}
        <Link
          to="/forgot-password"
          className="text-sm text-blue-500 hover:underline"
        >
          Forget Your Password?
        </Link>

        {/* Error message */}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {/* Submit Button */}
        <Button
          text={loading ? "Signing in..." : "Sign In"}
          className="btn-primary"
          disabled={loading} // Disable button while loading
        />
      </form>
    </div>
  );
};

export default Login;
