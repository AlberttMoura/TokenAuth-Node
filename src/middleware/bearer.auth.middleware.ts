import { Request, Response, NextFunction } from 'express'
import ForbiddenError from '../models/errors/forbidden.error.model'
import JWT from 'jsonwebtoken'
import userRepository from '../repositories/user.repository'

async function bearerAuthMiddleware(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const authHeader = req.headers['authorization']
		if (!authHeader) {
			throw new ForbiddenError('Credenciais invalidas!')
		}
		const [authType, token] = authHeader.split(' ')
		if (authType !== 'Bearer' || !token) {
			throw new ForbiddenError('Tipo de autenticação inválido!')
		}
		const tokenPayload = JWT.verify(token, 'breadbread')
		if (typeof tokenPayload !== 'object' || !tokenPayload.sub) {
			throw new ForbiddenError('Token inválido')
		}

		const user = {
			uuid: tokenPayload.sub,
			username: tokenPayload.username,
		}
		req.user = user
		next()
	} catch (err) {
		next(err)
	}
}

export default bearerAuthMiddleware
