import express from "express"

const movieRouter = express.Router()

movieRouter.route('/')
.get(async (req, res, next) => {
    try {
        res.send('OK')
    } catch (error) {
        next(error)
    }
})
.post(async (req, res, next) => {
    try {
        res.send('OK')
    } catch (error) {
        next(error)
    }
})

movieRouter.route('/:movieId')
.get(async (req, res, next) => {
    try {
        res.send('OK')
    } catch (error) {
        next(error)
    }
})
.put(async (req, res, next) => {
    try {
        res.send('OK')
    } catch (error) {
        next(error)
    }
})
.delete(async (req, res, next) => {
    try {
        res.send('OK')
    } catch (error) {
        next(error)
    }
})

export default movieRouter