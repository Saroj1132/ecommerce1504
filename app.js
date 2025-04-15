var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const connectDB = require('./config/db');
const swaggerUI = require('swagger-ui-express')
const swaggerSpec = require('./swaggerConfig')

var app = express();

connectDB();

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/v1/auth', require('./routes/auth.routes'));
app.use('/api/v1/product', require('./routes/product.routes'));
app.use('/api/v1/cart', require('./routes/cart.routes'));
app.use('/api/v1/order', require('./routes/order.routes'));

module.exports = app;
