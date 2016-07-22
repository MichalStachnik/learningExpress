var express = require('express');
var app = express();
var jsonParser = require('body-parser').json;
var routes = require('./routes');
var logger = require('morgan');


app.use(logger('dev'));
app.use(jsonParser());

app.use('/questions', routes);


//catch 404 and pass to error
app.use(function(req, res, next){
    var err = new Error('not found');
    err.status = 404;
    next(err);
});

//error handler
app.use(function(err, req, res, next){
    res.status(err.status || 500);
    res.json({
        message: err.message
    });
});

var port = process.env.PORT || 8888;

app.listen(port, function(){
    console.log('express server is listening on 8888');
});