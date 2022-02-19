import { NextFunction, Request, Response } from 'express'
import ForbiddenError from '../models/errors/forbidden.error.model'
import userRepository from '../repositories/user.repository'

async function basicAuthMiddleware(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const authHeader = req.headers?.authorization
		if (!authHeader) {
			throw new ForbiddenError('Acesso negado!')
		}
		const [authType, authToken] = authHeader.split(' ')
		if (authType !== 'Basic' || !authToken) {
			throw new ForbiddenError('Tipo de autenticação inválido!')
		}
		const tokenContent = Buffer.from(authToken, 'base64').toString('utf-8')
		const [username, password] = tokenContent.split(':')
		if (!username || !password) {
			throw new ForbiddenError('Credenciais não preenchidas!')
		}
		const user = await userRepository.findByUsernameAndPassword(
			username,
			password
		)

		if (!user) {
			throw new ForbiddenError('Usuário ou senha inválidos!')
		}

		req.user = user
		next()
	} catch (err) {
		next(err)
	}
}

export default basicAuthMiddleware
