import express from 'express'
import cors from 'cors'
import movieRouter from './routes/movies.js'
import errorHandler from './middleware/error-handlers.js'

const server = express()
const port = process.env.PORT || 3001

server.use(cors())
server.use(express.json())
server.use('/movies', movieRouter)

server.use(errorHandler)
server.listen(port, () => console.log(`Server running on port ${port}`))