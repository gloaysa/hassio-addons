import {Router} from 'express';
import gasStationsRouter from './gas-stations/gas-stations.router';
import albumCoverRouter from './album-cover/album-cover.router';

const apiRouter = Router();

apiRouter.get('/', (req, res, next): void => {
    res.send("You have reached the API!");
});

apiRouter.use('/gas-stations', gasStationsRouter);
apiRouter.use('/album-cover', albumCoverRouter);

export default apiRouter;
