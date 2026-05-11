import { useState } from "react";
import { movies } from "../Data/Movies";

export default function SearchBar({ onSelect }: any) {
  const [query, setQuery] = useState("");

  const results = movies.filter((m) =>
    m.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="p-4 text-white">
      <input
        placeholder="Rechercher un film..."
        className="p-2 w-full text-black rounded"
        onChange={(e) => setQuery(e.target.value)}
      />

      {query && (
        <div className="bg-gray-900 mt-2 rounded p-2 max-h-60 overflow-y-auto">
          {results.map((m) => (
            <div
              key={m.id}
              onClick={() => onSelect(m)}
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
