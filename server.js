const express = require('express');
const {fork} = require('child_process');
const port = 6066;
const forked = fork('./fork.js');

const bodyParser = require('body-parser');
const app = express();

//Use Express.js
app.use(express.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


//Render Homepage
app.get('/', (request, response) => {
    console.log('hello');
    response.sendFile(__dirname + '/assets/index.html');
});

//Get All City Details
app.get('/all-timezone-cities', (request, response) => {
    //console.log('All-timezone-cities')
    //const forked = fork('./fork.js');
    forked.send('all-timezone-cities');
    forked.on('message', (alltz) => {
        response.end(JSON.stringify(alltz));
    });
});

//Get Time for City
app.get('/citytime', (request, response) => {
    var cname = request.query.city;
    //console.log("!!!", cname);
    forked.send({msg: "citytime", city: cname});
    forked.on('message', (ctime) => {
        response.end(JSON.stringify(ctime));
    });
});

//Get Next 5 hour details
app.post('/hourly-forecast', (request, response) => {
    var data = (request.body);
    forked.send({msg: "hourly-forecast", cityobj: data});
    forked.on('message', (next5hrs) => {
        response.end(JSON.stringify(next5hrs));
    });
});

//Serve Static Files
app.use(express.static('assets'));
app.listen(port, () => {
    console.log('Node Server running', port)
    console.log(__dirname);
    console.log(('http://localhost:' + port))
});