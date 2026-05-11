import { movies } from "../Data/Movies";

export default function Films() {

  // 🔥 films avec séances uniquement
  const moviesWithSessions = movies.filter(
    (movie) => movie.sessions && movie.sessions.length > 0
  );

  return (
    <div className="bg-black min-h-screen text-white p-6">

      <h1 className="text-yellow-400 text-4xl font-bold mb-8">
        Films & Expositions
      </h1>

      <div className="grid md:grid-cols-2 gap-6">

        {moviesWithSessions.map((movie) => (

          <div
            key={movie.id}
            className="
              bg-gray-900
              rounded-lg
              overflow-hidden
              border border-gray-800
            "
          >

            {/* IMAGE */}
            <img
              src={movie.image}
              alt={movie.title}
              className="w-full h-[300px] object-cover"
            />

            {/* INFOS */}
            <div className="p-5">

              <h2 className="text-yellow-400 text-2xl font-bold">
                {movie.title}
              </h2>

              <p className="text-gray-300 mb-5">
                {movie.genre}
              </p>

              {/* SÉANCES */}
              <div className="space-y-4">

                {movie.sessions.map((s: any) => (

                  <div
                    key={s.id}
                    className="
                      bg-black
                      border border-yellow-400
                      rounded
                      p-4
                    "
                  >

                    <p className="text-yellow-400 font-bold">
                      📅 {s.day}
                    </p>

                    <p className="text-white">
                      🕒 {s.time}
                    </p>

                    <p className="text-gray-300">
                      🎬 {s.room}
                    </p>

                    <p className="text-green-400">
                      {s.price} FCFA
                    </p>

                  </div>

                ))}

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}