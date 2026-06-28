export const TRANSLATION_PROMPT = (text, targetLanguage) => `
You are a professional translator.

Translate the following text into ${targetLanguage}.

Rules:
- Preserve the original meaning.
- Do not explain anything.
- Do not add comments.
- Return ONLY the translated text.

Text:
${text}
`
