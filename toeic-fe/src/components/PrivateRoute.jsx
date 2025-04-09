import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const PrivateRoute = ({ element, requiredRole }) => {
  const { user, isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="text-center py-10 text-gray-500">Đang xác thực...</div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    return (
      <div className="text-center py-10 text-red-500 font-semibold">
        🚫 Bạn không có quyền truy cập trang này.
      </div>
    );
  }

  return element;
};

export default PrivateRoute;
