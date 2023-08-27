import data from '../db/db.json'
import { type MovieReqDto } from './dtos/movie.req.dto'
import { maxValueByPropName, generateRandomNumberInRange } from '../utils'
import { type Movie } from './movies.types'
import * as fs from 'fs'
import path from 'path'

export class MoviesService {
  public data: { genres: string[], movies: Movie[] }
  constructor () {
    this.data = data
  }

  create (movie: MovieReqDto): void {
    const currentLastId = maxValueByPropName<Movie>(this.data.movies, 'id')?.id

    const id = currentLastId === undefined ? 1 : currentLastId + 1

    const movieToAdd = { id, ...movie }
    this.data.movies.push(movieToAdd)

    fs.writeFile(path.join(__dirname, '../db/db.json'), JSON.stringify(this.data), (err) => {
      if (err != null) {
        throw err
      }
    })
  }

  getMovies (duration?: number, genres?: string[]): Movie | Movie[] | null {
    const moviesLength = this.data.movies.length

    if (moviesLength === 0) {
      return null
    }

    if ((genres != null) && (duration != null)) {
      return this.filterAndSortByGenresAndDuration(genres, duration)
    }

    if (genres != null && duration == null) {
      return this.sortByGenres(genres)
    }

    if (duration != null && genres == null) {
      return this.getRandomMovieByDuration(duration)
    }

    return this.getRandomMovie()
  }

  private filterAndSortByGenresAndDuration (genres: string[], duration: number): Movie[] {
    const filteredByGenres = this.filterMovieByGenres(genres)
    const sortedByGenreMatches = this.sortMoviesByMatchesGenres(filteredByGenres, genres)
    return this.filterMoviesByDuration(sortedByGenreMatches, duration)
  }

  private getRandomMovieByDuration (duration: number): Movie | null {
    const movies = this.filterMoviesByDuration(this.data.movies, duration)
    if (movies.length === 0) {
      return null
    }

    const randomMoviePosition = generateRandomNumberInRange(1, movies.length)
    return movies[randomMoviePosition - 1]
  }

  private sortByGenres (genres: string[]): Movie[] {
    const filteredByGenresMovies = this.filterMovieByGenres(genres)
    return this.sortMoviesByMatchesGenres(filteredByGenresMovies, genres)
  }

  private filterMoviesByDuration (movies: Movie[], duration: number): Movie[] {
    const minDuration = duration >= 10 ? duration - 10 : duration
    const maxDuration = duration + 10

    return movies.filter((movie) => Number(movie.runtime) >= minDuration && Number(movie.runtime) <= maxDuration)
  }

  private filterMovieByGenres (genres: string[]): Movie[] {
    return this.data.movies.filter((movie) => {
      return genres.some((genre) => movie.genres.includes(genre))
    })
  }

  private calcNumberOfMatchesGenres (genres: string[], genresInQuery: string[]): number {
    return genres.filter((genre) => genresInQuery.includes(genre)).length
  }

  private sortMoviesByMatchesGenres (movies: Movie[], genresInQuery: string[]): Movie[] {
    return movies.sort((a, b) => {
      const matchesGenresA = this.calcNumberOfMatchesGenres(a.genres, genresInQuery)
      const matchesGenresB = this.calcNumberOfMatchesGenres(b.genres, genresInQuery)

      return matchesGenresB - matchesGenresA
    })
  }

  private getRandomMovie (): Movie {
    const randomMoviePosition = generateRandomNumberInRange(0, this.data.movies.length)
    return this.data.movies[randomMoviePosition - 1]
  }
}
