import express, { type Express, type NextFunction, type Request, type Response } from 'express'
import dotenv from 'dotenv'
import moviesRouter from './movies/movies.routes'

dotenv.config()

const app: Express = express()
const port = process.env.PORT

app.use(express.json())

app.use('/api/movies', moviesRouter)
app.get('/api', (req: Request, res: Response) => {
  res.send('api v1')
})

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack)
  res.status(500).send('Something went wrong')
})

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
})
