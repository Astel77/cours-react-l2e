import { Navigate } from "react-router-dom";
import { authService } from "../Data/auth.service";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  if (!authService.isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
}
