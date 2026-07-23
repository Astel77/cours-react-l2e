import { useEffect, useState } from "react";
import { reservationsService } from "../../Data/reservations.service";
import { getErrorMessage } from "../../Data/api";
import type { Reservation } from "../../Data/types";

export default function AdminReservations() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    reservationsService
      .getAll()
      .then(setReservations)
      .catch((err) => alert("❌ " + getErrorMessage(err)))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const cancel = async (id: string) => {
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

  const totalRevenue = reservations
    .filter((r) => r.status === "confirmed")
    .reduce((sum, r) => sum + r.total, 0);

  return (
    <div>
      <div className="flex justify-between items-center mb-6 flex-wrap gap-3">
        <h1 className="text-3xl font-bold text-yellow-400">🎟 Réservations</h1>
        <p className="text-green-400 font-bold">
          Revenu (confirmées) : {totalRevenue.toLocaleString()} FCFA
        </p>
      </div>

      {loading ? (
        <p className="text-gray-400">Chargement...</p>
      ) : (
        <div className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800">
          <table className="w-full text-left">
            <thead className="bg-gray-800 text-gray-300 text-sm">
              <tr>
                <th className="p-3">Client</th>
                <th className="p-3">Film</th>
                <th className="p-3">Séance</th>
                <th className="p-3">Sièges</th>
                <th className="p-3">Total</th>
                <th className="p-3">Statut</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((r) => (
                <tr key={r.id} className="border-t border-gray-800">
                  <td className="p-3">
                    {r.user?.fullName}
                    <div className="text-xs text-gray-500">{r.user?.email}</div>
                  </td>
                  <td className="p-3">{r.session?.movie?.title}</td>
                  <td className="p-3">
                    {r.session?.day} · {r.session?.time} · {r.session?.room}
                  </td>
                  <td className="p-3">{r.seats.join(", ")}</td>
                  <td className="p-3 text-green-400">{r.total} FCFA</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded text-xs font-bold ${
                        r.status === "confirmed" ? "bg-green-700" : "bg-red-700"
                      }`}
                    >
                      {r.status === "confirmed" ? "Confirmée" : "Annulée"}
                    </span>
                  </td>
                  <td className="p-3">
                    {r.status === "confirmed" && (
                      <button
                        onClick={() => cancel(r.id)}
                        className="bg-red-600 hover:bg-red-700 text-sm px-3 py-1 rounded"
                      >
                        Annuler
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {reservations.length === 0 && (
                <tr>
                  <td colSpan={7} className="p-3 text-gray-500">
                    Aucune réservation pour le moment
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
