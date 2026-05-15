import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  loginUser,
  resetPassword,
} from "../utils/auth";

export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 🔥 affiche page oublié
  const [forgotMode, setForgotMode] = useState(false);

  const [newPassword, setNewPassword] = useState("");

  const nav = useNavigate();

  // ✅ LOGIN
  const handleLogin = () => {

    const success = loginUser(email, password);

    if (success) {
      alert("Connexion réussie ✅");
      nav("/");
    } else {
      alert("Email ou mot de passe incorrect ❌");
    }
  };

  // 🔥 RESET PASSWORD
  const handleReset = () => {

    if (!newPassword) {
      alert("Entrez un nouveau mot de passe");
      return;
    }

    resetPassword(newPassword);

    alert("Mot de passe réinitialisé ✅");

    setForgotMode(false);
  };

  return (
    <div className="bg-black min-h-screen flex items-center justify-center p-4">

      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-8 border-4 border-yellow-400">

        {/* 🔥 LOGIN PAGE */}
        {!forgotMode ? (
          <>
            <h1 className="text-5xl font-bold text-black mb-8">
              Connexion
            </h1>

            {/* EMAIL */}
            <label className="text-black font-semibold">
              Adresse Email
            </label>

            <input
              type="email"
              placeholder="votre@email.com"
              className="w-full border-2 border-yellow-400 rounded-xl p-3 mt-2 mb-5 text-black outline-none"
              onChange={(e) => setEmail(e.target.value)}
            />

            {/* PASSWORD */}
            <label className="text-black font-semibold">
              Mot de passe
            </label>

            <input
              type="password"
              placeholder="••••••••"
              className="w-full border-2 border-yellow-400 rounded-xl p-3 mt-2 mb-6 text-black outline-none"
              onChange={(e) => setPassword(e.target.value)}
            />

            {/* BUTTON LOGIN */}
            <button
              onClick={handleLogin}
              className="bg-yellow-400 hover:bg-yellow-500 transition w-full py-3 rounded-xl font-bold text-black"
            >
              Entrer
            </button>

            {/* 🔥 PETIT BOUTON OUBLIE */}
            <button
              onClick={() => setForgotMode(true)}
              className="bg-black text-yellow-400 border-2 border-yellow-400 hover:bg-yellow-400 hover:text-black transition w-full py-2 rounded-xl font-bold mt-4 text-sm"
            >
              Mot de passe oublié ?
            </button>
          </>
        ) : (
          <>
            {/* 🔥 PAGE RESET PASSWORD */}
            <h1 className="text-4xl font-bold text-black mb-3">
              Mot de passe oublié
            </h1>

            <p className="text-gray-500 mb-6">
              Entrez votre email pour réinitialiser votre mot de passe
            </p>

            {/* EMAIL */}
            <label className="text-black font-semibold">
              Adresse Email
            </label>

            <input
              type="email"
              placeholder="exemple@gmail.com"
              className="w-full border-2 border-yellow-400 rounded-xl p-3 mt-2 mb-5 text-black outline-none"
              onChange={(e) => setEmail(e.target.value)}
            />

            {/* NOUVEAU PASSWORD */}
            <label className="text-black font-semibold">
              Nouveau mot de passe
            </label>

            <input
              type="password"
              placeholder="Nouveau mot de passe"
              className="w-full border-2 border-yellow-400 rounded-xl p-3 mt-2 mb-6 text-black outline-none"
              onChange={(e) => setNewPassword(e.target.value)}
            />

            {/* BUTTON RESET */}
            <button
              onClick={handleReset}
              className="bg-yellow-400 hover:bg-yellow-500 transition w-full py-3 rounded-xl font-bold text-black"
            >
              Réinitialiser
            </button>

            {/* RETOUR */}
            <button
              onClick={() => setForgotMode(false)}
              className="w-full mt-4 text-yellow-500 font-bold hover:underline"
            >
              Retour connexion
            </button>
          </>
        )}

      </div>
    </div>
  );
}