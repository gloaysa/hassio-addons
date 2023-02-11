import {Router} from 'express';

const albumCoverRouter = Router();
let lastAlbum: string;
albumCoverRouter.get('/last-album', (req, res) => {
    res.setHeader('Content-Type', 'image/png;base64');
    res.send(lastAlbum);
});

albumCoverRouter.post('/last-album', (req, res) => {
   const { img } = req.body;
   lastAlbum = img;
   res.send('ok');
});

export default albumCoverRouter;
