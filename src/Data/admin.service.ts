import api from "./api";
import type { DashboardStats } from "./types";

export const adminService = {
  async getDashboard(): Promise<DashboardStats> {
    const { data } = await api.get<DashboardStats>("/admin/dashboard");
    return data;
  },
};
