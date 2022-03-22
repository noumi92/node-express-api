///import required node modules for server
const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const dishRouter = require('./routes/dishRouter');
///pre-configuration for server
const hostname = 'localhost';
const port = 3000;
const app = express();
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.use('/dishes', dishRouter);
//REST api endpoints configurations

///setup the http server
app.use((request, response, next) => {
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/html');
    response.end("<html><body><h1>Express Server</h1></body></html>")
});
//initialize http server using express app
const server = http.createServer(app);
///start ther server, server will start listening to
///http requests from clients
server.listen(port, hostname, ()=>{
    console.log(`Sever running at http://${hostname}:${port}`);
});