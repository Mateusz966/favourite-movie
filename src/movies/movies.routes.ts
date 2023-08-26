import { Router } from 'express'
import { createMovies, getMovies } from './movies.controller'

const router = Router()

router.get('/', getMovies)

router.post('/', createMovies)

export default router
