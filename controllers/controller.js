const fs = require("fs");
const path = require('path');
const ZoneDate = require('../lib/zone-date');
const controller = {};

controller.basedir =  path.join(__dirname, '/../.data');

controller.store = async ( collection, record  ) => {


    return new Promise((resolve, reject) =>{
        if( typeof record == 'object' ) {

            const date = new ZoneDate();

            record["id"] = date.getTime( );
            record["created_at"] = `${date.format('{Y}-{m}-{d} {H}:{i}:{s}')}`;

            const collectionDir = `${controller.basedir}/${collection}`;

            if ( !fs.existsSync(collectionDir) ) {
                fs.mkdirSync( collectionDir, {
                    recursive: true
                });
            }

            fs.appendFile(
                `${collectionDir}/${record.id}.json`,
                JSON.stringify( record ),{ flag: 'w+' },
                (err) => {
                    if( err ) {
                        reject(  err, record );
                    }else {
                        resolve( record );
                    }
                }
            );

        } else {
            reject("Data must be object!" );
        }
    })

}


module.exports = controller;