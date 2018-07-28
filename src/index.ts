import { json } from 'body-parser';
import * as express from 'express';
import { join, resolve } from 'path';
import { getPixel, savePixel, updateImage } from './helpers';

const app: express.Application = express();
const rootDir: string = resolve(__dirname, '../');
const port: number = 5678;
const url_prefix = '/talkingdrums';


app.use(json());

app.get(url_prefix + '', (req:express.Request, res: express.Response) => {
  res.json("hello there");
})

// api endpoints
app.get(url_prefix + '/image/send/:index/:value', (req: express.Request, res: express.Response) => {
  const index: number = +req.params.index;
  const value: number = +req.params.value;
  savePixel(index, value);
  res.json({index, value});
});

let cnt: number = 0;
let isPlaying: boolean = false;

app.get('/talkingdrums/image/receive/', (req: express.Request, res: express.Response) => {
  if(isPlaying) {
  res.json({cnt});
    cnt += 1;
    cnt %= 256;
  } else {
    res.json("stopped");
  }
});

app.get('/talkingdrums/image/start/', (req: express.Request, res: express.Response) => {
  isPlaying = true;
  res.json("started");
});

app.get('/talkingdrums/image/stop/', (req: express.Request, res: express.Response) => {
  isPlaying = false;
  res.json("stopped");
});

// serving static files
app.use(express.static(join(rootDir, '/static')));

// create the first image
updateImage();

// start up server
app.listen(port, () => {
  console.log(`listening to port: ${port}`);
  setInterval(updateImage, 1000 * 60 * 60);
});
