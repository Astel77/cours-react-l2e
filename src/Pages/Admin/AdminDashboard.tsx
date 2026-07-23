import { useEffect, useState } from "react";
import { adminService } from "../../Data/admin.service";
import type { DashboardStats } from "../../Data/types";
import { getErrorMessage } from "../../Data/api";

const StatCard = ({ label, value }: { label: string; value: string | number }) => (
  <div className="bg-gray-900 border border-yellow-400 rounded-xl p-5">
    <p className="text-gray-400 text-sm">{label}</p>
    <p className="text-3xl font-bold text-yellow-400 mt-1">{value}</p>
  </div>
);

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminService
      .getDashboard()
      .then(setStats)
      .catch((err) => alert("❌ " + getErrorMessage(err)))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-gray-400">Chargement des statistiques...</p>;
  if (!stats) return <p className="text-red-500">Impossible de charger les statistiques.</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold text-yellow-400 mb-6">📊 Tableau de bord</h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="Utilisateurs" value={stats.totalUsers} />
        <StatCard label="Clients" value={stats.totalCustomers} />
        <StatCard label="Films" value={stats.totalMovies} />
        <StatCard label="Cinémas" value={stats.totalCinemas} />
        <StatCard label="Séances" value={stats.totalSessions} />
        <StatCard label="Réservations" value={stats.totalReservations} />
        <StatCard label="Revenu total" value={`${stats.totalRevenue.toLocaleString()} FCFA`} />
      </div>

      <h2 className="text-xl font-bold text-yellow-400 mb-4">🎬 Films les plus réservés</h2>
      <div className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800">
        <table className="w-full text-left">
          <thead className="bg-gray-800 text-gray-300 text-sm">
            <tr>
              <th className="p-3">Film</th>
              <th className="p-3">Réservations</th>
              <th className="p-3">Revenu</th>
            </tr>
          </thead>
          <tbody>
            {stats.topMovies.length === 0 && (
              <tr>
                <td colSpan={3} className="p-3 text-gray-500">
                  Aucune donnée pour le moment
                </td>
              </tr>
            )}
            {stats.topMovies.map((m) => (
              <tr key={m.movieId} className="border-t border-gray-800">
                <td className="p-3">{m.title}</td>
                <td className="p-3">{m.reservationsCount}</td>
                <td className="p-3 text-green-400">{Number(m.revenue).toLocaleString()} FCFA</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
