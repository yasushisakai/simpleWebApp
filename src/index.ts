import { json } from 'body-parser';
import * as express from 'express';
import { join, resolve } from 'path';
import { getPixel, getSize, savePixel, updateImage } from './helpers';

const app: express.Application = express();
const rootDir: string = resolve(__dirname, '../');
const port: number = 5678;
const url_prefix = '/talkingdrums';

app.use(json());

let size: {width: number, height: number} = getSize();
let sendCnt: number = 0;
let isPlaying: boolean = true;

// api endpoints
app.get(`${url_prefix}/image/send/:value/`, (req: express.Request, res: express.Response) => {
  // this way the client can be dumb
  // it overflows and goes back to 0 again
  const value: number = +req.params.value;
  // only sends what it got, this way,
  // garbage of mid uploaded pixels will be controlled
  savePixel(sendCnt, value);
  res.json({sendCnt, value});
});

    app.get(`${url_prefix}/image/get/next/`, (req: express.Request, res: express.Response) => {
  if(isPlaying) {
    
    let value = getPixel(sendCnt);
    console.log(`s->c: ${Date.now()},${sendCnt},${value}`);
    res.json({index:sendCnt, value});

    sendCnt += 1; // next command only increments
    sendCnt %= (size.width * size.height);

  } else {
    res.json("stopped");
  }
});

app.get(`${url_prefix}/image/start/`, (req: express.Request, res: express.Response) => {
  isPlaying = true;
  res.json("started");
});

app.get(`${url_prefix}/image/stop/`, (req: express.Request, res: express.Response) => {
  isPlaying = false;
  res.json("stopped");
});

app.get(`${url_prefix}/image/reset/`, (req: express.Request, res: express.Response) => {
  sendCnt = 0;
  res.json("reset");
});

app.get(`${url_prefix}/image/update`, (req: express.Request, res: express.Response) => {
  updateImage();
  res.json("updated image");
});


app.get(`${url_prefix}/image/size/`, (req: express.Request, res: express.Response) => {
  res.json(size);
});

// serving static files
app.use(express.static(join(rootDir, '/static')));

// start up server
app.listen(port, () => {
  console.log(`listening to port: ${port}`);
  setInterval(updateImage, 1000 * 60 * 10); // updates image ea 10min
});
