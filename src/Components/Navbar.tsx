import { Link, useNavigate } from "react-router-dom";
import { getUser } from "../utils/auth";

export default function Navbar(){
  const user = getUser();
  const nav = useNavigate();

  return (
    <div className="flex justify-between p-4 bg-black text-white">
      <h1 className="text-red-600 font-bold">PATHÉ CINÉMA</h1>

      <div className="flex gap-4">
        <Link to="/">Accueil</Link>

        {user ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <button onClick={()=>{localStorage.removeItem("user");nav("/login")}}>Logout</button>
          </>
        ):(
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
            <Link to="/about">About</Link>
            <Link
  to="/films"
  className="hover:text-yellow-400"
>
  Films
</Link>

<Link
  to="/cinema"
  className="hover:text-yellow-400"
>
  Cinéma
</Link>
          </>
        )}
          </div>
    </div>
  );
}