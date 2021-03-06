import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';
import fs from 'fs';

import workRoute from './routes/work.routes';

if (process.env.NODE_ENV === 'development') {
  const result = dotenv.config();
  if (result.error) throw result.error;
} else { // in build folder
  fs.copyFileSync( // copy html
    path.join(__dirname, '../../index.html'),
    path.join(__dirname, '../index.html'),
  );
  fs.copyFileSync( // copy favicon
    path.join(__dirname, '../../favicon.ico'),
    path.join(__dirname, '../favicon.ico'),
  );
}

const port = process.env.PORT || 3001;
const server = express();

server.use(express.json());

server.use('/api/v1/works', workRoute);

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL as string, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });

    server.get('*', (_, res) => {
      res.sendFile(path.join(__dirname, '../index.html'));
    });

    server.listen(port, (err?: any) => {
      if (err) throw err;
      console.log(`Ready on port ${port} - ${process.env.NODE_ENV}`)
    })
  } catch (e) {
    console.log('Server error', e);
    process.exit(1);
  }
})();

