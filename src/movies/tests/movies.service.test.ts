import { MoviesService } from '../movies.service'
import * as fs from 'fs'
import { MovieReqDto } from '../dtos/movie.req.dto'

jest.mock('fs')

describe('MoviesService', () => {
  class MockMoviesService extends MoviesService {
    constructor () {
      super()
      this.data = {
        genres: ['Action', 'Comedy'],
        movies: [
          { id: 1, title: 'Movie 1', genres: ['Action'], runtime: '120', year: '1999', director: 'Mati Kox' },
          { id: 2, title: 'Movie 2', genres: ['Comedy'], runtime: '123', year: '1999', director: 'Mati Kox' }
        ]
      }
    }
  }

  class MockMoviesServiceWithoutMovies extends MoviesService {
    constructor () {
      super()
      this.data = {
        genres: ['Action', 'Comedy'],
        movies: []
      }
    }
  }

  let moviesService: MockMoviesService
  let movieServiceWithoutMovies: MockMoviesServiceWithoutMovies

  beforeEach(() => {
    moviesService = new MockMoviesService()
    movieServiceWithoutMovies = new MockMoviesServiceWithoutMovies()
  })

  it('should add a new movie', () => {
    const newMovie = new MovieReqDto()

    newMovie.actors = ''
    newMovie.genres = ['Comedy']
    newMovie.plot = 'test'
    newMovie.runtime = '99'
    newMovie.year = '2000'
    newMovie.director = 'director'
    newMovie.posterUrl = 'posterUrl'
    newMovie.title = 'title';

    // eslint-disable-next-line no-unexpected-multiline
    (fs.writeFile as unknown as jest.Mock).mockImplementationOnce((filePath, data, callback) => {
      callback(null) // Simulate successful write
    })

    movieServiceWithoutMovies.create(newMovie)

    expect(movieServiceWithoutMovies.data.movies).toHaveLength(1)
    expect(movieServiceWithoutMovies.data.movies[0]).toMatchObject(newMovie)
  })

  it('should return null when there are no movies', () => {
    const result = movieServiceWithoutMovies.getMovies()
    expect(result).toBeNull()
  })
})
