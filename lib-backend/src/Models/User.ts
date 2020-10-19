export type UserRole = "client" | "librarian";

export interface User {
  user_id: number;
  name: string;
  surname: string;
  libraryCardId: string;
  role: UserRole;
  address: string;
  phone: string;
  email: string;
}

export interface AuthUser {
  user_id: number;
  email: string;
  password: string;
  role: UserRole;
}

export interface Client {
  user_id: number;
  name: string;
  surname: string;
  libraryCardId: string;
  address: string;
  phone: string;
  email: string;
}