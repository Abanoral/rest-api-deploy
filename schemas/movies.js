const z = require('zod')

const movieSchema = z.object({
  title: z.string({
    invalid_type_error: 'Movie title must be a string',
    required_error: 'Movie title is required.'
  }),
  year: z.number().int().min(1900).max(2024),
  director: z.string(),
  duration: z.number().int().positive(),
  poster: z.string().url({
    message: 'Poster must be a valid URL'
  }),
  genre: z.array(
    z.enum(['Action', 'Adventure', 'Comedy', 'Crime', 'Drama', 'Fantasy', 'Horror', 'Thriller', 'Sci-Fi']),
    {
      required_error: 'Movie genre is required.',
      invalid_type_error: 'Movie genre msut be an array of enum Genre'
    }
  )
})

function validateMovie (object) {
  // safeparse devuelve { success: true/false , data/error: "data"/zodError } si el dato o los datos son correctos devuelve los datos validados, en caso contrario devuelve el error con los campos y tipos incorrectos.
  return movieSchema.safeParse(object)
}

function validatePartialMovie (input) {
  // partial hace que se validen todos los campos, pero se salta los opcionales, ideal para hacer actualizaciones, pues ya hay datos existentes
  return movieSchema.partial().safeParse(input)
}
module.exports = {
  validateMovie,
  validatePartialMovie
}
