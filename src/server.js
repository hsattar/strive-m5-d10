import express from 'express'
import cors from 'cors'
import movieRouter from './routes/movies.js'
import errorHandler from './middleware/error-handlers.js'

const server = express()
const port = process.env.PORT || 3001

const { LOCAL_FE_URL, REMOTE_FE_URL } = process.env
const whiteList = [LOCAL_FE_URL, REMOTE_FE_URL]

const corsOptions = {
    origin: function(origin, next) {
        if (!origin || whiteList.indexOf(origin !== -1)) {
            next(null, true)
        } else {
            next(new Error('CORS ERROR'))
        }
    }
}

server.use(cors(corsOptions))
server.use(express.json())
server.use('/movies', movieRouter)
server.use(errorHandler)

server.listen(port, () => console.log(`Server running on port ${port}`))