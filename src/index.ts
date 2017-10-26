import { json } from 'body-parser';
import * as express from 'express';
import { join, resolve } from 'path';
import { savePixel, updateImage } from './helpers';

const app: express.Application = express();
const rootDir: string = resolve(__dirname, '../');
const port: number = 8080;

app.use(json());

// api endpoints
app.get('/image/send/:index/:value', (req: express.Request, res: express.Response) => {
  const index: number = +req.params.index;
  const value: number = +req.params.value;
  savePixel(index, value);
  res.json({index, value});
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
