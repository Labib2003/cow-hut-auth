import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
import config from './config/index';
import { errorlogger, logger } from './shared/logger';

process.on('uncaughtException', error => {
  console.log('Uncaught exception error', error);
  process.exit(1);
});

let server: Server;
async function serverFunction() {
  try {
    await mongoose.connect(config.database_url as string);
    console.log('🗃️ database connection successful');

    server = app.listen(config.port, () => {
      console.log(`Application listening on port ${config.port}`);
    });
  } catch (err) {
    console.log('failed to connect database', err);
  }

  process.on('unhandledRejection', error => {
    if (server) {
      server.close(() => {
        console.log('Unhandled error ~ ', error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}

serverFunction();

process.on('SIGTERM', () => {
  console.log('sigterm is received');
  if (server) {
    server.close();
  }
});
