import express from 'express';

import * as path from 'path';
import apiRouter from './routes/api';
const app = express();
const port = 3001;

app.use('/api', apiRouter);

app.use(express.static(path.resolve("./") + "/build"));

app.get('/', (req, res): void => {
  res.sendFile(path.resolve("./") + "/build/index.html");
});

app.listen((port), () => {
  console.info(`Express server listening on port ${port}`)
})



