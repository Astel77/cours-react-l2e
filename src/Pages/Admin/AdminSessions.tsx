import { useEffect, useState } from "react";
import { sessionsService } from "../../Data/sessions.service";
import { moviesService } from "../../Data/movies.service";
import { cinemasService } from "../../Data/cinemas.service";
import { getErrorMessage } from "../../Data/api";
import type { Cinema, Movie, Session } from "../../Data/types";

const emptyForm = {
  day: "",
  time: "",
  room: "",
  price: 5000,
  totalSeats: 50,
  movieId: "",
  cinemaId: "",
};

export default function AdminSessions() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [cinemas, setCinemas] = useState<Cinema[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const load = () => {
    setLoading(true);
    Promise.all([sessionsService.getAll(), moviesService.getAll(), cinemasService.getAll()])
      .then(([s, m, c]) => {
        setSessions(s);
        setMovies(m);
        setCinemas(c);
      })
      .catch((err) => alert("❌ " + getErrorMessage(err)))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const openCreate = () => {
    setEditingId(null);
    setForm({ ...emptyForm, movieId: movies[0]?.id || "", cinemaId: cinemas[0]?.id || "" });
    setShowForm(true);
  };

  const openEdit = (session: Session) => {
    setEditingId(session.id);
    setForm({
      day: session.day,
      time: session.time,
      room: session.room,
      price: session.price,
      totalSeats: session.totalSeats,
      movieId: session.movieId,
      cinemaId: session.cinemaId || "",
    });
    setShowForm(true);
  };

  const submit = async () => {
    if (!form.day || !form.time || !form.room || !form.movieId) {
      alert("Jour, heure, salle et film sont requis");
      return;
    }
    setSaving(true);
    try {
      const payload = { ...form, cinemaId: form.cinemaId || undefined };
      if (editingId) {
        await sessionsService.update(editingId, payload);
      } else {
        await sessionsService.create(payload);
      }
      setShowForm(false);
      load();
    } catch (err) {
      alert("❌ " + getErrorMessage(err));
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id: string) => {
    if (!confirm("Supprimer cette séance ?")) return;
    try {
      await sessionsService.remove(id);
      load();
    } catch (err) {
      alert("❌ " + getErrorMessage(err));
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-yellow-400">🕒 Séances</h1>
        <button
          onClick={openCreate}
          disabled={movies.length === 0}
          className="bg-yellow-500 text-black font-bold px-4 py-2 rounded hover:bg-yellow-400 disabled:opacity-50"
        >
          + Nouvelle séance
        </button>
      </div>

      {movies.length === 0 && !loading && (
        <p className="text-red-400 mb-4">Créez d'abord un film avant d'ajouter une séance.</p>
      )}

      {loading ? (
        <p className="text-gray-400">Chargement...</p>
      ) : (
        <div className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800">
          <table className="w-full text-left">
            <thead className="bg-gray-800 text-gray-300 text-sm">
              <tr>
                <th className="p-3">Film</th>
                <th className="p-3">Jour</th>
                <th className="p-3">Heure</th>
                <th className="p-3">Salle</th>
                <th className="p-3">Cinéma</th>
                <th className="p-3">Prix</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sessions.map((s) => (
                <tr key={s.id} className="border-t border-gray-800">
                  <td className="p-3">{s.movie?.title}</td>
                  <td className="p-3">{s.day}</td>
                  <td className="p-3">{s.time}</td>
                  <td className="p-3">{s.room}</td>
                  <td className="p-3">{s.cinema?.name || "—"}</td>
                  <td className="p-3 text-green-400">{s.price} FCFA</td>
                  <td className="p-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => openEdit(s)}
                        className="bg-blue-600 hover:bg-blue-700 text-sm px-3 py-1 rounded"
                      >
                        Modifier
                      </button>
                      <button
                        onClick={() => remove(s.id)}
                        className="bg-red-600 hover:bg-red-700 text-sm px-3 py-1 rounded"
                      >
                        Supprimer
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {sessions.length === 0 && (
                <tr>
                  <td colSpan={7} className="p-3 text-gray-500">
                    Aucune séance pour le moment
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-900 border border-yellow-400 rounded-xl p-6 w-full max-w-lg">
            <h2 className="text-xl font-bold text-yellow-400 mb-4">
              {editingId ? "Modifier la séance" : "Nouvelle séance"}
            </h2>

            <div className="space-y-3">
              <select
                value={form.movieId}
                onChange={(e) => setForm({ ...form, movieId: e.target.value })}
                className="w-full p-2 rounded text-black"
              >
                {movies.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.title}
                  </option>
                ))}
              </select>

              <select
                value={form.cinemaId}
                onChange={(e) => setForm({ ...form, cinemaId: e.target.value })}
                className="w-full p-2 rounded text-black"
              >
                <option value="">— Aucun cinéma spécifique —</option>
                {cinemas.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} ({c.address})
                  </option>
                ))}
              </select>

              <input
                placeholder="Jour (ex: Vendredi)"
                value={form.day}
                onChange={(e) => setForm({ ...form, day: e.target.value })}
                className="w-full p-2 rounded text-black"
              />
              <input
                placeholder="Heure (ex: 18:00)"
                value={form.time}
                onChange={(e) => setForm({ ...form, time: e.target.value })}
                className="w-full p-2 rounded text-black"
              />
              <input
                placeholder="Salle (ex: Salle 1)"
                value={form.room}
                onChange={(e) => setForm({ ...form, room: e.target.value })}
                className="w-full p-2 rounded text-black"
              />
              <input
                type="number"
                placeholder="Prix (FCFA)"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                className="w-full p-2 rounded text-black"
              />
              <input
                type="number"
                placeholder="Nombre de sièges"
                value={form.totalSeats}
                onChange={(e) => setForm({ ...form, totalSeats: Number(e.target.value) })}
                className="w-full p-2 rounded text-black"
              />
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={submit}
                disabled={saving}
                className="flex-1 bg-yellow-500 text-black font-bold py-2 rounded disabled:opacity-60"
              >
                {saving ? "Enregistrement..." : "Enregistrer"}
              </button>
              <button onClick={() => setShowForm(false)} className="flex-1 bg-gray-700 py-2 rounded">
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
