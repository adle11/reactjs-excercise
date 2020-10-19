import Knex, { Client } from "knex";
import { AuthUser, User } from "../Models/User";

export default (conn: Knex) => ({
  getAllUsers: (): Promise<User[]> => conn
    .select("userId", "name", "surname", "libraryCardId", "role", "address", "phone", "email")
    .from("users").then(rows => {
      if (!rows) return [];

      return rows;
    }),
  getAllClients: (): Promise<Client[]> => conn
    .select("userId", "name", "surname", "libraryCardId", "address", "phone", "email")
    .from("users")
    .where("users.role", "=", "client")
    .then(rows => {
      if (!rows) return [];

      return rows;
    }),
  getAuthUserByEmail: (userEmail: string): Promise<AuthUser> => conn
    .select("*")
    .from("users")
    .where("users.email", "=", userEmail)
    .first()
    .then(row => row),
  getUser: (userId: number): Promise<User> => conn
    .select("*")
    .from("users")
    .where("users.userId", "=", userId)
    .first()
    .then(row => row)

})
