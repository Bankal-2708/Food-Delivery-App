import { Navigate } from "react-router-dom";

export default function AdminRoute({ children }) {
  const token = localStorage.getItem("token");

  // ✅ Only check token — no isAdmin flag needed
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}