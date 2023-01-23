const express = require("express");
const routes = require("../routes");
const app = express( );
console.log(process.env.TZ);
process.env.TZ = "Etc/Universal"

console.log(process.env.TZ);

app.use(express.urlencoded({
        extended: true,
        limit:'2048kb',
    })
);

app.use(express.json());

app.use( '/api', routes );

module.exports = app;