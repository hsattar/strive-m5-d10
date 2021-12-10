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
        const movie = movies.filter(movie => movie.imdbID === req.params.movieId)
        res.send(movie)
    } catch (error) {
        next(error)
    }
})
.put(async (req, res, next) => {
    try {
        const movies = await getMovies()
        const index = movies.findIndex(movie => movie.imdbID === req.params.movieId)
        movies[index] = {
            ...movies[index],
            ...req.body
        }
        await writeMovie(movies)
        res.send(movies[index])
    } catch (error) {
        next(error)
    }
})
.delete(async (req, res, next) => {
    try {
        const movies = await getMovies()
        const remainingMovies = movies.filter(movie => movie.imdbID !== req.params.movieId)
        await writeMovie(remainingMovies)
        res.status(204).send(remainingMovies)
    } catch (error) {
        next(error)
    }
})

export default movieRouter