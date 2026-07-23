import api from "./api";
import type { Movie } from "./types";

export const moviesService = {
  async getAll(): Promise<Movie[]> {
    const { data } = await api.get<Movie[]>("/movies");
    return data;
  },

  async getOne(id: string): Promise<Movie> {
    const { data } = await api.get<Movie>(`/movies/${id}`);
    return data;
  },

  async create(payload: Partial<Movie>): Promise<Movie> {
    const { data } = await api.post<Movie>("/movies", payload);
    return data;
  },

  async update(id: string, payload: Partial<Movie>): Promise<Movie> {
    const { data } = await api.patch<Movie>(`/movies/${id}`, payload);
    return data;
  },

  async remove(id: string): Promise<void> {
    await api.delete(`/movies/${id}`);
  },
};
