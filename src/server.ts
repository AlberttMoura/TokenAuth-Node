import express from 'express'
import bearerAuthMiddleware from './middleware/bearer.auth.middleware'
import errorHandler from './middleware/error.handler.middleware'
import authRoute from './routes/auth.route'
import statusRoute from './routes/status.route'
import usersRoute from './routes/users.route'

const app = express()

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Configurações das rotas
app.use(statusRoute)
app.use(authRoute)

app.use(bearerAuthMiddleware)
app.use(usersRoute)
app.use(errorHandler)
// Inicilização do servidor
app.listen(process.env.PORT || 3000, () => {
	console.log(`Listening on port ${process.env.PORT || 3000}`)
})
