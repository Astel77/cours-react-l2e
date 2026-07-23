import api from "./api";
import type { Role, User } from "./types";

export const usersService = {
  async getAll(): Promise<User[]> {
    const { data } = await api.get<User[]>("/users");
    return data;
  },

  async updateRole(id: string, role: Role): Promise<User> {
    const { data } = await api.patch<User>(`/users/${id}/role`, { role });
    return data;
  },

  async updateStatus(id: string, isActive: boolean): Promise<User> {
    const { data } = await api.patch<User>(`/users/${id}/status`, { isActive });
    return data;
  },

  async remove(id: string): Promise<void> {
    await api.delete(`/users/${id}`);
  },
};
