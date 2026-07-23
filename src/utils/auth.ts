// Ce fichier conserve les mêmes noms d'export qu'à l'origine (getUser, logout, ...)
// pour limiter les changements dans les composants existants, mais s'appuie
// maintenant sur le vrai backend NestJS via authService (JWT).
import { authService } from "../Data/auth.service";
import type { User } from "../Data/types";

export const getUser = (): User | null => authService.getCachedUser();

export const isAdmin = (): boolean => authService.isAdmin();

export const isAuthenticated = (): boolean => authService.isAuthenticated();

export const logout = () => authService.logout();

export { authService };
