import { useEffect, useState } from "react";
import { moviesService } from "../Data/movies.service";
import type { Movie } from "../Data/types";
import { getErrorMessage } from "../Data/api";

export default function Films() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    moviesService
      .getAll()
      .then(setMovies)
      .catch((err) => alert("❌ " + getErrorMessage(err)))
      .finally(() => setLoading(false));
  }, []);

  // 🔥 films avec séances uniquement
  const moviesWithSessions = movies.filter(
    (movie) => movie.sessions && movie.sessions.length > 0
  );

  return (
    <div className="bg-black min-h-screen text-white p-6">
      <h1 className="text-yellow-400 text-4xl font-bold mb-8">Films & Expositions</h1>

      {loading && <p className="text-gray-400">Chargement des films...</p>}

      {!loading && moviesWithSessions.length === 0 && (
        <p className="text-gray-400">Aucune séance programmée pour le moment.</p>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        {moviesWithSessions.map((movie) => (
          <div key={movie.id} className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800">
            <img src={movie.image} alt={movie.title} className="w-full h-[300px] object-cover" />

            <div className="p-5">
              <h2 className="text-yellow-400 text-2xl font-bold">{movie.title}</h2>
              <p className="text-gray-300 mb-5">{movie.genre}</p>

              <div className="space-y-4">
                {movie.sessions!.map((s) => (
                  <div key={s.id} className="bg-black border border-yellow-400 rounded p-4">
                    <p className="text-yellow-400 font-bold">📅 {s.day}</p>
                    <p className="text-white">🕒 {s.time}</p>
                    <p className="text-gray-300">
                      🎬 {s.room} {s.cinema ? `— ${s.cinema.name} (${s.cinema.address})` : ""}
                    </p>
                    <p className="text-green-400">{s.price} FCFA</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
