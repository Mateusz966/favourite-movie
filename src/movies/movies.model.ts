export class Movie {
  constructor (props: Movie) {
    this.id = props.id
    this.title = props.title
    this.year = props.year
    this.runtime = props.runtime
    this.genres = props.genres
    this.director = props.director
    this.actors = props.actors
    this.plot = props.plot
    this.posterUrl = props.posterUrl
  }

  id: number
  title: string
  year: string
  runtime: string
  genres: string[]
  director: string
  actors: string
  plot: string
  posterUrl: string
}
