const fs = require("fs");
const path = require('path');
const controller = {};

controller.basedir =  path.join(__dirname, '/../.data');

controller.store = async ( collection, record  ) => {


    return new Promise((resolve, reject) =>{
        if( typeof record == 'object' ) {

            const date = new Date();

            record["id"] = date.getTime( );
            record["created_at"] = `${date.toDateString()} ${date.toTimeString()}`;

            const collectionDir = `${controller.basedir}/${collection}`;

            if ( !fs.existsSync(collectionDir) ) {
                fs.mkdirSync( collectionDir, {
                    recursive: true
                });
            }

            fs.appendFile(
                `${collectionDir}/${record.id}.json`,
                JSON.stringify( date ),{ flag: 'w+' },
                (err) => {
                    if( err ) {
                        reject(  err );
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