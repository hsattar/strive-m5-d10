import fs from 'fs-extra'
import { fileURLToPath } from 'url'
import { join, dirname } from 'path'

const { readFile, writeFile } = fs

const dataFolderPath = join(dirname(fileURLToPath(import.meta.url)), '../data')
const moviesJSONPath = join(dataFolderPath, 'movies.json')
const reviewsJSONPath = join(dataFolderPath, 'reviews.json')

export const getMovies = () => readFile(moviesJSONPath)
export const writeMovie = content => writeFile(moviesJSONPath, content)
export const getReviews = () => readFile(reviewsJSONPath)
export const writeReview = content => writeFile(reviewsJSONPath, content)
