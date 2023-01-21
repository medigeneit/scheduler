// dependencies

const express = require('express')
const app = express()
const port = 213;
const router = require('./routes/index');

router.init( app )

// respond with "hello world" when a GET request is made to the homepage
// app.get('/', (req, res) => {
//     res.send('hello world')
// })


//const server = require('./lib/server');
const workers = require('./lib/worker');

// app object - module scaffolding
//const app = {};

// app.init = () => {
//     // start the server
//     //server.init();
//
//     // start the workers
//     workers.init();
// };

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
    workers.init();
})

// export the app
module.exports = app;
