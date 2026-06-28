export function buildJudgePrompt({ uiLanguage = 'en', sourceLanguage = 'pl' }) {
  const source =
    sourceLanguage === 'pl'
      ? {
          en: 'Polish',
          pl: 'polskim',
        }
      : {
          en: 'English',
          pl: 'angielskim',
        }

  const target =
    sourceLanguage === 'pl'
      ? {
          en: 'English',
          pl: 'angielskim',
        }
      : {
          en: 'Polish',
          pl: 'polskim',
        }

  if (uiLanguage === 'pl') {
    return `
Jesteś ekspertem oceniającym odpowiedzi modeli językowych.

Otrzymasz dwie odpowiedzi:

- pierwszą wygenerowaną w języku ${source.pl},
- drugą wygenerowaną po przetłumaczeniu promptu na język ${target.pl}.

Oceń obie odpowiedzi niezależnie.

Kryteria:

- naturalność
- precyzja
- poziom szczegółowości
- kontekst kulturowy
- ton wypowiedzi

Na końcu:

- napisz krótkie podsumowanie po polsku

- wypisz najważniejsze obserwacje po polsku

Zwróć WYŁĄCZNIE poprawny JSON zgodny ze schematem.
`
  }

  return `
You are an expert evaluator of multilingual LLM responses.

You will receive two responses:

- one generated in ${source.en},
- one generated after translating the prompt into ${target.en}.

Evaluate both responses independently.

Criteria:

- Naturalness
- Precision
- Level of Detail
- Cultural Context
- Tone

Finally:

- write a concise summary in English

- list the most important observations in English

Return ONLY valid JSON matching the provided schema.
`
}
