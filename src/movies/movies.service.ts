import data from '../db/db.json'
import { type MovieReqDto } from './dtos/movie.req.dto'
import { maxValueByPropName } from '../utils/maxValueByPropName'
import { type Movie } from './movies.types'
import * as fs from 'fs'
import path from 'path'
import { generateRandomNumberInRange } from '../utils/generateRandomNumberInRange'
import { minValueByPropName } from '../utils/minValueByPropName'

export class MoviesService {
  private readonly data: { genres: string[], movies: Movie[] }
  constructor () {
    this.data = data
  }

  create (movie: MovieReqDto): any {
    const id = maxValueByPropName<Movie>(this.data.movies, 'id').id + 1
    const movieToAdd = { id, ...movie }
    this.data.movies.push(movieToAdd)

    fs.writeFile(path.join(__dirname, '../db/db.json'), JSON.stringify(this.data), (err) => {
      if (err != null) {
        throw err
      } else {
        return 'success'
      }
    })
  }

  getMovies (duration?: number, genres?: string[]) {
    const moviesLength = this.data.movies.length

    if (moviesLength === 0) {
      return {}
    }

    const randomMoviePosition = generateRandomNumberInRange(1, moviesLength)

    console.log(randomMoviePosition)

    if (!duration && !genres) {
      return this.data.movies[randomMoviePosition - 1]
    }
  }
}
