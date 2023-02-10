import {Router} from 'express';
import gasStationsRouter from './gas-stations/gas-stations.router';

const apiRouter = Router();

apiRouter.get('/', (req, res, next): void => {
    res.send("You have reached the API!");
});

apiRouter.get('/a', (req, res): void => {
    res.send("You have reached a");
});

apiRouter.use('/gas-stations', gasStationsRouter);

export default apiRouter;
