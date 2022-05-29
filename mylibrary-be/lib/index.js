"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var DbService_1 = __importDefault(require("./Services/DbService"));
var app = express_1.default();
var port = 4000;
app.post("/get_token", function (req, res) {
});
app.get("/books/all", function (req, res) {
    DbService_1.default().getAllBooks().then(function (books) { return res.json(books); });
});
app.get("users/all", function (req, res) {
});
app.get("/users/:userId/books", function (req, res) {
});
app.post("users/:userId/borrow", function (req, res) {
});
app.post("users/:userId/return", function (req, res) {
});
app.listen(port, function () {
    console.log("server started at http://localhost:" + port);
});
