import express, { type Express, type NextFunction, type Request, type Response } from 'express'
import dotenv from 'dotenv'
import moviesRouter from './movies/routes'

dotenv.config()

const app: Express = express()

const port = process.env.PORT
// const routes = [moviesRoutes]

// routes.forEach(({ name, routes }) => {
//   console.log(name, routes)
//   app.use(name, routes)
// })

app.use('/movies', moviesRouter)

// // Default error handling
// app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
//   res.status(500).json({ message: err.message })
// })

app.get('/', (req: Request, res: Response) => {
  res.send('api v1')
})

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
})

app._router.stack.forEach(function (r) {
  if (r.route?.path) {
    console.log(r.route.path)
  }
})
