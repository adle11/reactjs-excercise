export type UserRole = "client" | "librarian"

export interface User {
    userId: number;
    name: string;
    surname: string;
    userRole: UserRole;
    libraryCardId: string;
    address: string;
    phone: string;
    email: string;
}

export interface Client {
    userId: number;
    name: string;
    surname: string;
    libraryCardId: string;
    address: string;
    phone: string;
    email: string;
}