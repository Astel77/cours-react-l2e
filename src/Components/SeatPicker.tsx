import { useEffect, useState } from "react";
import { reservationsService } from "../Data/reservations.service";
import type { Session } from "../Data/types";

type Props = {
  session: Session;
  seats: number[];
  setSeats: (seats: number[]) => void;
};

export default function SeatPicker({ session, seats, setSeats }: Props) {
  const [occupied, setOccupied] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    reservationsService
      .getOccupiedSeats(session.id)
      .then(setOccupied)
      .finally(() => setLoading(false));
  }, [session.id]);

  const toggle = (seat: number) => {
    if (occupied.includes(seat)) return; // ❌ déjà réservé

    setSeats(
      seats.includes(seat) ? seats.filter((s) => s !== seat) : [...seats, seat]
    );
  };

  return (
    <div className="text-white">
      <h2 className="text-yellow-400 mb-2">Places disponibles</h2>

      {loading ? (
        <p className="text-gray-400 text-sm">Chargement du plan de salle...</p>
      ) : (
        <div className="grid grid-cols-8 gap-2">
          {Array.from({ length: session.totalSeats || 50 }, (_, i) => i + 1).map((seat) => {
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
      )}
    </div>
  );
}
