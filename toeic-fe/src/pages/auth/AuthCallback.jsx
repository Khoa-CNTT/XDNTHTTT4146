import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
<<<<<<< HEAD
    const handleAuthCallback = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const error = urlParams.get("error");
      const token = urlParams.get("token");

      if (error) {
        toast.error("Google từ chối đăng nhập hoặc có lỗi xảy ra.");
        navigate("/login");
        return;
      }

      if (token) {
        localStorage.setItem("authToken", token);
        toast.success("Đăng nhập thành công!");
        navigate("/home");
      } else {
        toast.error("Đã xảy ra lỗi khi đăng nhập.");
        navigate("/login");
      }
    };

    handleAuthCallback();
  }, [navigate]);

  return (
    <div className="auth-callback text-center mt-10">
      <p className="text-lg font-semibold">⏳ Đang xử lý đăng nhập...</p>
=======
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
>>>>>>> 3fd30cc8a5683af940d62d4b1b41ce5ccd11fc34
    </div>
  );
};

export default AuthCallback;
