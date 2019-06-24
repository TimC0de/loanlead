import cookieParser from "cookie-parser";
import express from "express";
import Knex from "knex";
import logger from "morgan";
import mysql from "mysql";
import config from "./config";
import DBService from "./core/dbservice";
import mappings from "./modules";

const knex = Knex({
    client: "mysql",
    connection: {
        host: config.MySQLHost,
        user: config.MySQLUsername,
        password: config.MySQLPassword,
        database: config.MySQLDatabaseName,
    },
});
DBService.knex = knex;

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

mappings.forEach((mapping) => {
    app[mapping.method](mapping.path, mapping.callback);
});

export default app;