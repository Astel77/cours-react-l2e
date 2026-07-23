import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../utils/auth";
import { getErrorMessage } from "../Data/api";

export default function Register() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const nav = useNavigate();

  const handleRegister = async () => {
    if (!fullName || !email || !password) {
      alert("Remplissez tous les champs");
      return;
    }

    setLoading(true);
    try {
      await authService.register(fullName, email, password);
      alert("Compte créé ✅");
      nav("/");
    } catch (err) {
      alert("❌ " + getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-black min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-3xl w-[380px] border-4 border-yellow-400">
        <h1 className="text-4xl font-bold mb-6 text-black">Inscription</h1>

        <input
          type="text"
          placeholder="Nom complet"
          className="w-full border-2 border-yellow-400 p-3 rounded-xl mb-4 text-black"
          onChange={(e) => setFullName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full border-2 border-yellow-400 p-3 rounded-xl mb-4 text-black"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Mot de passe (6 caractères min.)"
          className="w-full border-2 border-yellow-400 p-3 rounded-xl mb-6 text-black"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleRegister}
          disabled={loading}
          className="bg-yellow-400 w-full py-3 rounded-xl font-bold text-black disabled:opacity-60"
        >
          {loading ? "Création..." : "Créer un compte"}
        </button>

        <p className="text-center text-sm text-gray-500 mt-6">
          Déjà un compte ?{" "}
          <a href="/login" className="text-yellow-600 font-bold">
            Connectez-vous
          </a>
        </p>
      </div>
    </div>
  );
}
