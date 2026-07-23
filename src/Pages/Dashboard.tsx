import { useEffect, useState } from "react";
import { reservationsService } from "../Data/reservations.service";
import { externalService, type WeatherData } from "../Data/external.service";
import type { Reservation } from "../Data/types";
import { getErrorMessage } from "../Data/api";

export default function Dashboard() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [weather, setWeather] = useState<WeatherData | null>(null);

  useEffect(() => {
    reservationsService
      .getMine()
      .then(setReservations)
      .catch((err) => alert("❌ " + getErrorMessage(err)))
      .finally(() => setLoading(false));

    externalService
      .getWeather()
      .then(setWeather)
      .catch(() => setWeather(null));
  }, []);

  const handleCancel = async (id: string) => {
    if (!confirm("Annuler cette réservation ?")) return;
    try {
      await reservationsService.cancel(id);
      setReservations((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status: "cancelled" } : r))
      );
    } catch (err) {
      alert("❌ " + getErrorMessage(err));
    }
  };

  return (
    <div className="p-6 bg-black min-h-screen text-white">
      <div className="flex flex-col md:flex-row justify-between gap-6 mb-8">
        <h2 className="text-3xl font-bold text-yellow-400">🎟 Mes tickets</h2>

        {/* WIDGET MÉTÉO — API externe OpenWeather */}
        <div className="bg-gray-900 border border-yellow-400 rounded-xl p-4 min-w-[220px]">
          {weather?.available ? (
            <>
              <p className="text-yellow-400 font-bold">☀️ Météo — {weather.city}</p>
              <p className="text-2xl">{Math.round(weather.temperature ?? 0)}°C</p>
              <p className="text-gray-300 capitalize">{weather.description}</p>
              <p className="text-gray-500 text-sm">Humidité : {weather.humidity}%</p>
            </>
          ) : (
            <p className="text-gray-400 text-sm">{weather?.message ?? "Météo indisponible"}</p>
          )}
        </div>
      </div>

      {loading && <p className="text-gray-400">Chargement...</p>}

      {!loading && reservations.length === 0 && (
        <p className="text-gray-400">Vous n'avez pas encore de réservation.</p>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        {reservations.map((r) => (
          <div
            key={r.id}
            className={`bg-gray-800 p-4 rounded border ${
              r.status === "cancelled" ? "border-red-600 opacity-60" : "border-yellow-400"
            }`}
          >
            <p className="font-bold text-yellow-400">{r.session?.movie?.title}</p>
            <p className="text-sm text-gray-300">
              📅 {r.session?.day} — 🕒 {r.session?.time} — 🎬 {r.session?.room}
            </p>
            <p className="mt-1">Places : {r.seats.join(", ")}</p>
            <p className="text-green-400 font-bold">{r.total} FCFA</p>
            <p className="text-xs text-gray-500 mt-1">
              Statut :{" "}
              <span className={r.status === "confirmed" ? "text-green-400" : "text-red-500"}>
                {r.status === "confirmed" ? "Confirmée" : "Annulée"}
              </span>
            </p>

            {r.status === "confirmed" && (
              <button
                onClick={() => handleCancel(r.id)}
                className="mt-3 bg-red-600 hover:bg-red-700 transition px-3 py-1 rounded text-sm"
              >
                Annuler
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
