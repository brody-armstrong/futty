import express from 'express'
import playersRouter from './routes/players.js'

const app = express()
const PORT = process.env.PORT || 3001
const CORS_ORIGIN = process.env.CORS_ORIGIN || '*'

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', CORS_ORIGIN)
  next()
})

app.use('/api', playersRouter)

app.listen(PORT, () => {
  console.log(`Futty API listening on port ${PORT}`)
})
