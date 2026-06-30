import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import path from 'path'
import { fileURLToPath } from 'url'

import compareRoutes from './routes/compare.js'
import experimentRoutes from './routes/experiment.js'
import statisticsRoutes from './routes/statistics.js'
import errorHandler from './middlewares/errorHandler.js'

import { PORT } from './config/config.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

app.use(express.static(path.join(__dirname, '../public')))

// app.get('/', (req, res) => {
//   res.json({
//     message: 'API works!',
//   })
// })

app.use('/api/compare', compareRoutes)
app.use('/api/experiments', experimentRoutes)
app.use('/api/statistics', statisticsRoutes)

app.use((req, res, next) => {
  if (req.path.startsWith('/api')) {
    return next()
  }

  res.sendFile(path.join(__dirname, '../public/index.html'))
})

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
