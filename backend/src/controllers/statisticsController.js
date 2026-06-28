import StatisticsRepository from '../repositories/statisticsRepository.js'

export async function getStatistics(req, res) {
  try {
    const statistics = await StatisticsRepository.getStatistics()

    res.json(statistics)
  } catch (error) {
    console.error(error)

    res.status(500).json({
      success: false,
      error: error.message,
    })
  }
}
