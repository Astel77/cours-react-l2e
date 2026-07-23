import api from "./api";
import type { Reservation } from "./types";

export const reservationsService = {
  async getOccupiedSeats(sessionId: string): Promise<number[]> {
    const { data } = await api.get<number[]>("/reservations/occupied-seats", {
      params: { sessionId },
    });
    return data;
  },

  async create(sessionId: string, seats: number[]): Promise<Reservation> {
    const { data } = await api.post<Reservation>("/reservations", { sessionId, seats });
    return data;
  },

  async getMine(): Promise<Reservation[]> {
    const { data } = await api.get<Reservation[]>("/reservations/mine");
    return data;
  },

  async getAll(): Promise<Reservation[]> {
    const { data } = await api.get<Reservation[]>("/reservations");
    return data;
  },

  async cancel(id: string): Promise<void> {
    await api.delete(`/reservations/${id}`);
  },
};
