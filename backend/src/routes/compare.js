import express from 'express'
import { compare } from '../controllers/compareController.js'

const router = express.Router()

router.post('/', compare)

export default router
