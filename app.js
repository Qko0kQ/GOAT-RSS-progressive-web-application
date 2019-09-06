let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let bodyParser = require('body-parser');
let compression = require('compression');

let indexRouter = require('./routes/index');
let newsRouter = require('./routes/news');

let app = express();
let port = process.env.PORT || 8000;

// Allow CORS so that backend and frontend could be put on different servers
let allowCrossDomain = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
  next();
};
app.use(allowCrossDomain);

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
      extended: true
    })
);

const loaddata = require("./backend/loaddata.js");
const offline = require("./backend//offline.js");
const search = require("./backend//search.js");
const user = require("./backend//user.js");

app.use("/api/loaddata", loaddata);
app.use("/api/offline", offline);
app.use("/api/search", search);
app.use("/api/user", user);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(compression());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'build')));
app.use(express.static(path.join(__dirname, 'build')));
app.use('/static', express.static(path.join(__dirname, 'build/static')));

app.use('/', indexRouter);
app.use('/news/', newsRouter);
app.use(/\/news\/.*/, newsRouter);
app.use(/\/profile\/.*/, newsRouter);
app.use(/\/about\/.*/, newsRouter);// regex, /news/ + any character

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Use the body-parser package in our application
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

module.exports = app;
app.listen(port);