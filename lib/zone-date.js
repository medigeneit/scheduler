const DateTime = require('./date-time');

class ZoneDate extends DateTime{

    static TZ = +6;

    constructor( date, timezone = null) {
        const tz = timezone || ZoneDate.TZ;

        if( date ) {
            super( date );
        } else {
            const lDate = new Date();
            let utcDate  = `${lDate.getUTCFullYear()}-${lDate.getUTCMonth()+1}-${lDate.getUTCDate()} ${lDate.getUTCHours()}:${lDate.getUTCMinutes()}:${lDate.getUTCSeconds()}:${lDate.getUTCMilliseconds()}`;
            let ud = new Date( utcDate );
            super( (new Date( utcDate ) ).getTime() + tz*60*60*1000 );
        }

    }

    addHours = function(h) {
        this.setTime(this.getTime() + (h*60*60*1000));
        return this;
    }

}

module.exports = ZoneDate;