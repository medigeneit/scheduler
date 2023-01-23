class ZoneDate extends Date{

    static TZ = '+06';

    constructor(date, timezone = null) {

        const tz = timezone || ZoneDate.TZ;


        if( date ) {
            const d = `${date} ${tz}`;
            super(d);
        } else {
            super( ( new Date()).toUTCString( ) + ' '+tz );

            console.log({
                tz,
                d:( new Date()).toUTCString( ) + ''+tz
            });
        }

    }


}

module.exports = ZoneDate;