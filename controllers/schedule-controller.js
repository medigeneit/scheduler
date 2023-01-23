const fs = require( 'fs' );
const path = require('path');
const basedir = path.join(__dirname, '/../.data');
const controller = require('./controller');
const ZoneDate = require("../lib/zone-date");

module.exports = {
    index(req, res){
        res.send({"schedules":[]});
    }
    ,
    async store(req, res){
        try {

            const input = req.body;
            const _time = Math.floor( new Date( input.date ).getTime() / 1000 );

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