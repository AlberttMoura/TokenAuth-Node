import express, { Request, Response, NextFunction } from 'express'
import usersRoute from './routes/users.route'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(usersRoute)

app.get('/status', (req: Request, res: Response, next: NextFunction) => {
	console.log('Request to /status')
	res.status(200).send({ msg: 'Hello World' })
})

app.listen(3000, () => {
	console.log('listening on port 3000')
})
