import express from "express"
import createHttpError from "http-errors"
import { validationResult } from "express-validator"
import { getMovies, writeMovie, getReviews, writeReview } from "../functions/fs-tools.js"
import { addingMovieValidation } from '../middleware/validation.js'

const movieRouter = express.Router()

const error404 = 'This Movie Does Not Exist.'

movieRouter.route('/')
.get(async (req, res, next) => {
    try {
        const movies = await getMovies()
        res.send(movies)
    } catch (error) {
        next(error)
    }
})
.post(addingMovieValidation , async (req, res, next) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) return next(createHttpError(400, errors))
        const movies = await getMovies()
        const imdbCheck = movies.findIndex(movie => movie.imdbID === req.body.imdbID)
        if (imdbCheck !== -1) return next(createHttpError(400, 'A movie with this imdbID has already been created.'))
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
        if (movie.length === 0) return next(createHttpError(404, error404))
        res.send(movie)
    } catch (error) {
        next(error)
    }
})
.put(async (req, res, next) => {
    try {
        const movies = await getMovies()
        const index = movies.findIndex(movie => movie.imdbID === req.params.movieId)
        if (index === -1) return next(createHttpError(404, error404))
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
        if (movies.length === remainingMovies.length) return next(createHttpError(404, error404))
        await writeMovie(remainingMovies)
        res.status(204).send(remainingMovies)
    } catch (error) {
        next(error)
    }
})

movieRouter.patch('/:movieId/poster', async (req, res, next) => {   
    try {
        const movies = await getMovies()
        const index = movies.findIndex(movie => movie.imdbID === req.params.movieId)
        if (index === -1) return next(createHttpError(404, error404))
        movies[index].Poster = req.body.Poster
        await writeMovie(movies)
        res.send(movies[index])
    } catch (error) {
        next(error)
    }   
})

export default movieRouter