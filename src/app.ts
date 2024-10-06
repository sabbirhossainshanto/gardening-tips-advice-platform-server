/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import routes from './app/routes';
import notFound from './app/middlewares/notFound';
import config from './app/config';

const app: Application = express();

app.use(
  cors({ credentials: true, origin: [config.client_base_url as string] })
);

//parser
app.use(express.json());

app.use('/api/v1', routes);

//Testing
app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.OK).json({
    success: true,
    message: 'Welcome to the Garden Tip and Advice API',
  });
});

// global error handler
app.use(globalErrorHandler);

//handle not found
app.use(notFound);

export default app;
