const express = require('express');
const path = require("path");
const bodyParser = require('body-parser');
const pg = require('pg');
const app = express();

var databaseUrl = process.env.DATABASE_URL;
if (databaseUrl == undefined) {
    databaseUrl = "pg://postgres:123@localhost/postgres";
}else{
    pg.defaults.ssl = true;
}

app.set("view options", { layout: false });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

function handleRoot(req, res) {
    var url = req.originalUrl;
    if (url == "/") {
        url = "/index.html";
    }
    res.sendFile(path.join(__dirname + url));
}

function handleDbGet(req, res) {
    console.log(req.originalUrl + "-" + req.method);
    pg.connect(databaseUrl, function(err, client) {
        if (err) throw err;
        console.log('Connected to postgres! Getting schemas...');

        client
            .query('SELECT firstName, lastName, username FROM actor;')
            .on('row', function(row) {
                console.log(JSON.stringify(row));
            });
    });
    //res.status(200).send([{ firstName: "firstName", lastName: "lastName", username: "username" }]);
}

function handleDbPost(req, res) {
    console.log(req.originalUrl + "-" + req.method);
    console.log(req.body);
    res.send("POST Ok.");
}

app.route('/db')
    .get(handleDbGet)
    .post(handleDbPost);
app.use("/", handleRoot);
app.listen(process.env.PORT || 3000);