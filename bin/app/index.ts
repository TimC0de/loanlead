import ConnectSessionKnex from "connect-session-knex";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import session from "express-session";
import Knex from "knex";
import logger from "morgan";
import mysql from "mysql";
import config from "./config";
import DBService from "./core/dbservice";
import MigrationService from "./core/migration_service";
import mappings from "./modules";

// configuring Knex and KnexStore
const KnexStore = ConnectSessionKnex(session);

const knex = Knex({
    client: "mysql",
    connection: {
        host: config.MySQLHost,
        user: config.MySQLUsername,
        password: config.MySQLPassword,
        database: config.MySQLDatabaseName,
    },
});

const store = new KnexStore({
    creatable: true,
    knex,
});

// Making knex object available for all services
DBService.knex = knex;

// Encrypting all passwords
if (false) {
    MigrationService.migrate();
}

// creating server object
const app = express();
const router = express.Router();

// register mappings
mappings.forEach((mapping) => {
    router[mapping.method](mapping.path, mapping.callback);
});

// setting all middlewares
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(cors());
app.use(session({
    secret: "loanleadSessionSecret",
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: true,
    },
    store,
}));

app.use("/api", router);
app.use((req, res, next) => {
    res.type("json");

    next();
});

export default app;