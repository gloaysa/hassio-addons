import express from 'express';
const app = express();
const port = 3001;

import gasStationsRouter from './routes/gas-stations/gas-stations.router';

app.get('/', (req, res) => {
  res.send(`Hello World!`)
})

app.use('/gas-stations', gasStationsRouter);

app.listen((port), () => {
  console.info(`Express server listening on port ${port}`)
})



