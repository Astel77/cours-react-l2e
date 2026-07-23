import SeatPicker from "./SeatPicker";
import type { Session } from "../Data/types";

type Props = {
  session: Session;
  seats: number[];
  setSeats: (seats: number[]) => void;
};

export default function CinemaHall({ session, seats, setSeats }: Props) {
  return (
    <div className="text-white flex flex-col items-center p-6">
      {/* ÉCRAN CINÉMA */}
      <div className="w-full md:w-[60%] h-10 bg-gradient-to-r from-gray-300 to-gray-500 rounded mb-6 shadow-lg text-center text-black font-bold">
        ÉCRAN
      </div>

      {/* SALLE */}
      <div className="bg-gray-900 p-6 rounded-xl shadow-2xl w-full md:w-[60%]">
        <SeatPicker session={session} seats={seats} setSeats={setSeats} />
      </div>

      {/* LÉGENDE */}
      <div className="flex gap-4 mt-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-700"></div> Libre
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-600"></div> Sélectionné
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-black"></div> Occupé
        </div>
      </div>
    </div>
  );
}
