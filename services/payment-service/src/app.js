
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
app.disable('x-powered-by');
// app.use(express.static(path.join(__dirname, 'public')));
// app.use((req, res, next)=> {

//     // req.d
//     next();
// })
app.use('/api/health', indexRouter({ tracer }));
app.use('/api/payments', paymentRouter({ tracer }));
app.use('/api/webhook', webhookRouter({ tracer }));
app.use('/api/projects', projectRouter({ tracer }));
app.use('/api/milestones', milestoneRouter({ tracer }));
app.use('/api/milestones', milestoneRouter({ tracer }));
app.use('/api/assets', digitalAssetRouter({ tracer }));

module.exports = app;
