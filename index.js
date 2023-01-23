// dependencies
const server = require('./lib/server');
const port = 213;
const workers = require('./lib/worker');

const ZoneDate = require( './lib/zone-date');

// app object - module scaffolding
const app = {};

//app initialization;
app.init = ( ) => {
    // start the express server
    server.listen( port, () => {

        //const d = new Date("January 23, 2023 03:14:00");
        const d = new ZoneDate();
        let utcHours = (d.getUTCHours() + 6) % 24;
        let hours = d.getHours();
        console.log({utcHours,hours} );
        //express_server.host;

        console.log( `Example app listening on port ${port}` );
        workers.init( );


        /*
        const r =  new Date( "2022-01-23 12:00:00:000 UTC+6" );
        console.log( r.getTime( ), new Date(r.toISOString( )).getTime(), (new Date( )).getTime( ) );
        */
    })
};

app.init();


// export the app
module.exports = app;
