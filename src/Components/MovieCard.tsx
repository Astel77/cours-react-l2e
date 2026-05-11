type Props = {
  movie: any;
  onClick: () => void;
};

export default function MovieCard({
  movie,
  onClick,
}: Props) {

  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg relative">

      {/* BADGE NOUVEAU */}
      {movie.isNew && (
        <div
          className="
            absolute
            top-2
            left-2
            bg-red-600
            text-white
            px-2
            py-1
            text-xs
            rounded
            z-10
          "
        >
          Nouveau
        </div>
      )}

      {/* IMAGE */}
      <img
        src={movie.image}
        alt={movie.title}
        className="w-full h-[350px] object-cover"
      />

      {/* CONTENU */}
      <div className="p-4">

        <h2 className="text-yellow-400 text-lg font-bold">
          {movie.title}
        </h2>

        <p className="text-gray-300 mb-4">
          {movie.genre}
        </p>

        {/* SI LE FILM A DES SÉANCES */}
        {movie.sessions && movie.sessions.length > 0 ? (

          <button
            onClick={onClick}
            className="
              bg-yellow-500
              text-white
              px-4
              py-2
              rounded
              hover:bg-yellow-400
              transition
            "
          >
            Voir séances
          </button>

        ) : (

          <div className="text-red-500 font-semibold">
            Pas de séance disponible
          </div>

        )}

      </div>

    </div>
  );
}