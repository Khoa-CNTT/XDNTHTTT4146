import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (token) {
      localStorage.setItem("authToken", token);
      toast.success("Đăng nhập thành công!");
      navigate("/home");
    } else {
      toast.error("Đã xảy ra lỗi khi đăng nhập.");
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="auth-callback">
      <p>Đang xử lý đăng nhập...</p>
    </div>
  );
};

export default AuthCallback;
