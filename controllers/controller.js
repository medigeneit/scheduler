const fs = require("fs");
const path = require('path');
const controller = {};

controller.basedir =  path.join(__dirname, '/../.data');

controller.store = async ( collection, data  ) => {

    const date = new Date();

    return new Promise((resolve, reject) =>{
        if( typeof data == 'object' ) {

            data["id"] = date.getTime( );
            data["created_at"] = `${date.toDateString()} ${date.toTimeString()}`;

            const collectionDir = `${controller.basedir}/${collection}`;

            if ( !fs.existsSync(collectionDir) ) {
                fs.mkdirSync( collectionDir, {
                    recursive: true
                });
            }

            fs.appendFile(
                `${collectionDir}/${data.id}.json`,
                JSON.stringify( date ),{ flag: 'w+' },
                (err) => {
                    if( err ) {
                        reject( " R "+err );
                    }else {
                        resolve( data );
                    }
                }
            );

        } else {
            reject("Data must be object!" );
        }
    })

}


module.exports = controller;