// dependencies
const url = require('url');
const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const ZoneTime = require('./zone-date');

// worker object - module scaffolding
const worker = { };

// base directory of the data folder
worker.basedir = path.join(__dirname, '/../.data/');

// check data
worker.checkData = (time = null) => {
    // current getTime/1000 (Get seconds)

    const _time = time || Math.floor(new ZoneTime().getTime() / 1000);

    ////console.log({_time});

    // const _time = 1673534240;

    // file dir name
    const dirName = worker.basedir + "schedules/" + _time + '/';

    // check all file by _time
    worker.readFiles(dirName,
        (fileData, filename) => {

            try {
                // return;
                worker.callApi(JSON.parse(fileData), dirName, filename);
            }catch (e) {}

        },
        (err) => {
            //throw err;
        }
    );

};

worker.readFiles = (dirname, onFileContent, onError) => {
    fs.readdir(dirname, function(err, filenames) {
        if (err) {
            onError(err);
            return;
        }

        filenames.forEach((filename) => {
            fs.readFile(dirname + filename, 'utf-8', (err2, content) => {
                if (err2) {
                    onError(err2);
                    return;
                }

                onFileContent(content, filename);
            })
        });

    });
}

// call api
worker.callApi = (data, dirName, fileName) => {

    //console.log({message:'ready', data});

    // parse the hostname & full url from original data
    const parsedUrl = url.parse(`${data.protocol}://${data.url}`, true);
    parsedUrl.query['url']= data.url;

    //console.log({parsedUrl});

    const hostName = parsedUrl.hostname;
    const { path } = parsedUrl;

    const DT = JSON.stringify({
        scheduled_at : data.created_at
    })

    // construct the request
    const requestDetails = {
        protocol: `${data.protocol}:`,
        hostname: hostName,
        port: parsedUrl.port,
        method: data.method.toUpperCase(),
        path,
        timeout: data.timeoutSeconds * 1000,
        contentType:'application/json',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': DT.length
        }
    };

    //console.log({requestDetails});
    const protocolToUse = data.protocol === 'http' ? http : https;

    const req = protocolToUse.request(requestDetails, (res) => {
        // grab the status of the response
        const status = res.statusCode;
        const newDir = worker.basedir + (data.successCodes.includes(status) ? "success/" : 'fail/');
        res.on('data', d => {

            try{
                process.stdout.write(d);
            }catch (e) {

            }


        });

        try {

            //console.log({code:res.statusCode, message: res.statusMessage });

            // move dir from schedule
            fs.rename(dirName + fileName, newDir + fileName, (err) => {
                if (err) {
                    return;
                };
            });

        }catch (e) {

        }
    });

    req.on('error', (err3) => {

    });

    req.on('timeout', () => {

    });

    req.on('success', (data) => {
        //console.log({data})
    })

    try{
        req.write(DT);
    } catch (e) {
    }

    req.end();
};

// timer to execute the worker process once per minute
worker.loop = () => {
    setInterval(() => {
        try {
            worker.checkData();
        }catch (e) {}

    }, 1000 * 1);
};

// start the workers
worker.init = () => {

    // execute all the checks
    worker.checkData();

    // call the loop so that checks continue
    worker.loop();
};

// export
module.exports = worker;
