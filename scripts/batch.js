import fs from 'node:fs/promises'

const start = Date.now()

const CONFIG = {
  apiUrl: 'http://localhost:3000/api/compare',

  uiLanguage: 'en',

  temperatures: [0.2, 0.7, 1.0],

  culturalPrompting: [false, true],

  delay: 300,

  retries: 3,
}

const prompts = JSON.parse(
  await fs.readFile(new URL('./prompts.json', import.meta.url), 'utf8'),
)

const jobs = []

for (const prompt of prompts) {
  for (const culturalPrompting of CONFIG.culturalPrompting) {
    for (const temperature of CONFIG.temperatures) {
      jobs.push({
        prompt,
        sourceLanguage: prompt.language,
        culturalPrompting,
        temperature,
      })
    }
  }
}

console.log(`\nRunning ${jobs.length} experiments...\n`)

let success = 0
let failed = 0

const failedJobs = []

for (let i = 0; i < jobs.length; i++) {
  const job = jobs[i]

  console.log('────────────────────────────────────')
  console.log(`[${i + 1}/${jobs.length}]`)
  console.log(`Category     : ${job.prompt.category}`)
  console.log(`Prompt ID    : ${job.prompt.id}`)
  console.log(`Language     : ${job.sourceLanguage}`)
  console.log(`Prompting    : ${job.culturalPrompting ? 'ON' : 'OFF'}`)
  console.log(`Temperature  : ${job.temperature}`)

  const ok = await execute(job)

  if (ok) {
    success++
    console.log('✔ Success')
  } else {
    failed++
    failedJobs.push(job)
    console.log('✖ Failed')
  }

  await sleep(CONFIG.delay)
}

console.log('\n====================================')
console.log('Finished')
console.log(`Successful : ${success}`)
console.log(`Failed     : ${failed}`)

if (failedJobs.length) {
  console.log('\nFailed experiments:')

  failedJobs.forEach((job) => {
    console.log(
      `Prompt ${job.prompt.id} | ${job.sourceLanguage} | ${
        job.culturalPrompting ? 'ON' : 'OFF'
      } | T=${job.temperature}`,
    )
  })
}

console.log('====================================')

async function execute(job) {
  for (let attempt = 1; attempt <= CONFIG.retries; attempt++) {
    try {
      const response = await fetch(CONFIG.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: job.prompt.prompt,
          sourceLanguage: job.sourceLanguage,
          uiLanguage: CONFIG.uiLanguage,
          culturalPrompting: job.culturalPrompting,
          temperature: job.temperature,
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`)
      }

      return true
    } catch (error) {
      console.log(`Retry ${attempt}/${CONFIG.retries}`)

      if (attempt === CONFIG.retries) {
        console.error(error.message)
        return false
      }

      await sleep(2000)
    }
  }
}

const seconds = Math.round((Date.now() - start) / 1000)

console.log(`Time: ${seconds}s`)

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
