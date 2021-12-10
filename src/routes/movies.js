import express from "express"
import { getMovies, writeMovie, getReviews, writeReview } from "../functions/fs-tools.js"

const movieRouter = express.Router()

movieRouter.route('/')
.get(async (req, res, next) => {
    try {
        const movies = await getMovies()
        res.send(movies)
    } catch (error) {
        next(error)
    }
})
.post(async (req, res, next) => {
    try {
        const movies = await getMovies()
        console.log(movies)
        movies.push(req.body)
        await writeMovie(movies)
        res.status(201).send(req.body)
    } catch (error) {
        next(error)
    }
})

movieRouter.route('/:movieId')
.get(async (req, res, next) => {
    try {
        const movies = await getMovies()
        res.send(movies)
    } catch (error) {
        next(error)
    }
})
.put(async (req, res, next) => {
    try {
        const movies = await getMovies()
        res.send(movies)
    } catch (error) {
        next(error)
    }
})
.delete(async (req, res, next) => {
    try {
        const movies = await getMovies()
        res.send(movies)
    } catch (error) {
        next(error)
    }
})

export default movieRouter