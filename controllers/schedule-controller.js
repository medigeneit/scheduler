const fs = require( 'fs' );
const path = require('path');
const  basedir = path.join(__dirname, '/../.data');


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
        console.log( {data: req.body, params:req.params, query: req.query });

        try {

            const input = req.body;

            const _time = Math.floor( dateWithTimezone( input.date, 6 ).getTime() / 1000 );

            const schedulesDataDir = `${basedir}/schedules/${_time}`;

            if ( !fs.existsSync(schedulesDataDir) ) {
                fs.mkdirSync( schedulesDataDir, {
                    recursive: true
                });
            }

            const date = dateWithTimezone(null,6);
            console.log({time: _time});

            const data =JSON.stringify({
                id: date.getTime(),
                created_at: `${date.toDateString()} ${date.toTimeString()}`,
                method: input.method,
                protocol: input.protocol || "https",
                url: input.url || 'get',
                timeoutSeconds: parseInt(input.timeoutSeconds || "120" ),
                successCodes: [ parseInt(input.expectedStatusCode || "200") ]
            });

            await fs.appendFile(
                `${schedulesDataDir}/${date.getTime()}.json`, data,
                { flag: 'w+' },
                ( err, file) => {
                    if(err) throw err;
                }
            );

            res.send({
                "message":'Schedule successfully created',
                "status":true,
                "server":{
                    data: req.body,
                    params:req.params,
                    query: req.query
                },
                "schedule": data
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