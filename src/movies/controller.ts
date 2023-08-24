import { type RequestHandler } from 'express'
import { MovieReqDto } from './dtos/movie.req.dto'
import { validateOrReject } from 'class-validator'

export const createMovies: RequestHandler = async (req, res, next) => {
  const { body } = req

  try {
    const movie = new MovieReqDto()

    movie.actors = body.actors
    movie.genres = body.actors
    movie.plot = body.plot
    movie.runtime = body.runtime
    movie.year = body.year
    movie.director = body.director
    movie.posterUrl = body.posterUrl
    movie.title = body.title

    await validateOrReject(movie)

    return res.json({ message: 'Success', data: movie }).send();
  } catch (errors) {
    console.log(errors);
    return res.status(422).json({ errors })
  }
}
