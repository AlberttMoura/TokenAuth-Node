import express from 'express'
import statusRoute from './routes/status.route'
import usersRoute from './routes/users.route'
import errorHandler from './middleware/error.handler.middleware'

const app = express()

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Configurações das rotas
app.use(usersRoute)
app.use(statusRoute)

app.use(errorHandler)
// Inicilização do servidor
app.listen(3000, () => {
	console.log('listening on port 3000')
})
