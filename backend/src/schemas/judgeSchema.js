const scoreSchema = {
  type: 'object',

  properties: {
    original: {
      type: 'number',
    },

    translated: {
      type: 'number',
    },
  },

  required: ['original', 'translated'],

  additionalProperties: false,
}

export const judgeSchema = {
  name: 'judge_result',

  schema: {
    type: 'object',

    properties: {
      scores: {
        type: 'object',

        properties: {
          naturalness: scoreSchema,

          precision: scoreSchema,

          detail: scoreSchema,

          culturalContext: scoreSchema,

          tone: scoreSchema,
        },

        required: [
          'naturalness',
          'precision',
          'detail',
          'culturalContext',
          'tone',
        ],

        additionalProperties: false,
      },

      summary: {
        type: 'string',
      },

      observations: {
        type: 'array',

        items: {
          type: 'string',
        },
      },
    },

    required: ['scores', 'summary', 'observations'],

    additionalProperties: false,
  },
}
