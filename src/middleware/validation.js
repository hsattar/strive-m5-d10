import { body } from 'express-validator'

export const addingMovieValidation = [
    body('Title').exists().isLength({ min: 1 }).withMessage('Title is required'),
    body('Year').exists().isLength({ min: 1 }).withMessage('Year is required'),
    body('imdbID').exists().isLength({ min: 1 }).withMessage('imdbID is required'),
    body('Type').exists().isLength({ min: 1 }).withMessage('Type is required'),
    body('Poster').exists().isLength({ min: 1 }).withMessage('Poster is required')
]
