import { Navigate } from "react-router-dom";
import { authService } from "../Data/auth.service";

export default function AdminRoute({ children }: { children: React.ReactNode }) {
  if (!authService.isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  if (!authService.isAdmin()) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
}
