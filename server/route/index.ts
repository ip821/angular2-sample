import express = require('express');
import {Router, Request, Response} from 'express';
import path = require("path");
import fs = require('fs');

var dirname = __dirname + "/../../client/";
console.log(dirname);

function index(req, res) {
    var url = req.originalUrl;
    if (!fs.existsSync(path.join(dirname, url))) {
        res.redirect('/');
    }
    if (url == "/") {
        url = "/index.html";
    }
    res.sendFile(path.join(dirname, url));
};

export = index;