
const { tracer } = require("./utils/tracing");
const express = require("express");
const path = require('path');
const cookieParser = require("cookie-parser");

const logger = require("morgan");

const cors = require('cors');

const indexRouter = require("./routes/index");
const paymentRouter = require("./routes/payment");
const webhookRouter = require("./routes/webhook");
const projectRouter = require("./routes/project");
const milestoneRouter = require("./routes/milestone");
const digitalAssetRouter = require("./routes/digitalAsset");

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/payments', paymentRouter);
app.use('/api/webhook', webhookRouter);
app.use('/api/projects', projectRouter);
app.use('/api/milestones', milestoneRouter);

module.exports = app;
