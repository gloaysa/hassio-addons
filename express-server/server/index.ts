import express from 'express';

import * as path from 'path';
import apiRouter from './routes/api';
import gasStationsRouter from './routes/api/gas-stations/gas-stations.router';
const app = express();
const port = 3001;

app.get('/', (req, res) => {
  res.send(`Hello World!`)
})

app.use('/api', apiRouter);
app.use('/api/gas-stations', gasStationsRouter);

app.use(express.static(path.resolve("./") + "/build"));

app.get('/web', (req, res): void => {
  res.sendFile(path.resolve("./") + "/build/index.html");
});

app.listen((port), () => {
  console.info(`Express server listening on port ${port}`)
})



