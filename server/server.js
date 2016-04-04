"use strict";
var express = require("express");
var bodyParser = require('body-parser');
var api = require("./route/api");
var index = require("./route/index");
var init = require("./util/initDb");
init.initDb();
var app = express();
app.set("view options", { layout: false });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api", api);
app.use("/", index);
app.listen(process.env.PORT || 3000);
//# sourceMappingURL=server.js.map