import { Link, useNavigate } from "react-router-dom";
import { getUser, logout, isAdmin } from "../utils/auth";

export default function Navbar() {
  const user = getUser();
  const nav = useNavigate();

  return (
    <div className="flex justify-between items-center p-4 bg-black text-white flex-wrap gap-2">
      <Link to="/" className="text-red-600 font-bold">
        PATHÉ CINÉMA
      </Link>

      <div className="flex gap-4 items-center flex-wrap">
        <Link to="/">Accueil</Link>
        <Link to="/films" className="hover:text-yellow-400">
          Films
        </Link>
        <Link to="/cinema" className="hover:text-yellow-400">
          Cinéma
        </Link>
        <Link to="/about" className="hover:text-yellow-400">
          À propos
        </Link>

        {user ? (
          <>
            <Link to="/dashboard">Dashboard</Link>

            {isAdmin() && (
              <Link
                to="/admin"
                className="bg-yellow-500 text-black px-3 py-1 rounded font-bold hover:bg-yellow-400"
              >
                🛠 Admin
              </Link>
            )}

            <span className="text-gray-400 text-sm hidden md:inline">
              {user.fullName}
            </span>

            <button
              onClick={() => {
                logout();
                nav("/login");
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </div>
  );
}
