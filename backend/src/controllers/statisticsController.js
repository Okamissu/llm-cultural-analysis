import StatisticsRepository from '../repositories/statisticsRepository.js'

export async function getStatistics(req, res) {
  try {
    const statistics = await StatisticsRepository.getStatistics()

    res.json(statistics)
  } catch (error) {
    next(error)
  }
}
