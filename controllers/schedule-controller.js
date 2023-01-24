const fs = require( 'fs' );
const path = require('path');
const basedir = path.join(__dirname, '/../.data');
const controller = require('./controller');
const ZoneDate = require("../lib/zone-date");

module.exports = {
    index(req, res){
        res.send({"schedules":[]});
    },
    async store(req, res){
        const input = req.body;
        const _time = Math.floor( new Date( input.date ).getTime() / 1000 );

        const data = {
            method: input.method,
            protocol: input.protocol || "https",
            url: input.url || 'get',
            timeoutSeconds: parseInt(input.timeoutSeconds || "120" ),
            successCodes: [ parseInt(input[ 'expected-status-code' ] || "200") ]
        };

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
    }

    ,

    show(req, res){
        res.send({
            "message":'Schedule successfully created',
            "status":true, data: [req.body ],
            "server":{data: req.body, params:req.params, query: req.query }
        })
    }

}