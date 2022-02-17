import { NextFunction, Request, Response, Router } from 'express'
import StatusCode from 'http-status-codes'

const statusRoute = Router()

statusRoute.get(
	'/status',
	(req: Request, res: Response, next: NextFunction) => {
		res.sendStatus(StatusCode.OK)
	}
)

export default statusRoute
