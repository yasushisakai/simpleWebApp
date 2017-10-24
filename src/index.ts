import * as express from 'express';
import { json } from 'body-parser';
import { resolve, join } from 'path';
import { Api } from './api';

const app: express.Application = express();
const rootDir: string = resolve(__dirname, '../');
const port: number = 8080;

// json for api endpoints
app.use(json());

// api endpoints
app.use('/api', Api);

// serving static files
app.use(express.static(join(rootDir,'/static')));

// start up server
app.listen(port, () => {
	console.log(`listening to port: ${port}`);
});
