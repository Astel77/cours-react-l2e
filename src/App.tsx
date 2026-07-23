import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Films from "./Pages/Films";
import Cinema from "./Pages/Cinema";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Dashboard from "./Pages/Dashboard";
import About from "./Pages/About";
import Footer from "./Components/Footer";
import SearchBar from "./Components/SearchBar";
import ProtectedRoute from "./Components/ProtectedRoute";
import AdminRoute from "./Components/AdminRoute";
import AdminLayout from "./Pages/Admin/AdminLayout";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import AdminMovies from "./Pages/Admin/AdminMovies";
import AdminCinemas from "./Pages/Admin/AdminCinemas";
import AdminSessions from "./Pages/Admin/AdminSessions";
import AdminReservations from "./Pages/Admin/AdminReservations";
import AdminUsers from "./Pages/Admin/AdminUsers";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/films" element={<Films />} />
        <Route path="/cinema" element={<Cinema />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* 🛠 Espace administrateur (RBAC côté frontend + backend) */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="movies" element={<AdminMovies />} />
          <Route path="cinemas" element={<AdminCinemas />} />
          <Route path="sessions" element={<AdminSessions />} />
          <Route path="reservations" element={<AdminReservations />} />
          <Route path="users" element={<AdminUsers />} />
        </Route>
      </Routes>

      <SearchBar />
      <Footer />
    </BrowserRouter>
  );
}
