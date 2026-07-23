import { useEffect, useState } from "react";
import { cinemasService } from "../../Data/cinemas.service";
import { getErrorMessage } from "../../Data/api";
import type { Cinema } from "../../Data/types";

const emptyForm = { name: "", address: "", rooms: 1 };

export default function AdminCinemas() {
  const [cinemas, setCinemas] = useState<Cinema[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const load = () => {
    setLoading(true);
    cinemasService
      .getAll()
      .then(setCinemas)
      .catch((err) => alert("❌ " + getErrorMessage(err)))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const openCreate = () => {
    setEditingId(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  const openEdit = (cinema: Cinema) => {
    setEditingId(cinema.id);
    setForm({ name: cinema.name, address: cinema.address, rooms: cinema.rooms });
    setShowForm(true);
  };

  const submit = async () => {
    if (!form.name || !form.address) {
      alert("Nom et adresse sont requis");
      return;
    }
    setSaving(true);
    try {
      if (editingId) {
        await cinemasService.update(editingId, form);
      } else {
        await cinemasService.create(form);
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
    if (!confirm("Supprimer ce cinéma ?")) return;
    try {
      await cinemasService.remove(id);
      load();
    } catch (err) {
      alert("❌ " + getErrorMessage(err));
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-yellow-400">🏢 Cinémas</h1>
        <button
          onClick={openCreate}
          className="bg-yellow-500 text-black font-bold px-4 py-2 rounded hover:bg-yellow-400"
        >
          + Nouveau cinéma
        </button>
      </div>

      {loading ? (
        <p className="text-gray-400">Chargement...</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-4">
          {cinemas.map((cinema) => (
            <div key={cinema.id} className="bg-gray-900 border border-yellow-400 rounded-lg p-4">
              <p className="font-bold text-yellow-400">{cinema.name}</p>
              <p className="text-gray-300 text-sm">📍 {cinema.address}</p>
              <p className="text-gray-400 text-sm">🎬 {cinema.rooms} salles</p>
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => openEdit(cinema)}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-sm py-1 rounded"
                >
                  Modifier
                </button>
                <button
                  onClick={() => remove(cinema.id)}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-sm py-1 rounded"
                >
                  Supprimer
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-900 border border-yellow-400 rounded-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-yellow-400 mb-4">
              {editingId ? "Modifier le cinéma" : "Nouveau cinéma"}
            </h2>

            <div className="space-y-3">
              <input
                placeholder="Nom"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full p-2 rounded text-black"
              />
              <input
                placeholder="Adresse / Ville"
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                className="w-full p-2 rounded text-black"
              />
              <input
                type="number"
                placeholder="Nombre de salles"
                value={form.rooms}
                onChange={(e) => setForm({ ...form, rooms: Number(e.target.value) })}
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
