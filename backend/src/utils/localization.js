export function getVisualizationLabels(sourceLanguage, uiLanguage) {
  const translations = {
    pl: {
      prompt: 'Prompt',
      response: 'Odpowiedź',

      polish: 'Polski',
      english: 'Angielski',
    },

    en: {
      prompt: 'Prompt',
      response: 'Response',

      polish: 'Polish',
      english: 'English',
    },
  }

  const t = translations[uiLanguage] ?? translations.en

  const source = sourceLanguage === 'pl' ? t.polish : t.english

  const target = sourceLanguage === 'pl' ? t.english : t.polish

  return [
    `${t.prompt} (${source})`,
    `${t.prompt} (${target})`,
    `${t.response} (${source})`,
    `${t.response} (${target})`,
  ]
}
