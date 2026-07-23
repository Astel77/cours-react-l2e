export type Role = "admin" | "user";

export interface User {
  id: string;
  fullName: string;
  email: string;
  role: Role;
  isActive: boolean;
  createdAt: string;
}

export interface Cinema {
  id: string;
  name: string;
  address: string;
  rooms: number;
}

export interface Session {
  id: string;
  day: string;
  time: string;
  room: string;
  price: number;
  totalSeats: number;
  movieId: string;
  movie?: Movie;
  cinemaId?: string;
  cinema?: Cinema;
}

export interface Movie {
  id: string;
  title: string;
  genre: string;
  description?: string;
  image: string;
  durationMinutes?: number;
  isNew: boolean;
  sessions?: Session[];
}

export interface Reservation {
  id: string;
  userId: string;
  user?: User;
  sessionId: string;
  session?: Session;
  seats: number[];
  total: number;
  status: "confirmed" | "cancelled";
  ticketId?: string;
  createdAt: string;
}

export interface DashboardStats {
  totalUsers: number;
  totalCustomers: number;
  totalMovies: number;
  totalCinemas: number;
  totalSessions: number;
  totalReservations: number;
  totalRevenue: number;
  topMovies: { movieId: string; title: string; reservationsCount: string; revenue: string }[];
}
