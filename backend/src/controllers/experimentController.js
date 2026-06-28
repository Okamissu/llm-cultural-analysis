import ExperimentRepository from '../repositories/experimentRepository.js'
import { ADMIN_PASSWORD } from '../config/config.js'

export async function getExperiments(req, res) {
  try {
    const experiments = await ExperimentRepository.findAll()

    res.json(experiments)
  } catch (error) {
    console.error(error)

    res.status(500).json({
      success: false,
      error: error.message,
    })
  }
}

export async function getExperiment(req, res) {
  try {
    const experiment = await ExperimentRepository.findById(
      Number(req.params.id),
    )

    if (!experiment) {
      return res.status(404).json({
        success: false,
        error: 'Experiment not found',
      })
    }

    res.json(experiment)
  } catch (error) {
    console.error(error)

    res.status(500).json({
      success: false,
      error: error.message,
    })
  }
}

export async function deleteExperiment(req, res) {
  try {
    const { password } = req.body

    if (password !== ADMIN_PASSWORD) {
      return res.status(401).json({
        success: false,
        error: 'Invalid password',
      })
    }

    await ExperimentRepository.delete(Number(req.params.id))

    res.status(204).send()
  } catch (error) {
    console.error(error)

    res.status(500).json({
      success: false,
      error: error.message,
    })
  }
}

export async function deleteAllExperiments(req, res) {
  try {
    const { password } = req.body

    if (password !== ADMIN_PASSWORD) {
      return res.status(401).json({
        success: false,
        error: 'Invalid password',
      })
    }

    await ExperimentRepository.deleteAll()

    res.status(204).send()
  } catch (error) {
    console.error(error)

    res.status(500).json({
      success: false,
      error: error.message,
    })
  }
}
