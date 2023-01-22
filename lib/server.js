const express = require("express");
const routes = require("../routes");
const app = express();

app.use(express.urlencoded({
        extended: true,
        limit:'2048kb',
    })
);

app.use(express.json());

app.use( '/api', routes );

module.exports = app;