import { useEffect, useState } from "react";
import { cinemasService } from "../Data/cinemas.service";
import type { Cinema } from "../Data/types";
import { getErrorMessage } from "../Data/api";

export default function CinemaPage() {
  const [cinemas, setCinemas] = useState<Cinema[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cinemasService
      .getAll()
      .then(setCinemas)
      .catch((err) => alert("❌ " + getErrorMessage(err)))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="bg-black min-h-screen text-white p-6">
      <h1 className="text-yellow-400 text-4xl font-bold mb-8">Nos Cinémas</h1>

      {loading && <p className="text-gray-400">Chargement...</p>}

      <div className="grid md:grid-cols-3 gap-6">
        {cinemas.map((cinema) => (
          <div key={cinema.id} className="bg-gray-900 border border-yellow-400 rounded-lg p-6">
            <h2 className="text-yellow-400 text-2xl font-bold mb-3">{cinema.name}</h2>
            <p className="text-gray-300 mb-2">📍 {cinema.address}</p>
            <p className="text-white">🎬 {cinema.rooms} salles disponibles</p>
          </div>
        ))}
      </div>
    </div>
  );
}
