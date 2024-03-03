import mongoose from 'mongoose';
import app from './app';
import config from './config/config';
import logger from './config/logger';
import { Server } from 'http';

let server: Server;
mongoose.set('strictQuery', false); // Mongoose supports a separate strictQuery option to avoid strict mode for query filters. This is because empty query filters cause Mongoose to return all documents in the model, which can cause issues. // Mongoose will filter out `notInSchema: 1` because `strict: true`, meaning this query will return _all_ documents in the 'tests' collection MyModel.find({ notInSchema: 1 });
mongoose
  .connect(config.mongoose.url, {
    autoIndex: config.env === 'production' ? false : true,
  })
  .then(async () => {
    logger.info('Connected to MongoDB');
    server = app.listen(config.port, () => {
      logger.info(`Listening to port ${config.port}`);
    });
  });

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error: any) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});
