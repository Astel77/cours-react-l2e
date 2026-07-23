import api from "./api";
import type { Session } from "./types";

export const sessionsService = {
  async getAll(movieId?: string): Promise<Session[]> {
    const { data } = await api.get<Session[]>("/sessions", { params: { movieId } });
    return data;
  },

  async create(payload: Partial<Session>): Promise<Session> {
    const { data } = await api.post<Session>("/sessions", payload);
    return data;
  },

  async update(id: string, payload: Partial<Session>): Promise<Session> {
    const { data } = await api.patch<Session>(`/sessions/${id}`, payload);
    return data;
  },

  async remove(id: string): Promise<void> {
    await api.delete(`/sessions/${id}`);
  },
};
