export const compare = async (req, res) => {
  const { prompt } = req.body

  res.json({
    success: true,
    prompt,
    answer: 'Backend received the prompt.',
  })
}
