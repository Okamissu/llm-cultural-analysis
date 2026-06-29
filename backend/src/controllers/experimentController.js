import ExperimentRepository from '../repositories/experimentRepository.js'
import { ADMIN_PASSWORD } from '../config/config.js'

export async function getExperiments(req, res, next) {
  try {
    const experiments = await ExperimentRepository.findAll()

    res.json(experiments)
  } catch (error) {
    next(error)
  }
}

export async function getExperiment(req, res, next) {
  try {
    const experiment = await ExperimentRepository.findById(
      Number(req.params.id),
    )

    if (!experiment) {
      return res.status(404).json({
        code: 'EXPERIMENT_NOT_FOUND',
      })
    }

    res.json(experiment)
  } catch (error) {
    next(error)
  }
}

export async function deleteExperiment(req, res, next) {
  try {
    const { password } = req.body

    if (password !== ADMIN_PASSWORD) {
      return res.status(401).json({
        code: 'INVALID_PASSWORD',
      })
    }

    await ExperimentRepository.delete(Number(req.params.id))

    res.status(204).send()
  } catch (error) {
    next(error)
  }
}

export async function deleteAllExperiments(req, res, next) {
  try {
    const { password } = req.body

    if (password !== ADMIN_PASSWORD) {
      return res.status(401).json({
        code: 'INVALID_PASSWORD',
      })
    }

    await ExperimentRepository.deleteAll()

    res.status(204).send()
  } catch (error) {
    next(error)
  }
}
