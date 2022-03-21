///import required node modules for server
const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');
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
//REST api endpoints configurations
app.all('/dishes', (reuest, response, next)=>{
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/plain');
    next();//will be executed before all api requests
});
app.get('/dishes', (request,response, next)=>{
    response.end('Will send all dishes to client!');
});
app.post('/dishes', (request, response, next)=>{
    response.end('will add the dish:' + request.body.name + 'with details' + request.body.description);
});
app.put('/dishes', (request, response, next)=>{
    response.statusCode = 403;
    response.end('PUT operation is not supported on dishes');
});
app.delete('/dishes', (request,response, next)=>{
    response.end('!!!Deleting all the dishes!!!');
});

app.get('/dishes/:dishId', (request,response, next)=>{
    response.end('Will send details of dish: ' + request.params.dishId);
});
app.put('/dishes/:dishId', (request, response, next)=>{
    response.write('Updating the dish: '+request.params.dishId+'\n');
    response.end('will update the dish: ' + request.body.name + ' with details: ' + request.body.description);
});
app.post('/dishes/:dishId', (request, response, next)=>{
    response.statusCode = 403;
    response.end('POST operation is not supported on dish: ' + request.params.dishId);
});
app.delete('/dishes/:dishId', (request,response, next)=>{
    response.end('!!!Deleting athe dish: ' + request.params.dishId);
});
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