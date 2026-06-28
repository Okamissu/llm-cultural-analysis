import express from 'express'

import {
  getExperiments,
  getExperiment,
  deleteExperiment,
  deleteAllExperiments,
} from '../controllers/experimentController.js'

const router = express.Router()

router.get('/', getExperiments)

router.get('/:id', getExperiment)

router.delete('/:id', deleteExperiment)

router.delete('/', deleteAllExperiments)

export default router
