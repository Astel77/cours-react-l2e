import { useEffect, useState } from "react";
import { moviesService } from "../../Data/movies.service";
import { getErrorMessage } from "../../Data/api";
import type { Movie } from "../../Data/types";

const emptyForm = {
  title: "",
  genre: "",
  description: "",
  image: "",
  durationMinutes: 0,
  isNew: false,
};

export default function AdminMovies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const load = () => {
    setLoading(true);
    moviesService
      .getAll()
      .then(setMovies)
      .catch((err) => alert("❌ " + getErrorMessage(err)))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const openCreate = () => {
    setEditingId(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  const openEdit = (movie: Movie) => {
    setEditingId(movie.id);
    setForm({
      title: movie.title,
      genre: movie.genre,
      description: movie.description || "",
      image: movie.image,
      durationMinutes: movie.durationMinutes || 0,
      isNew: movie.isNew,
    });
    setShowForm(true);
  };

  const submit = async () => {
    if (!form.title || !form.genre || !form.image) {
      alert("Titre, genre et image sont requis");
      return;
    }
    setSaving(true);
    try {
      if (editingId) {
        await moviesService.update(editingId, form);
      } else {
        await moviesService.create(form);
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
    if (!confirm("Supprimer ce film ainsi que ses séances ?")) return;
    try {
      await moviesService.remove(id);
      load();
    } catch (err) {
      alert("❌ " + getErrorMessage(err));
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-yellow-400">🎬 Films</h1>
        <button
          onClick={openCreate}
          className="bg-yellow-500 text-black font-bold px-4 py-2 rounded hover:bg-yellow-400"
        >
          + Nouveau film
        </button>
      </div>

      {loading ? (
        <p className="text-gray-400">Chargement...</p>
      ) : (
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
          {movies.map((movie) => (
            <div key={movie.id} className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800">
              <img src={movie.image} alt={movie.title} className="w-full h-40 object-cover" />
              <div className="p-3">
                <p className="font-bold text-yellow-400">{movie.title}</p>
                <p className="text-gray-400 text-sm">{movie.genre}</p>
                <p className="text-gray-500 text-xs mt-1">
                  {movie.sessions?.length || 0} séance(s)
                </p>
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => openEdit(movie)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-sm py-1 rounded"
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => remove(movie.id)}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-sm py-1 rounded"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-900 border border-yellow-400 rounded-xl p-6 w-full max-w-lg">
            <h2 className="text-xl font-bold text-yellow-400 mb-4">
              {editingId ? "Modifier le film" : "Nouveau film"}
            </h2>

            <div className="space-y-3">
              <input
                placeholder="Titre"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full p-2 rounded text-black"
              />
              <input
                placeholder="Genre"
                value={form.genre}
                onChange={(e) => setForm({ ...form, genre: e.target.value })}
                className="w-full p-2 rounded text-black"
              />
              <input
                placeholder="URL de l'image"
                value={form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
                className="w-full p-2 rounded text-black"
              />
              <textarea
                placeholder="Description"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full p-2 rounded text-black"
                rows={3}
              />
              <input
                type="number"
                placeholder="Durée (minutes)"
                value={form.durationMinutes}
                onChange={(e) => setForm({ ...form, durationMinutes: Number(e.target.value) })}
                className="w-full p-2 rounded text-black"
              />
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={form.isNew}
                  onChange={(e) => setForm({ ...form, isNew: e.target.checked })}
                />
                Marquer comme "Nouveau"
              </label>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={submit}
                disabled={saving}
                className="flex-1 bg-yellow-500 text-black font-bold py-2 rounded disabled:opacity-60"
              >
                {saving ? "Enregistrement..." : "Enregistrer"}
              </button>
              <button
                onClick={() => setShowForm(false)}
                className="flex-1 bg-gray-700 py-2 rounded"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
