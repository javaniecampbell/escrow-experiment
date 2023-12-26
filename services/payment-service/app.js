const express = require("express");

const path = require('path');
const cookieParser = require("cookie-parser");

const logger = require("morgan");

const cors = require('cors');

const indexRouter = require("./routes/index");

const paymentRouter = require("./routes/payment");

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api', paymentRouter);

module.exports = app;
