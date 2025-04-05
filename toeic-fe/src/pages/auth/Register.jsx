import React, { useState } from "react";
import SocialLogin from "../../components/student/SocialLogin";
import InputField from "../../components/student/InputField";
import Button from "../../components/student/Button";
import { registerUser } from "../../api/userApi";

const Register = ({ setIsActive }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Xử lý thay đổi input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Gọi API đăng ký khi nhấn Sign Up
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await registerUser(formData);

      if (response?.data?.register?.status) {
        console.log("Đăng ký thành công:", response.data.register.msg);
        alert("Đăng ký thành công!");

        // Kiểm tra xem setIsActive có tồn tại không trước khi gọi
        if (setIsActive) {
          setIsActive(false);
        }
      } else {
        setError(response?.data?.register?.msg || "Đăng ký thất bại!");
      }
    } catch (err) {
      console.error("Lỗi đăng ký:", err);

      // Hiển thị lỗi cụ thể từ API nếu có
      const errorMessage =
        err.response?.data?.message || "Có lỗi xảy ra, vui lòng thử lại!";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container sign-up">
      <form onSubmit={handleRegister}>
        <h1>Create Account</h1>
        <SocialLogin />
        <span>or use your email for registration</span>
        <InputField
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
        />
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
        {error && <p style={{ color: "red" }}>{error}</p>}
        <Button
          text={loading ? "Registering..." : "Sign Up"}
          className="btn-primary"
          type="submit"
          disabled={loading} // Vô hiệu hóa button khi đang loading
        />
      </form>
    </div>
  );
};

export default Register;
