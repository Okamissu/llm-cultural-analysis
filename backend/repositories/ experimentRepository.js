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

  async delete(id) {
    return prisma.experiment.delete({
      where: {
        id,
      },
    })
  }
}

export default new ExperimentRepository()
