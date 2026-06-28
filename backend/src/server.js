import express from 'express'
import cors from 'cors'
import morgan from 'morgan'

import compareRoutes from './routes/compare.js'
import experimentRoutes from './routes/experiment.js'
import { PORT } from './config/config.js'

const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

app.get('/', (req, res) => {
  res.json({
    message: 'API works!',
  })
})

app.use('/api/compare', compareRoutes)
app.use('/api/experiments', experimentRoutes)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
