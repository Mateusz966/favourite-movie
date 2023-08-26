import { type RequestHandler } from 'express'
import { MovieReqDto } from './dtos/movie.req.dto'
import { validateOrReject } from 'class-validator'
import asyncHandler from 'express-async-handler'
import { MoviesService } from './movies.service'

const movieService = new MoviesService()
export const createMovies = asyncHandler(async (req, res, next) => {
  const { body } = req

  try {
    const movie = new MovieReqDto()

    movie.actors = body.actors
    movie.genres = body.genres
    movie.plot = body.plot
    movie.runtime = body.runtime
    movie.year = body.year
    movie.director = body.director
    movie.posterUrl = body.posterUrl
    movie.title = body.title

    await validateOrReject(movie, { validationError: { target: false } })

    movieService.create(movie)

    res.json({ message: 'Success' }).send()
  } catch (errors) {
    res.status(422).json({ errors })
  }
})

export const getMovies: RequestHandler = (req, res, next) => {
  console.log(req.query)
  res.send(movieService.getMovies())
  res.send('S')
}
