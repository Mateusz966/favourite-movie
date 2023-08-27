export const isValidDuration = (input: unknown): input is number => {
  return typeof input === 'number' && input > 0
}

export const isValidGenres = (input: unknown): input is string[] => {
  return Array.isArray(input) && input.length > 0
}

export const validateAndExtractGetMoviesQuery = (duration?: string, genres?: string[]) => {
  let validatedDuration: number | undefined

  if (duration != null) {
    const parsedDuration = parseInt(duration)

    if (isNaN(parsedDuration) || !isValidDuration(parsedDuration)) {
      return { error: 'Incorrect duration value' }
    }

    validatedDuration = parsedDuration
  }

  if (genres != null) {
    if (!isValidGenres(genres)) {
      return { error: 'Incorrect genres value' }
    }
  }

  return { duration: validatedDuration, genres }
}
