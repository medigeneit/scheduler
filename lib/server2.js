// dependencies
const http = require('http');

// server object - module scaffolding
const server = {};

// configuration
server.config = {
    port: 213,
};

// create server
server.createServer = () => {
    http.createServer(async (req, res) => {
            //set the request route
            if (req.url === "/" && req.method === "GET") {
                //response headers
                res.writeHead(200, { "Content-Type": "application/json" });
                //set the response
                res.write("Hi there, This is a Vanilla Node.js API");
                //end the response
                res.end();
            }
        
            // If no route present
            else {
                res.writeHead(404, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ message: "Route not found" }));
            }
        })
        .listen(server.config.port, () => {
            console.log(`listening to port ${server.config.port}`);
        });
    };

// start the server
server.init = () => {
    server.createServer();
};

// export
module.exports = server;
