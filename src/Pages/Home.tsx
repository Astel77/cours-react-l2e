import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { movies } from "../Data/Movies";
import MovieCard from "../Components/MovieCard";
import SeatPicker from "../Components/SeatPicker";
import Payment from "../Components/Payment";
import { getUser } from "../utils/auth";

export default function Home() {

  const nav = useNavigate();
  const user = getUser();

  const [step, setStep] = useState<"home" | "sessions" | "seats" | "payment">("home");
  const [movie, setMovie] = useState<any>(null);
  const [session, setSession] = useState<any>(null);
  const [seats, setSeats] = useState<number[]>([]);

  const total = seats.length * (session?.price || 0);

  // 🔥 reset propre à chaque retour home
  useEffect(() => {
    setStep("home");
    setMovie(null);
    setSession(null);
    setSeats([]);
  }, []);

  // 🔐 protection accès film
  const requireAuth = () => {
    if (!user) {
      nav("/login");
      return false;
    }
    return true;
  };

  return (
    <div className="bg-black min-h-screen text-white">

      {/* HOME */}
      {step === "home" && (
        <div className="grid md:grid-cols-4 gap-4 p-4">
          {movies.map((m) => (
            <MovieCard
              key={m.id}
              movie={m}
              onClick={() => {
                if (!requireAuth()) return;
                setMovie(m);
                setStep("sessions");
              }}
            />
          ))}
        </div>
      )}
{/* SESSIONS */}
{step === "sessions" && movie && (

<div className="p-4">

  <button
    onClick={() => setStep("home")}
    className="text-yellow-400 mb-4"
  >
    ← Retour
  </button>

  <h2 className="text-2xl text-yellow-400 mb-5">
    {movie.title}
  </h2>

  {/* SI IL Y A DES SÉANCES */}
  {movie.sessions && movie.sessions.length > 0 ? (

    <div className="flex flex-wrap gap-4">

      {movie.sessions.map((s: any) => (

        <div
          key={s.id}
          className="
            bg-gray-900
            border
            border-yellow-400
            rounded
            p-4
            w-[220px]
          "
        >

          <p className="text-yellow-400 font-bold">
            {s.day}
          </p>

          <p className="text-white">
            🕒 {s.time}
          </p>

          <p className="text-gray-300">
            🎬 {s.room}
          </p>

          <p className="text-green-400 mt-2">
            {s.price} FCFA
          </p>

          <button
            onClick={() => {
              setSession(s);
              setStep("seats");
            }}
            className="
              bg-yellow-500
              text-white
              px-4
              py-2
              rounded
              mt-4
              hover:bg-yellow-400
            "
          >
            Réserver
          </button>

        </div>

      ))}

    </div>

  ) : (

    <div className="text-red-500">
      Aucune séance disponible
    </div>

  )}

</div>

)}

    

    
   
       

      {/* SEATS */}
      {step === "seats" && movie && session && (
        <div className="p-4">
          <SeatPicker
            movie={movie}
            session={session}
            seats={seats}
            setSeats={setSeats}
          />

          <button
            onClick={() => setStep("payment")}
            className="bg-red-600 px-4 py-2 mt-4 rounded"
          >
            Continuer
          </button>
        </div>
      )}

      {/* PAYMENT */}
      {step === "payment" && movie && session && (
        <Payment
          data={{
            movie,
            session,
            seats,
            total,
          }}
        />
      )}

    </div>
  );
}