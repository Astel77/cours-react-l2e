import api from "./api";
import type { Cinema } from "./types";

export const cinemasService = {
  async getAll(): Promise<Cinema[]> {
    const { data } = await api.get<Cinema[]>("/cinemas");
    return data;
  },

  async create(payload: Partial<Cinema>): Promise<Cinema> {
    const { data } = await api.post<Cinema>("/cinemas", payload);
    return data;
  },

  async update(id: string, payload: Partial<Cinema>): Promise<Cinema> {
    const { data } = await api.patch<Cinema>(`/cinemas/${id}`, payload);
    return data;
  },

  async remove(id: string): Promise<void> {
    await api.delete(`/cinemas/${id}`);
  },
};
