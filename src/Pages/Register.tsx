import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../utils/auth";

export default function Register() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const nav = useNavigate();

  const handleRegister = () => {

    if (!email || !password) {
      alert("Remplissez tous les champs");
      return;
    }

    registerUser({
      email,
      password,
    });

    alert("Compte créé ✅");

    nav("/login");
  };

  return (
    <div className="bg-black min-h-screen flex items-center justify-center">

      <div className="bg-white p-8 rounded-3xl w-[380px] border-4 border-yellow-400">

        <h1 className="text-4xl font-bold mb-6 text-black">
          Inscription
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full border-2 border-yellow-400 p-3 rounded-xl mb-4 text-black"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Mot de passe"
          className="w-full border-2 border-yellow-400 p-3 rounded-xl mb-6 text-black"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleRegister}
          className="bg-yellow-400 w-full py-3 rounded-xl font-bold text-black"
        >
          Créer un compte
        </button>

      </div>
    </div>
  );
}