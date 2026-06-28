import prisma from '../lib/prisma.js'

const criteria = [
  'naturalness',
  'precision',
  'detail',
  'culturalContext',
  'tone',
]

class StatisticsRepository {
  async getStatistics() {
    const experiments = await prisma.experiment.findMany({
      include: {
        evaluation: true,
      },
    })

    const statistics = {
      totalExperiments: experiments.length,

      languages: {
        PL_EN: 0,
        EN_PL: 0,
      },

      culturalPrompting: {
        enabled: 0,
        disabled: 0,
      },

      similarity: {
        promptAverage: 0,
        responseAverage: 0,

        promptMin: 0,
        promptMax: 0,

        responseMin: 0,
        responseMax: 0,
      },

      judge: {
        pl: {},
        en: {},
      },

      difference: {},

      temperatures: [],

      bestPromptSimilarity: null,
      worstPromptSimilarity: null,

      bestResponseSimilarity: null,
      worstResponseSimilarity: null,
    }

    if (experiments.length === 0) {
      return statistics
    }

    const judgeTotals = {
      pl: {},
      en: {},
    }

    const judgeCounts = {
      pl: 0,
      en: 0,
    }

    for (const criterion of criteria) {
      judgeTotals.pl[criterion] = 0
      judgeTotals.en[criterion] = 0
    }

    let promptSum = 0
    let responseSum = 0

    statistics.similarity.promptMin = Infinity
    statistics.similarity.promptMax = -Infinity

    statistics.similarity.responseMin = Infinity
    statistics.similarity.responseMax = -Infinity

    for (const experiment of experiments) {
      const direction = `${experiment.sourceLanguage}_${experiment.targetLanguage}`

      if (direction in statistics.languages) {
        statistics.languages[direction]++
      }

      if (experiment.culturalPrompting) statistics.culturalPrompting.enabled++
      else statistics.culturalPrompting.disabled++

      const promptSimilarity = Number(experiment.promptSimilarity)
      const responseSimilarity = Number(experiment.responseSimilarity)

      promptSum += promptSimilarity
      responseSum += responseSimilarity

      statistics.similarity.promptMin = Math.min(
        statistics.similarity.promptMin,
        promptSimilarity,
      )

      statistics.similarity.promptMax = Math.max(
        statistics.similarity.promptMax,
        promptSimilarity,
      )

      statistics.similarity.responseMin = Math.min(
        statistics.similarity.responseMin,
        responseSimilarity,
      )

      statistics.similarity.responseMax = Math.max(
        statistics.similarity.responseMax,
        responseSimilarity,
      )

      if (
        !statistics.bestPromptSimilarity ||
        promptSimilarity > statistics.bestPromptSimilarity.value
      ) {
        statistics.bestPromptSimilarity = {
          id: experiment.id,
          value: promptSimilarity,
        }
      }

      if (
        !statistics.worstPromptSimilarity ||
        promptSimilarity < statistics.worstPromptSimilarity.value
      ) {
        statistics.worstPromptSimilarity = {
          id: experiment.id,
          value: promptSimilarity,
        }
      }

      if (
        !statistics.bestResponseSimilarity ||
        responseSimilarity > statistics.bestResponseSimilarity.value
      ) {
        statistics.bestResponseSimilarity = {
          id: experiment.id,
          value: responseSimilarity,
        }
      }

      if (
        !statistics.worstResponseSimilarity ||
        responseSimilarity < statistics.worstResponseSimilarity.value
      ) {
        statistics.worstResponseSimilarity = {
          id: experiment.id,
          value: responseSimilarity,
        }
      }

      statistics.temperatures.push(Number(experiment.temperature))

      const evaluation = experiment.evaluation

      if (!evaluation) continue

      if (experiment.sourceLanguage === 'PL') {
        judgeCounts.pl++
        judgeCounts.en++

        judgeTotals.pl.naturalness += Number(evaluation.naturalnessOriginal)
        judgeTotals.en.naturalness += Number(evaluation.naturalnessTranslated)

        judgeTotals.pl.precision += Number(evaluation.precisionOriginal)
        judgeTotals.en.precision += Number(evaluation.precisionTranslated)

        judgeTotals.pl.detail += Number(evaluation.detailOriginal)
        judgeTotals.en.detail += Number(evaluation.detailTranslated)

        judgeTotals.pl.culturalContext += Number(
          evaluation.culturalContextOriginal,
        )

        judgeTotals.en.culturalContext += Number(
          evaluation.culturalContextTranslated,
        )

        judgeTotals.pl.tone += Number(evaluation.toneOriginal)
        judgeTotals.en.tone += Number(evaluation.toneTranslated)
      } else {
        judgeCounts.en++
        judgeCounts.pl++

        judgeTotals.en.naturalness += Number(evaluation.naturalnessOriginal)
        judgeTotals.pl.naturalness += Number(evaluation.naturalnessTranslated)

        judgeTotals.en.precision += Number(evaluation.precisionOriginal)
        judgeTotals.pl.precision += Number(evaluation.precisionTranslated)

        judgeTotals.en.detail += Number(evaluation.detailOriginal)
        judgeTotals.pl.detail += Number(evaluation.detailTranslated)

        judgeTotals.en.culturalContext += Number(
          evaluation.culturalContextOriginal,
        )

        judgeTotals.pl.culturalContext += Number(
          evaluation.culturalContextTranslated,
        )

        judgeTotals.en.tone += Number(evaluation.toneOriginal)
        judgeTotals.pl.tone += Number(evaluation.toneTranslated)
      }
    }

    statistics.similarity.promptAverage = round(promptSum / experiments.length)

    statistics.similarity.responseAverage = round(
      responseSum / experiments.length,
    )

    statistics.similarity.promptMin = round(statistics.similarity.promptMin)

    statistics.similarity.promptMax = round(statistics.similarity.promptMax)

    statistics.similarity.responseMin = round(statistics.similarity.responseMin)

    statistics.similarity.responseMax = round(statistics.similarity.responseMax)

    statistics.bestPromptSimilarity.value = round(
      statistics.bestPromptSimilarity.value,
    )

    statistics.worstPromptSimilarity.value = round(
      statistics.worstPromptSimilarity.value,
    )

    statistics.bestResponseSimilarity.value = round(
      statistics.bestResponseSimilarity.value,
    )

    statistics.worstResponseSimilarity.value = round(
      statistics.worstResponseSimilarity.value,
    )

    for (const criterion of criteria) {
      statistics.judge.pl[criterion] = round(
        judgeTotals.pl[criterion] / judgeCounts.pl,
        2,
      )

      statistics.judge.en[criterion] = round(
        judgeTotals.en[criterion] / judgeCounts.en,
        2,
      )

      statistics.difference[criterion] = round(
        statistics.judge.pl[criterion] - statistics.judge.en[criterion],
        2,
      )
    }

    return statistics
  }
}

function round(value, digits = 3) {
  return Number(value.toFixed(digits))
}

export default new StatisticsRepository()
