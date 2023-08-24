import { type Movie } from '../model'
import { IsArray, IsString } from 'class-validator'

export class MovieReqDto implements Omit<Movie, 'id'> {
  @IsString()
    actors!: string

  @IsString()
    director!: string

  @IsArray()
    genres!: string[]

  @IsString()
    plot!: string

  @IsString()
    posterUrl!: string

  @IsString()
    runtime!: string

  @IsString()
    title!: string

  @IsString()
    year!: string
}
