import { NavLink, Outlet } from "react-router-dom";

const links = [
  { to: "/admin", label: "📊 Tableau de bord", end: true },
  { to: "/admin/movies", label: "🎬 Films" },
  { to: "/admin/cinemas", label: "🏢 Cinémas" },
  { to: "/admin/sessions", label: "🕒 Séances" },
  { to: "/admin/reservations", label: "🎟 Réservations" },
  { to: "/admin/users", label: "👥 Utilisateurs" },
];

export default function AdminLayout() {
  return (
    <div className="bg-black min-h-screen text-white flex flex-col md:flex-row">
      <aside className="md:w-64 bg-gray-950 border-b md:border-b-0 md:border-r border-gray-800 p-4">
        <h2 className="text-yellow-400 font-bold text-xl mb-6">🛠 Espace Admin</h2>
        <nav className="flex md:flex-col gap-2 flex-wrap">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                `px-3 py-2 rounded text-sm font-semibold transition ${
                  isActive
                    ? "bg-yellow-500 text-black"
                    : "text-gray-300 hover:bg-gray-800"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <main className="flex-1 p-6 overflow-x-auto">
        <Outlet />
      </main>
    </div>
  );
}
