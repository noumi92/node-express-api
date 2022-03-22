const express = require('express');
const bodyParser = require('body-parser');

const dishRouter = express.Router();
dishRouter.use(bodyParser.json());

dishRouter.route('/').all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((request,response, next)=>{
    response.end('Will send all dishes to client!');
})
.post((request, response, next)=>{
    response.end('will add the dish:' + request.body.name + 'with details' + request.body.description);
})
.put((request, response, next)=>{
    response.statusCode = 403;
    response.end('PUT operation is not supported on dishes');
})
.delete((request,response, next)=>{
    response.end('!!!Deleting all the dishes!!!');
});

module.exports = dishRouter;