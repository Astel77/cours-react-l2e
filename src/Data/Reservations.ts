export const getReservations = () =>
  JSON.parse(localStorage.getItem("reservations") || "[]");

export const saveReservation = (data: any) => {
  const all = getReservations();

  // 🔥 ajout réservation globale
  all.push(data);

  localStorage.setItem("reservations", JSON.stringify(all));
};

// 💺 places occupées GLOBALS
export const getOccupiedSeats = (movieId: number, sessionId: number) => {
  return getReservations()
    .filter(
      (r: any) =>
        r.movie.id === movieId && r.session.id === sessionId
    )
    .flatMap((r: any) => r.seats);
};