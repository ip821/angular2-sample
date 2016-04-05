import express = require('express');
import {Router} from 'express';
import {connect as dbConnect} from "pg";
import pgPromiseFactory = require("pg-promise");

const pgPromise = pgPromiseFactory();
const router = Router();

var databaseUrl = process.env.DATABASE_URL || "pg://postgres:123@localhost/postgres";

router.get("/get-actors", (req, res) => {
    pgPromise(databaseUrl)
        .manyOrNone('SELECT id, first_name, last_name, username FROM actor;')
        .then(result => {
            var rows = JSON.stringify(result);
            console.log(rows);
            res.send(rows);
        })
        .catch(err => { throw err; });
});

router.post("/save-actor", (req, res) => {
    var actor = req.body;
    pgPromise(databaseUrl)
        .query("UPDATE actor SET first_name=${first_name}, last_name=${last_name}, username=${username} WHERE id=${id}", actor)
        .then(result => res.sendStatus(200))
        .catch(err => { throw err; });
});

export = router;
