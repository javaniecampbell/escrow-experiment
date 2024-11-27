
import { tracer } from "./utils/tracing";
import express, { json, urlencoded } from "express";
import path from 'path';
import cookieParser from "cookie-parser";

import logger from "morgan";

import cors from 'cors';

import indexRouter from "./routes/index";
import paymentRouter from "./routes/payment";
import webhookRouter from "./routes/webhook";
import projectRouter from "./routes/project";
import milestoneRouter from "./routes/milestone";
import digitalAssetRouter from "./routes/digitalAsset";

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));
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

export default app;
