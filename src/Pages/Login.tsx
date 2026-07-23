import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../utils/auth";
import { getErrorMessage } from "../Data/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔥 affiche page oublié
  const [forgotMode, setForgotMode] = useState(false);
  const [forgotStep, setForgotStep] = useState<"request" | "reset">("request");
  const [resetToken, setResetToken] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const nav = useNavigate();

  // ✅ LOGIN
  const handleLogin = async () => {
    if (!email || !password) {
      alert("Remplissez tous les champs");
      return;
    }

    setLoading(true);
    try {
      await authService.login(email, password);
      alert("Connexion réussie ✅");
      nav("/");
    } catch (err) {
      alert("❌ " + getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  // 🔥 DEMANDE DE RESET
  const handleForgotRequest = async () => {
    if (!email) {
      alert("Entrez votre email");
      return;
    }
    setLoading(true);
    try {
      const res = await authService.forgotPassword(email);
      // En démo (sans service d'email configuré), le jeton est renvoyé directement.
      if (res.resetToken) setResetToken(res.resetToken);
      alert(res.message);
      setForgotStep("reset");
    } catch (err) {
      alert("❌ " + getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  // 🔥 RESET PASSWORD
  const handleReset = async () => {
    if (!newPassword || !resetToken) {
      alert("Entrez le jeton reçu et un nouveau mot de passe");
      return;
    }
    setLoading(true);
    try {
      await authService.resetPassword(email, resetToken, newPassword);
      alert("Mot de passe réinitialisé ✅");
      setForgotMode(false);
      setForgotStep("request");
    } catch (err) {
      alert("❌ " + getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-black min-h-screen flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-8 border-4 border-yellow-400">
        {/* 🔥 LOGIN PAGE */}
        {!forgotMode ? (
          <>
            <h1 className="text-5xl font-bold text-black mb-8">Connexion</h1>

            <label className="text-black font-semibold">Adresse Email</label>
            <input
              type="email"
              placeholder="votre@email.com"
              value={email}
              className="w-full border-2 border-yellow-400 rounded-xl p-3 mt-2 mb-5 text-black outline-none"
              onChange={(e) => setEmail(e.target.value)}
            />

            <label className="text-black font-semibold">Mot de passe</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              className="w-full border-2 border-yellow-400 rounded-xl p-3 mt-2 mb-6 text-black outline-none"
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              onClick={handleLogin}
              disabled={loading}
              className="bg-yellow-400 hover:bg-yellow-500 transition w-full py-3 rounded-xl font-bold text-black disabled:opacity-60"
            >
              {loading ? "Connexion..." : "Entrer"}
            </button>

            <button
              onClick={() => setForgotMode(true)}
              className="bg-black text-yellow-400 border-2 border-yellow-400 hover:bg-yellow-400 hover:text-black transition w-full py-2 rounded-xl font-bold mt-4 text-sm"
            >
              Mot de passe oublié ?
            </button>

            <p className="text-center text-sm text-gray-500 mt-6">
              Pas de compte ?{" "}
              <a href="/register" className="text-yellow-600 font-bold">
                Inscrivez-vous
              </a>
            </p>
          </>
        ) : (
          <>
            {/* 🔥 PAGE RESET PASSWORD */}
            <h1 className="text-4xl font-bold text-black mb-3">Mot de passe oublié</h1>

            {forgotStep === "request" ? (
              <>
                <p className="text-gray-500 mb-6">
                  Entrez votre email pour recevoir un jeton de réinitialisation
                </p>

                <label className="text-black font-semibold">Adresse Email</label>
                <input
                  type="email"
                  placeholder="exemple@gmail.com"
                  value={email}
                  className="w-full border-2 border-yellow-400 rounded-xl p-3 mt-2 mb-6 text-black outline-none"
                  onChange={(e) => setEmail(e.target.value)}
                />

                <button
                  onClick={handleForgotRequest}
                  disabled={loading}
                  className="bg-yellow-400 hover:bg-yellow-500 transition w-full py-3 rounded-xl font-bold text-black disabled:opacity-60"
                >
                  Envoyer le jeton
                </button>
              </>
            ) : (
              <>
                <p className="text-gray-500 mb-4 text-sm break-all">
                  Jeton (démo, en prod il serait envoyé par email) :{" "}
                  <span className="text-black font-mono">{resetToken || "voir votre email"}</span>
                </p>

                <label className="text-black font-semibold">Jeton de réinitialisation</label>
                <input
                  type="text"
                  placeholder="Collez le jeton reçu"
                  value={resetToken}
                  className="w-full border-2 border-yellow-400 rounded-xl p-3 mt-2 mb-5 text-black outline-none"
                  onChange={(e) => setResetToken(e.target.value)}
                />

                <label className="text-black font-semibold">Nouveau mot de passe</label>
                <input
                  type="password"
                  placeholder="Nouveau mot de passe"
                  className="w-full border-2 border-yellow-400 rounded-xl p-3 mt-2 mb-6 text-black outline-none"
                  onChange={(e) => setNewPassword(e.target.value)}
                />

                <button
                  onClick={handleReset}
                  disabled={loading}
                  className="bg-yellow-400 hover:bg-yellow-500 transition w-full py-3 rounded-xl font-bold text-black disabled:opacity-60"
                >
                  Réinitialiser
                </button>
              </>
            )}

            <button
              onClick={() => {
                setForgotMode(false);
                setForgotStep("request");
              }}
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
