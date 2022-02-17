import { NextFunction, Request, Response, Router } from 'express'
import StatusCode from 'http-status-codes'

const usersRoute = Router()

usersRoute.get('/users', (req: Request, res: Response, next: NextFunction) => {
	console.log('oiii')
	const users = [{ id: 1, name: 'Fulano' }]
	res.status(StatusCode.OK).send(users)
})

usersRoute.get(
	'/users/:uuid',
	(req: Request, res: Response<{ uuid: string }>, next: NextFunction) => {
		const uuid = req.params.uuid
		res.status(200).send({ uuid })
	}
)

usersRoute.post('/users', (req: Request, res: Response, next: NextFunction) => {
	const newUser = req.body
	res.status(StatusCode.CREATED).send(newUser)
})

usersRoute.put(
	'/users/:uuid',
	(req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
		const uuid = req.params.uuid
		res.status(StatusCode.OK).send(uuid)
	}
)

usersRoute.delete(
	'/users/:uuid',
	(req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
		const uuid = req.params.uuid
		res.status(StatusCode.OK).send(uuid)
	}
)

export default usersRoute
