import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import knex from 'knex';
import jwt, { JsonWebTokenError, VerifyErrors } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import fs from 'fs';
import path from 'path';

import BooksRepository from './Repositories/BooksRepository';
import UsersRepository from './Repositories/UsersRepository';

const app = express();
const port = 4000;

const conn = knex({
    client: 'mysql',
    connection: {
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: 'root',
        database: 'lib_db'
    },
    debug: true
})

const SUPER_SECRET = fs.readFileSync(path.resolve(__dirname, "../resources/jwt_secret.txt"), "utf8");

app.use(cors());

app.use(bodyParser.json());

app.use(["/users", "/books"], (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== undefined) {
        const bearerToken = bearerHeader?.split(' ')[1];
        req.body['token'] = bearerToken;
        next();
    } else {
        res.status(403)
    }
})

app.post("/token", (req, res) => {
    UsersRepository(conn).getAuthUserByEmail(req.body.username).then(user => {
        if (user){
            bcrypt.compare(req.body.password, user.password, (err, results) => {
                if (err) {
                    console.log(err)
                }
                else if (results) {
                    let token = jwt.sign({ email: user.email, role: user.role }, SUPER_SECRET, { expiresIn: "1d" })
                    res.json({ status: "success", userId: user.user_id, userRole: user.role, token: token })
                }
                else {
                    res.json({ status: "error", message: "Wrong password" })
                }
            })
        } else {
            res.json({status: "error", message: "User does not exist"})
        }
        
    })
})

app.get("/books/all", (req, res) => {
    jwt.verify(req.body.token, SUPER_SECRET, (err: VerifyErrors | null, authData: object | undefined) => {
        if (!err) {
            BooksRepository(conn).getAllBooks().then((books) => res.json(books))
        } else {
            res.status(403)
        }
    })
})

app.get("/users/all", (req, res) => {
    UsersRepository(conn).getAllUsers().then((users) => res.json(users))
})

app.get("/users/clients", (req, res) => {
    UsersRepository(conn).getAllClients().then((users) => res.json(users))
})

app.get("/users/:userId/profile", (req, res) => {
    jwt.verify(req.body.token, SUPER_SECRET, (err: VerifyErrors | null, authData: object | undefined) => {
        if (!err) {
            let userId = parseInt(req.params.userId)
            UsersRepository(conn).getUser(userId).then((user) => res.json(user))
        } else {
            res.status(403).json({ error: err.name, message: err.message });
        }
    })
})

app.get("/users/:userId/borrowed", (req, res) => {
    jwt.verify(req.body.token, SUPER_SECRET, (err: VerifyErrors | null, authData: object | undefined) => {
        if (!err) {
            let userId = parseInt(req.params.userId)
            BooksRepository(conn).getBorrowedBooks(userId).then((books) => res.json(books))
        } else {
            res.status(403).json({ error: err.name, message: err.message });
        }
    })
})

app.get("/users/:userId/favourites", (req, res) => {
    jwt.verify(req.body.token, SUPER_SECRET, (err: VerifyErrors | null, authData: object | undefined) => {
        if (!err) {
            let userId = parseInt(req.params.userId)
            BooksRepository(conn).getFavouriteBooks(userId).then((books) => res.json(books))
        } else {
            res.status(403).json({ error: err.name, message: err.message });
        }
    })
})

app.post("/users/:userId/borrow", (req, res) => {
    jwt.verify(req.body.token, SUPER_SECRET, (err: VerifyErrors | null, authData: object | undefined) => {
        if (!err) {
            let userId = parseInt(req.params.userId);
            let bookId = parseInt(req.body.bookId)
            BooksRepository(conn).borrowBook(userId, bookId).then((results) => res.json(results)).catch((e) => { console.log(e) })
        } else {
            res.status(403).json({ error: err.name, message: err.message });
        }
    })
})

app.post("/users/:userId/return", (req, res) => {
    jwt.verify(req.body.token, SUPER_SECRET, (err: VerifyErrors | null, authData: object | undefined) => {
        if (!err) {
            let userId = parseInt(req.params.userId);
            let bookId = parseInt(req.body.bookId)
            BooksRepository(conn).returnBook(userId, bookId).then((results) => res.json(results)).catch((e) => { console.log(e) })
        } else {
            res.status(403).json({ error: err.name, message: err.message });
        }
    })
})

app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`)
})
