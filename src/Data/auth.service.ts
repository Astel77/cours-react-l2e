import api from "./api";
import type { User } from "./types";

export interface AuthResponse {
  user: User;
  accessToken: string;
}

export const authService = {
  async register(fullName: string, email: string, password: string): Promise<AuthResponse> {
    const { data } = await api.post<AuthResponse>("/auth/register", {
      fullName,
      email,
      password,
    });
    persistSession(data);
    return data;
  },

  async login(email: string, password: string): Promise<AuthResponse> {
    const { data } = await api.post<AuthResponse>("/auth/login", { email, password });
    persistSession(data);
    return data;
  },

  async forgotPassword(email: string): Promise<{ message: string; resetToken?: string }> {
    const { data } = await api.post("/auth/forgot-password", { email });
    return data;
  },

  async resetPassword(email: string, resetToken: string, newPassword: string) {
    const { data } = await api.post("/auth/reset-password", {
      email,
      resetToken,
      newPassword,
    });
    return data;
  },

  async fetchMe(): Promise<User> {
    const { data } = await api.get<User>("/auth/me");
    localStorage.setItem("user", JSON.stringify(data));
    return data;
  },

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },

  getToken(): string | null {
    return localStorage.getItem("token");
  },

  /** Utilisateur mis en cache localement (mis à jour à chaque login/register/fetchMe) */
  getCachedUser(): User | null {
    const raw = localStorage.getItem("user");
    return raw ? JSON.parse(raw) : null;
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem("token");
  },

  isAdmin(): boolean {
    return this.getCachedUser()?.role === "admin";
  },
};

function persistSession(data: AuthResponse) {
  localStorage.setItem("token", data.accessToken);
  localStorage.setItem("user", JSON.stringify(data.user));
}
