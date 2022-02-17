import express, { Request, Response, NextFunction } from 'express'

const app = express()

app.get('/status', (req: Request, res: Response, next: NextFunction) => {
	console.log('Request to /status')
	res.status(200).send({ msg: 'Hello World' })
})

app.listen(3000, () => {
	console.log('listening on port 3000')
})
