import { getOccupiedSeats } from "../Data/Reservations";

export default function SeatPicker({ movie, session, seats, setSeats }: any) {

  const occupied = getOccupiedSeats(movie.id, session.id);

  const toggle = (seat: number) => {
    if (occupied.includes(seat)) return; // ❌ déjà réservé

    setSeats(
      seats.includes(seat)
        ? seats.filter((s: number) => s !== seat)
        : [...seats, seat]
    );
  };

  return (
    <div className="text-white">

      <h2 className="text-yellow-400 mb-2">
        Places disponibles
      </h2>

      <div className="grid grid-cols-8 gap-2">
        {Array.from({ length: 50 }, (_, i) => i + 1).map((seat) => {
          const isOccupied = occupied.includes(seat);
          const isSelected = seats.includes(seat);

          return (
            <button
              key={seat}
              onClick={() => toggle(seat)}
              className={`w-8 h-8 text-xs rounded ${
                isOccupied
                  ? "bg-black cursor-not-allowed"
                  : isSelected
                  ? "bg-red-600"
                  : "bg-gray-700"
              }`}
            >
              {seat}
            </button>
          );
        })}
      </div>
    </div>
  );
}