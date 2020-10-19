"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var knex_1 = __importDefault(require("knex"));
var conn = knex_1.default({
    client: 'mysql',
    connection: {
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: 'root',
        database: 'lib_db'
    }
});
exports.default = (function () { return ({
    getAllUsers: function () {
    },
    getAllBooks: function () { return conn
        .select("*")
        .from("books").then(function (result) {
        if (!result)
            return [];
        return result.map(function (row) { return ({
            bookid: row[0],
            title: row[1],
            author: row[2],
            year: row[3],
            description: row[4],
            isbn: row[5],
            pages: row[6]
        }); });
    }); }
}); });
