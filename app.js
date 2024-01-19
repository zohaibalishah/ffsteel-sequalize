var createError = require('http-errors');
require('dotenv').config();
const { gzipSync, gunzipSync } = require('zlib');
var express = require('express');
var path = require('path');
const swaggerUi = require('swagger-ui-express');
const openapiSpecification=require("./swagger/index")
const swaggerDocument = require('./openapi.json');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('./config/dbconnection');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productsRouter = require('./routes/products');
const helmet=require("helmet")
const EventEmitter = require('events');
const event = new EventEmitter();

// let count = 0;
// event.on('laptop', (name) => {
//   count++;
//   console.log('this is ok1 ', name);
// });
// event.emit('laptop', 'zohaib');



var app = express();
app.use(helmet());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api', (req, res) => {
  res.json({ message: 'api' });
});

app.get('/count', (req, res) => {

  res.json(count);
});
var options = {
  explorer: true
};
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
