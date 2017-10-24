import * as express from 'express'
import { json } from 'body-parser'
import { resolve } from 'path'

const app: express.Application = express();
const port: number = 8080;

app.use(json());

app.use(express.static(resolve(__dirname, '../static')));

app.get('/', async (req:express.Request, res:express.Response) => {
	res.sendFile(resolve(__dirname,'../html/index.html'));
})

app.listen(port, () => {
	console.log(`listening to port: ${port}`);
});
