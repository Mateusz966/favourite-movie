import { Router } from 'express'
import { createMovies } from './controller'

const router = Router()

router.get('/')

router.post('/', createMovies)

export default Router
