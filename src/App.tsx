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

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
      <Route path="/films"element={<Films />} />

<Route path="/cinema" element={<Cinema />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <SearchBar />
      < Footer />
    </BrowserRouter>
  );
}