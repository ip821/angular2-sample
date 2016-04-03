import express = require('express');
import {Router, Request, Response} from 'express';
import {Client, ClientConfig, connect as dbConnect} from "pg";

const router = Router();
var databaseUrl = process.env.DATABASE_URL;
if (databaseUrl == undefined) {
    databaseUrl = "pg://postgres:123@localhost/postgres";
} else {
    //pg.defaults.ssl = true;
}

router.get("/db", (req, res) => {
    console.log(req.originalUrl + "-" + req.method);
    dbConnect(databaseUrl, function(err, client, done) {
        if (err) throw err;

        client.query('SELECT id, first_name, last_name, username FROM actor;', function(err, result) {
            done();
            if (err) throw err;
            var rows = JSON.stringify(result.rows);
            console.log(rows);
            res.send(rows);
        });
    });
});

router.post("/db", (req, res) => {
    console.log(req.originalUrl + "-" + req.method);
    var actor = req.body;
    dbConnect(databaseUrl, function(err, client, done) {
        if (err) throw err;
        client.query(
            "UPDATE actor SET first_name=$2, last_name=$3, username=$4 WHERE id=($1);",
            [actor.id, actor.first_name, actor.last_name, actor.username],
            function(err, result) {
                done();
                if (err) throw err;
                res.send("POST Ok.");
            });
    });

});
