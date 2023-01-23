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
worker.checkData = () => {
    // current getTime/1000 (Get seconds)

    const _time = Math.floor(new ZoneTime().getTime() / 1000);
    
    // const _time = 1673534240;

    //console.log(_time);

    // file dir name
    const dirName = worker.basedir + "schedules/" + _time + '/';

    // check all file by _time
    worker.readFiles(dirName,
        (fileData, filename) => {
            // return;
            worker.callApi(JSON.parse(fileData), dirName, filename);
        },
        (err) => {
            return;
            return console.log('Not found!');
            throw err;
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


    // parse the hostname & full url from original data
    const parsedUrl = url.parse(`${data.protocol}://${data.url}`, true);
    const hostName = parsedUrl.hostname;
    const { path } = parsedUrl;

    // construct the request
    const requestDetails = {
        protocol: `${data.protocol}:`,
        hostname: hostName,
        method: data.method.toUpperCase(),
        path,
        timeout: data.timeoutSeconds * 1000,
    };

    const protocolToUse = data.protocol === 'http' ? http : https;
    console.log({message:'ready to call API ',data,requestDetails});

    const req = protocolToUse.request(requestDetails, (res) => {
        // grab the status of the response
        const status = res.statusCode;
        const newDir = worker.basedir + (data.successCodes.includes(status) ? "success/" : 'fail/');


        console.log({res:res.statusCode,msg:res.statusMessage,requestDetails});

        // move dir from schedule
        fs.rename(dirName + fileName, newDir + fileName, (err) => {
            if (err) {
                return;
            };
        });

    });

    req.on('error', (err3) => {

    });

    req.on('timeout', () => {

    });

    req.end();
};

// timer to execute the worker process once per minute
worker.loop = () => {
    setInterval(() => {
        worker.checkData();
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
