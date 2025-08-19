import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { getEnvVar } from './utils/getEnvVar.js';
import router from './routers/index.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';
import cookieParser from 'cookie-parser';
// import { getAllContacts, getContactById } from './services/contacts.js';

const PORT = Number(getEnvVar('PORT', 3005));

export const setupServer = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());
  app.use(cookieParser());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );
  // app.get('/', (req, res) => {
  //   res.json({
  //     message: 'Hello, world!',
  //   });
  // });

  app.use(router);
  app.use(notFoundHandler);
  app.use(errorHandler);
  // app.use((req, res, next) => {
  //   res.status(404).json({
  //     status: '404',
  //     message: 'Not Found',
  //   });
  // });

  // app.use((err, req, res, next) => {
  //   res.status(500).json({
  //     status: '500',
  //     message: 'Something went wrong!',
  //     error: err.message,
  //   });
  // });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
