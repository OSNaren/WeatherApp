const tz = require('weather-tzone');
const querystring = require("querystring");
console.log(tz);

//Return Next 5 hours
const get5val = (cobj) => {
    let atz = tz.allTimeZones();
    return tz.nextNhoursWeather(cobj, 5, atz);
};

//Redirect and Return results for Child Processes
process.on('message', (message) => {
    if (message === 'all-timezone-cities') {
        var dt = tz.allTimeZones();
        process.send(dt);
    } else if (message.msg === 'citytime') {
        var cname = message.city;
        var ttd = tz.timeForOneCity(cname);
        process.send(ttd);
    } else if (message.msg === 'hourly-forecast') {
        let cobj = (message.cityobj);
        const n5hrs = get5val(cobj.city_Date_Time_Name);
        process.send(n5hrs);
    }
});
