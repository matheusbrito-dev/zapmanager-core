import 'reflect-metadata';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import router from './app/routes/router';
import { AppDataSource } from './database/data-source';

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(router);

AppDataSource.initialize()
  .then(async () => {
    console.log('Database Connected');
    app.listen(4000, () => {
      console.log('App listening at http://localhost:4000');
    });
  })
  .catch((error) => {
    console.error('Error during Data Source initialization:', error);
  });
