const fs = require( 'fs' );
const path = require('path');
const basedir = path.join(__dirname, '/../.data');
const controller = require('./controller');
const ZoneDate = require("../lib/zone-date");

function dateWithTimezone(input = null,offset) {
    // create Date object for current location
    const d = new Date(input);

    // convert to
    // subtract local time zone offset
    // get UTC time in msec
    const utc = d.getTime() + (d.getTimezoneOffset() * 60000);

    // create new Date object for different city
    // using supplied offset
    return new Date(utc + (3600000*offset));

}

module.exports = {
    index(req, res){
        res.send({"schedules":[]});
    }
    ,
    async store(req, res){
        //console.log( {data: req.body, params:req.params, query: req.query });

        try {
            const r = await controller.store('schedules');
            console.log( "RRR", r);
            res.send({'ok':55});

        }catch (e) {
            res.send({'ok':500, 'msg': e});
        }


        try {


            console.log( "RRR", r);

            const input = req.body;

            const _time = Math.floor( new ZoneDate( input.date ).getTime() / 1000 );


            const data =JSON.stringify({
                method: input.method,
                protocol: input.protocol || "https",
                url: input.url || 'get',
                timeoutSeconds: parseInt(input.timeoutSeconds || "120" ),
                successCodes: [ parseInt(input.expectedStatusCode || "200") ]
            });

            const schedule = await controller.store( `schedules/${_time}`, data );

            res.send({
                "message":'Schedule successfully created',
                "status":true,
                "server":{
                    data: req.body,
                    params:req.params,
                    query: req.query
                },
                "schedule": schedule
            })

            //console.log(`Appended data to '../.data/abcd.json'`);
        } catch (error) {

            res.send({
                "message":`Got an error trying to creating schedule: ${error.message}`,
                "success":false,
                "server":{data: req.body, params:req.params, query: req.query }
            });

            //console.error(`Got an error trying to append the file: ${error.message}`);
        }

    },


    show(req, res){

        console.log( {data: req.body, params:req.params, query: req.query });

        res.send({
            "message":'Schedule successfully created',
            "status":true, data: [req.body ],
            "server":{data: req.body, params:req.params, query: req.query }
        })
    }

}