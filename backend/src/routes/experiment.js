import express from 'express'

import {
  getExperiments,
  getExperiment,
  deleteExperiment,
  deleteAllExperiments,
  exportExperiments,
} from '../controllers/experimentController.js'

const router = express.Router()

router.get('/', getExperiments)

router.get('/export', exportExperiments)

router.get('/:id', getExperiment)

router.delete('/:id', deleteExperiment)

router.delete('/', deleteAllExperiments)

export default router
