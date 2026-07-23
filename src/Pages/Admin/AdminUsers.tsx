import { useEffect, useState } from "react";
import { usersService } from "../../Data/users.service";
import { getErrorMessage } from "../../Data/api";
import type { User } from "../../Data/types";
import { authService } from "../../utils/auth";

export default function AdminUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const currentUser = authService.getCachedUser();

  const load = () => {
    setLoading(true);
    usersService
      .getAll()
      .then(setUsers)
      .catch((err) => alert("❌ " + getErrorMessage(err)))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const toggleRole = async (u: User) => {
    const newRole = u.role === "admin" ? "user" : "admin";
    if (!confirm(`Passer ${u.fullName} en rôle "${newRole}" ?`)) return;
    try {
      const updated = await usersService.updateRole(u.id, newRole);
      setUsers((prev) => prev.map((x) => (x.id === u.id ? updated : x)));
    } catch (err) {
      alert("❌ " + getErrorMessage(err));
    }
  };

  const toggleStatus = async (u: User) => {
    try {
      const updated = await usersService.updateStatus(u.id, !u.isActive);
      setUsers((prev) => prev.map((x) => (x.id === u.id ? updated : x)));
    } catch (err) {
      alert("❌ " + getErrorMessage(err));
    }
  };

  const remove = async (u: User) => {
    if (!confirm(`Supprimer définitivement le compte de ${u.fullName} ?`)) return;
    try {
      await usersService.remove(u.id);
      setUsers((prev) => prev.filter((x) => x.id !== u.id));
    } catch (err) {
      alert("❌ " + getErrorMessage(err));
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-yellow-400 mb-6">👥 Utilisateurs</h1>

      {loading ? (
        <p className="text-gray-400">Chargement...</p>
      ) : (
        <div className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800">
          <table className="w-full text-left">
            <thead className="bg-gray-800 text-gray-300 text-sm">
              <tr>
                <th className="p-3">Nom</th>
                <th className="p-3">Email</th>
                <th className="p-3">Rôle</th>
                <th className="p-3">Statut</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-t border-gray-800">
                  <td className="p-3">{u.fullName}</td>
                  <td className="p-3">{u.email}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded text-xs font-bold ${
                        u.role === "admin" ? "bg-yellow-500 text-black" : "bg-gray-700"
                      }`}
                    >
                      {u.role}
                    </span>
                  </td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded text-xs font-bold ${
                        u.isActive ? "bg-green-700" : "bg-red-700"
                      }`}
                    >
                      {u.isActive ? "Actif" : "Désactivé"}
                    </span>
                  </td>
                  <td className="p-3">
                    <div className="flex gap-2 flex-wrap">
                      <button
                        onClick={() => toggleRole(u)}
                        disabled={u.id === currentUser?.id}
                        className="bg-blue-600 hover:bg-blue-700 text-sm px-3 py-1 rounded disabled:opacity-40"
                      >
                        {u.role === "admin" ? "Rétrograder" : "Promouvoir admin"}
                      </button>
                      <button
                        onClick={() => toggleStatus(u)}
                        disabled={u.id === currentUser?.id}
                        className="bg-yellow-600 hover:bg-yellow-700 text-sm px-3 py-1 rounded disabled:opacity-40"
                      >
                        {u.isActive ? "Désactiver" : "Activer"}
                      </button>
                      <button
                        onClick={() => remove(u)}
                        disabled={u.id === currentUser?.id}
                        className="bg-red-600 hover:bg-red-700 text-sm px-3 py-1 rounded disabled:opacity-40"
                      >
                        Supprimer
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
