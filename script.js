var static_fl = require('node-static');
var http = require('http');
var fs = require('fs')
var url = require('url');
var tz = require('./assets/nodejs/timeZone.js');
console.log(tz);
var fileServer = new static_fl.Server('assets');
var querystring = require('querystring');

var server = http.createServer(function (request, response) {
    fileServer.serve(request, response), function (err) {
        console.log(err);
    }
    console.log('14', request.url);
    var path = url.parse(request.url).pathname;
    var query = url.parse(request.url).query;
    console.log(path);
    if (request.url === "/hm") {
        fs.readFile('index.html', function (err, data) {
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.write(data)
            return response.end()

        });
    } else if (request.url === "/all-timezone-cities") {
        var ttc = tz.allTimeZones();
        console.log(JSON.stringify(ttc))
        response.writeHead(200, {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*',});
        response.end(JSON.stringify(ttc));
    } else if (path === "/citytime") {
        var cname = querystring.parse(query)["city"];
        console.log(cname);
        var ttd = tz.timeForOneCity(cname);
        console.log((ttd))
        response.writeHead(200, {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*',});
        response.end(JSON.stringify(ttd));
    } else if (path === "/hourly-forecast") {
        var data = '';
        response.writeHead(200, {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*',});
        request.on('data', function (chunk) {
            data += chunk;
            console.log("Data in String format: " + data);
        });
        request.on('end', function () {
            var ttc = tz.allTimeZones();
            var qs = JSON.parse(data);
            console.log(qs);
            var tte = tz.nextNhoursWeather(qs.city_Date_Time_Name, qs.hours, ttc)
            name = qs['email'];
            response.end(JSON.stringify(tte));
        });
    }
    /*else {
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write("<meta name='viewport' content='width=device-width, initial-scale=1'>");
        response.write("<link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css'>");
        response.write("<script src='https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js'></script>");
        response.write("<script src='https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js'></script>");
        response.write("<div class='jumbotron text-center'> <h1>Error! Page Not Found!!</h1></div>")
        response.write("<div class='text-center'> <h3>Hello ^_^</h3><br>")
        //response.write(name + ', happy to welcome you back!<br>');
        response.write("<br><h4>This is <i>locahost:6066</i>  -  Invalid Request</h4> </div>")
        response.end();
    }*/
}).listen(6066);
console.log('Node Server running', server.address()['port']);
console.log(('http://localhost:' + server.address()['port']));

/*
const express = require('express');
const {fork} = require('child_process');
const app = express();

app.use(express.static('assets'));
app.use(express.json());

// Rendering index.html when / route is called
app.get('/', (req, res) => {
    res.render('index.html');
});


// App listening on Port 3030
app.listen(process.env.PORT || 6066, () =>
    console.log('listening on port 6066')
);
*/