import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setUser } from "../utils/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const nav = useNavigate();

  const handleLogin = () => {
    if (!email) return;

    setUser({ email });

    // 🔥 retour home après login
    nav("/");
  };

  return (
    <div className="bg-black min-h-screen text-white flex items-center justify-center">
      <div className="bg-gray-900 p-6 rounded w-80">
        <h2 className="text-yellow-400 mb-4">Connexion</h2>

        <input
          className="w-full p-2 text-black mb-3"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="bg-red-600 w-full py-2"
        >
          Se connecter
        </button>
      </div>
    </div>
  );
}