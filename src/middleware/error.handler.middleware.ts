import { Request, Response, NextFunction } from 'express'
import StatusCode from 'http-status-codes'
import DatabaseError from '../models/errors/database.error.model'

function errorHandler(
	error: any,
	req: Request,
	res: Response,
	next: NextFunction
) {
	if (error instanceof DatabaseError) {
		res.sendStatus(StatusCode.BAD_REQUEST)
	} else {
		res.sendStatus(StatusCode.INTERNAL_SERVER_ERROR)
	}
}

export default errorHandler
