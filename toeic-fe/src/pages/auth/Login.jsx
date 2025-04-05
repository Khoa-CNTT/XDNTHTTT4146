import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SocialLogin from "../../components/student/SocialLogin";
import InputField from "../../components/student/InputField";
import Button from "../../components/student/Button";
import { loginUser } from "../../api/userApi";

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Hook điều hướng

  // Xử lý thay đổi input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Gọi API đăng nhập
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await loginUser(formData);
      const { token, user } = response.data.login; // Giả sử API trả về user info

      console.log("Login success:", user);
      alert("Đăng nhập thành công!");

      // Lưu vào localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user)); // Lưu cả user info

      // Cập nhật state của App
      onLogin(user);

      // Điều hướng theo role
      navigate(user.role === "admin" ? "/admin/dashboard" : "/user/home");
    } catch (err) {
      console.error("Login error:", err);
      setError("Sai email hoặc mật khẩu!");
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
        <a href="./ForgotPassword">Forget Your Password?</a>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <Button
          text={loading ? "Signing in..." : "Sign In"}
          className="btn-primary"
          onClick={handleLogin}
        />
      </form>
    </div>
  );
};

export default Login;
