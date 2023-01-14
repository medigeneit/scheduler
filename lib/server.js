// dependencies
const http = require('http');

// server object - module scaffolding
const server = {};

// configuration
server.config = {
    port: 3000,
};

// create server
server.createServer = () => {
    http.createServer().listen(server.config.port, () => {
        console.log(`listening to port ${server.config.port}`);
    });
};

// start the server
server.init = () => {
    server.createServer();
};

// export
module.exports = server;
