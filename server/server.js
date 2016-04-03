var express = require('express');
var path = require("path");
var bodyParser = require('body-parser');
var pg = require('pg');
var fs = require('fs');
var app = express();
var databaseUrl = process.env.DATABASE_URL;
if (databaseUrl == undefined) {
    databaseUrl = "pg://postgres:123@localhost/postgres";
}
else {
    pg.defaults.ssl = true;
}
app.set("view options", { layout: false });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
function handleRoot(req, res) {
    var url = req.originalUrl;
    if (!fs.existsSync(path.join(__dirname + url))) {
        res.redirect('/');
    }
    if (url == "/") {
        url = "/index.html";
    }
    res.sendFile(path.join(__dirname + url));
}
function handleDbGet(req, res) {
    console.log(req.originalUrl + "-" + req.method);
    pg.connect(databaseUrl, function (err, client, done) {
        if (err)
            throw err;
        client.query('SELECT id, first_name, last_name, username FROM actor;', function (err, result) {
            done();
            if (err)
                throw err;
            var rows = JSON.stringify(result.rows);
            console.log(rows);
            res.send(rows);
        });
    });
}
function handleDbPost(req, res) {
    console.log(req.originalUrl + "-" + req.method);
    var actor = req.body;
    pg.connect(databaseUrl, function (err, client, done) {
        if (err)
            throw err;
        client.query("UPDATE actor SET first_name=$2, last_name=$3, username=$4 WHERE id=($1);", [actor.id, actor.first_name, actor.last_name, actor.username], function (err, result) {
            done();
            if (err)
                throw err;
            res.send("POST Ok.");
        });
    });
}
app.route('/db')
    .get(handleDbGet)
    .post(handleDbPost);
app.use("/", handleRoot);
app.listen(process.env.PORT || 3000);
//# sourceMappingURL=server.js.map