const date_format = function ( date, string ) {
    if( typeof string != 'string' ) {
        console.error( 'Invalid! cannot format type of ' + typeof string )
        return '';
    }

    const shortWeeks = [ 'Sat','Sun','Mon','Tue','Wed','Thu','Fri' ];
    const fullWeeks = [ 'Saturday','Sunday','Monday','Tuesday','Wednesday','Thursday','Friday' ];
    const shortMonths = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug', 'Sep','Oct','Nov','Dec'];
    const fullMonths = ['January','February','March','April','May','June','July','August', 'September','October','November','December'];

    const H = date.getHours( );
    const i = date.getMinutes( );
    const s = date.getSeconds( );
    const w = date.getDay();

    let wIndex= w === 6 ? 0:w+1;

    const dateVars = {
        Y : date.getFullYear(),
        y : String(date.getFullYear()).replace(/^\d{2}/, ''),
        h : H === 0 ? '12'
            : (  ( H % 12 ) < 10 ? '0' + ( H % 12 ) : ( H % 12 ) ),
        H : H < 10 ? '0' + H : H,
        i : i < 10 ? '0'+ i : i,
        s : s < 10 ? '0'+ s : s,
        A : ( H >= 12 ? 'PM' : 'AM' ),
        a : ( H >= 12 ? 'pm' : 'am' ),
        m : date.getMonth( ) + 1 < 10 ? `0${date.getMonth( ) + 1}`: date.getMonth( ) + 1,
        d : date.getDate( ) < 10 ? `0${date.getDate()}`:date.getDate(),
        ms : date.getMilliseconds( ),
        M: shortMonths[ date.getMonth( ) ],
        F: fullMonths[ date.getMonth( ) ],
        w,D:shortWeeks[wIndex], l:fullWeeks[wIndex]
    }

    if( typeof string == 'string' ) {
        return  string.replace(/\{(y|Y|m|d|h|H|i|s|ms|a|A|M|F|w|D|l)\}/g, ( m, g ) => dateVars[g] || '' )
    }
}

class DateTime extends Date{
    constructor(date) {
        super(date);
    }

    format( string ) {
        return date_format( this, string);
    }

    toTime(){

    }

    toDate(){

    }

    toDateTime(){

    }

    displayTime(){

    }

    displayDate(){

    }

    display(){

    }

    addSecond(second){

        //console.log( this.getTime() + second, second)

        return new DateTime(this.getTime() + (second * 1000) );
    }

}

//(new DateTime()).format('{Y}-{m}-{d} h:i:s:a')
//(new DateTime()).format('{Y}-{m}-{d} H:i:s:a')


/*
getDate
:
ƒ getDate()
getDay
:
ƒ getDay()
getFullYear
:
ƒ getFullYear()
getHours
:
ƒ getHours()
getMilliseconds
:
ƒ getMilliseconds()
getMinutes
:
ƒ getMinutes()
getMonth
:
ƒ getMonth()
getSeconds
:
ƒ getSeconds()
getTime
:
ƒ getTime()
getTimezoneOffset
:
ƒ getTimezoneOffset()
getUTCDate
:
ƒ getUTCDate()
getUTCDay
:
ƒ getUTCDay()
getUTCFullYear
:
ƒ getUTCFullYear()
getUTCHours
:
ƒ getUTCHours()
getUTCMilliseconds
:
ƒ getUTCMilliseconds()
getUTCMinutes
:
ƒ getUTCMinutes()
getUTCMonth
:
ƒ getUTCMonth()
getUTCSeconds
:
ƒ getUTCSeconds()
getYear
:
ƒ getYear()
setDate
:
ƒ setDate()
setFullYear
:
ƒ setFullYear()
setHours
:
ƒ setHours()
setMilliseconds
:
ƒ setMilliseconds()
setMinutes
:
ƒ setMinutes()
setMonth
:
ƒ setMonth()
setSeconds
:
ƒ setSeconds()
setTime
:
ƒ setTime()
setUTCDate
:
ƒ setUTCDate()
setUTCFullYear
:
ƒ setUTCFullYear()
setUTCHours
:
ƒ setUTCHours()
setUTCMilliseconds
:
ƒ setUTCMilliseconds()
setUTCMinutes
:
ƒ setUTCMinutes()
setUTCMonth
:
ƒ setUTCMonth()
setUTCSeconds
:
ƒ setUTCSeconds()
setYear
:
ƒ setYear()
toDateString
:
ƒ toDateString()
toGMTString
:
ƒ toUTCString()
toISOString
:
ƒ toISOString()
toJSON
:
ƒ toJSON()
toLocaleDateString
:
ƒ toLocaleDateString()
toLocaleString
:
ƒ toLocaleString()
toLocaleTimeString
:
ƒ toLocaleTimeString()
toString
:
ƒ toString()
toTimeString
:
ƒ toTimeString()
toUTCString
:
ƒ toUTCString()

*/
DateTime.date_format = date_format;

module.exports = DateTime;
