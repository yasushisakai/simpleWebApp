import { Request, Response, Router } from 'express';

const router: Router = Router();

router.get('/test/:value', async (req: Request, res: Response) => {
	const value: number = req.params.value;
	res.json({value});
});

export const Api: Router = router;
