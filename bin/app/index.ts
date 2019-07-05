import ConnectSessionKnex from "connect-session-knex";
import cookieParser from "cookie-parser";
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
if (true) {
    MigrationService.migrate();
}

// creating server object
const app = express();

// setting all middlewares
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(session({
    secret: "loanleadSessionSecret",
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: true,
    },
    store,
}));

// registering mappings
mappings.forEach((mapping) => {
    app[mapping.method](mapping.path, mapping.callback);
});

export default app;