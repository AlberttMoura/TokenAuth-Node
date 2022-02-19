import { Router, Request, Response, NextFunction } from 'express'
import ForbiddenError from '../models/errors/forbidden.error.model'
import userRepository from '../repositories/user.repository'
import StatusCode from 'http-status-codes'
import JWT from 'jsonwebtoken'
import basicAuthMiddleware from '../middleware/basic.auth.middleware'
import bearerAuthMiddleware from '../middleware/bearer.auth.middleware'

const authRoute = Router()

authRoute.post(
	'/token',
	basicAuthMiddleware,
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const user = req.user
			if (!user) {
				throw new ForbiddenError('Usuário não informado')
			}
			const jwtPayLoad = {
				username: user.username,
			}
			const jwtOptions = { subject: user?.uuid }
			const secretKey = 'breadbread'
			const jwt = JWT.sign(jwtPayLoad, secretKey, jwtOptions)

			res.status(StatusCode.OK).json({ token: jwt })
		} catch (err) {
			next(err)
		}
	}
)

authRoute.post(
	'/token/validate',
	bearerAuthMiddleware,
	(req: Request, res: Response, next: NextFunction) => {
		res.sendStatus(StatusCode.OK)
	}
)

export default authRoute
