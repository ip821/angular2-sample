import express = require("express");
import path = require("path");
import bodyParser = require('body-parser');
import fs = require('fs');
import api = require("./route/api");
import index = require("./route/index");
import init = require("./util/initDb");

init.initDb();

const app = express();

app.set("view options", { layout: false });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", api);
app.use("/", index);
app.listen(process.env.PORT || 3000);