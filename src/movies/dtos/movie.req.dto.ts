import { type Movie } from '../movies.model'
import {
  IsNumberString,
  IsOptional,
  IsString,
  Length,
  MaxLength,
  MinLength
} from 'class-validator'
import { IsArrayValuesAllowed } from './is-array-values-allowed.decorator'
export class MovieReqDto implements Omit<Movie, 'id'> {
  @IsString()
  @MinLength(1)
  @MaxLength(9999)
  @IsOptional()
    actors!: string

  @IsString()
  @MinLength(1)
  @MaxLength(255)
    director!: string

  @IsArrayValuesAllowed()
    genres!: string[]

  @IsString()
  @MinLength(1)
  @MaxLength(9999)
  @IsOptional()
    plot!: string

  @IsString()
  @MinLength(1)
  @MaxLength(9999)
  @IsOptional()
    posterUrl!: string

  @IsNumberString()
    runtime!: string

  @IsString()
  @MaxLength(255)
  @MinLength(1)
    title!: string

  @Length(4, 4, { message: 'year should contain 4 numbers e.i 2005' })
  @IsNumberString()
    year!: string
}
