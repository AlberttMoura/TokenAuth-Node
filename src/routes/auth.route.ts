import { Router, Request, Response, NextFunction } from 'express'
import ForbiddenError from '../models/errors/forbidden.error.model'
import userRepository from '../repositories/user.repository'
import StatusCode from 'http-status-codes'
import JWT from 'jsonwebtoken'

const authRoute = Router()

authRoute.post(
	'/token',
	async (req: Request, res: Response, next: NextFunction) => {
		const authHeader = req.headers?.authorization
		try {
			if (!authHeader) {
				throw new ForbiddenError('Acesso negado!')
			}
			const [authType, authToken] = authHeader.split(' ')
			if (authType !== 'Basic' || !authToken) {
				throw new ForbiddenError('Tipo de autenticação inválido!')
			}
			const tokenContent = Buffer.from(authToken, 'base64').toString(
				'utf-8'
			)
			const [username, password] = tokenContent.split(':')
			if (!username || !password) {
				throw new ForbiddenError('Credenciais não preenchidas!')
			}
			const user = await userRepository.findByUsernameAndPassword(
				username,
				password
			)
			console.log(username, password)

			if (!user) {
				throw new ForbiddenError('Usuário ou senha inválidos!')
			}
			const jwtPayLoad = {
				username: user.username,
				password: user.password,
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

export default authRoute
