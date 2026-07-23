import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { moviesService } from "../Data/movies.service";
import type { Movie } from "../Data/types";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const nav = useNavigate();

  useEffect(() => {
    moviesService.getAll().then(setMovies).catch(() => setMovies([]));
  }, []);

  const results = query
    ? movies.filter((m) => m.title.toLowerCase().includes(query.toLowerCase()))
    : [];

  return (
    <div className="p-4 text-white max-w-xl mx-auto">
      <input
        placeholder="Rechercher un film..."
        value={query}
        className="p-2 w-full text-black rounded"
        onChange={(e) => setQuery(e.target.value)}
      />

      {query && (
        <div className="bg-gray-900 mt-2 rounded p-2 max-h-60 overflow-y-auto">
          {results.length === 0 && (
            <p className="text-gray-500 p-2 text-sm">Aucun film trouvé</p>
          )}
          {results.map((m) => (
            <div
              key={m.id}
              onClick={() => {
                setQuery("");
                nav("/films");
              }}
              className="p-2 hover:bg-gray-700 cursor-pointer"
            >
              🎬 {m.title} | {m.genre}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
