import prisma from '../lib/prisma.js'

class ExperimentRepository {
  async save(data) {
    return prisma.experiment.create({
      data,

      include: {
        prompts: true,
        responses: true,
        evaluation: true,
      },
    })
  }

  async findAll() {
    return prisma.experiment.findMany({
      orderBy: {
        createdAt: 'desc',
      },

      select: {
        id: true,
        createdAt: true,

        sourceLanguage: true,
        targetLanguage: true,

        llmModel: true,

        temperature: true,
        culturalPrompting: true,

        promptSimilarity: true,
        responseSimilarity: true,

        prompts: {
          where: {
            promptType: 'ORIGINAL',
          },

          select: {
            content: true,
          },

          take: 1,
        },
      },
    })
  }

  async findById(id) {
    return prisma.experiment.findUnique({
      where: {
        id,
      },

      include: {
        prompts: true,
        responses: true,
        evaluation: true,
      },
    })
  }

  async findAllWithRelations() {
    return prisma.experiment.findMany({
      orderBy: {
        createdAt: 'desc',
      },

      include: {
        prompts: true,
        responses: true,
        evaluation: true,
      },
    })
  }

  async delete(id) {
    return prisma.experiment.delete({
      where: {
        id,
      },
    })
  }

  async deleteAll() {
    return prisma.experiment.deleteMany()
  }

  async exportAll() {
    return prisma.experiment.findMany({
      include: {
        prompts: true,
        responses: true,
        evaluation: true,
      },
      orderBy: {
        id: 'asc',
      },
    })
  }
}

export default new ExperimentRepository()
