import express = require("express");
import path = require("path");
import api = require("./route/api");
import bodyParser = require('body-parser');
import fs = require('fs');

const app = express();

var dirname = __dirname + "/../client/";
console.log(dirname);

app.set("view options", { layout: false });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

function handleRoot(req, res) {
    var url = req.originalUrl;
    if (!fs.existsSync(path.join(dirname + url))) {
        res.redirect('/');
    }
    if (url == "/") {
        url = "/index.html";
    }
    res.sendFile(path.join(dirname + url));
}

app.use("/api", api);
app.use("/", handleRoot);
app.listen(process.env.PORT || 3000);