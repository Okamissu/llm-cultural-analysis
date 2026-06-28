import { useTranslation, Trans } from 'react-i18next'

import useDocumentTitle from '../hooks/useDocumentTitle'

export default function About() {
  const { t } = useTranslation()

  useDocumentTitle('pageTitles.about')

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <div>
        <h1 className="text-4xl font-bold">{t('about.title')}</h1>

        <p className="mt-2 text-slate-600">{t('about.description')}</p>
      </div>

      <section className="rounded-2xl bg-white p-8 shadow-sm">
        <h2 className="text-2xl font-bold">{t('about.projectTitle')}</h2>

        <div className="mt-6 space-y-5 leading-8 text-slate-700">
          <p>{t('about.projectParagraph1')}</p>

          <p>{t('about.projectParagraph2')}</p>

          <p>{t('about.projectParagraph3')}</p>
        </div>
      </section>

      <section className="rounded-2xl bg-white p-8 shadow-sm">
        <h2 className="text-2xl font-bold">{t('about.technologies')}</h2>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {[
            'React',
            'React Router',
            'Tailwind CSS',
            'Node.js',
            'Express',
            'Prisma ORM',
            'MySQL',
            'OpenAI API',
          ].map((tech) => (
            <div
              key={tech}
              className="rounded-xl border bg-slate-50 px-4 py-3 font-medium"
            >
              {tech}
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl bg-white p-8 shadow-sm">
        <h2 className="text-2xl font-bold">{t('about.author')}</h2>

        <div className="mt-6 space-y-4 leading-8 text-slate-700">
          <p>
            <strong>{t('about.name')}:</strong> Kamil Kobylarz
          </p>

          <p>
            <strong>{t('about.supervisor')}:</strong> prof. dr hab. Mariusz
            Flasiński
          </p>
        </div>
      </section>

      <section className="rounded-2xl border-l-4 border-slate-800 bg-slate-50 p-8">
        <h2 className="text-2xl font-bold">{t('about.thesis')}</h2>

        <p className="mt-6 leading-8 text-slate-700">
          <Trans i18nKey="about.thesisAuthor" />
        </p>

        <p className="mt-4 leading-8 text-slate-700">
          <Trans i18nKey="about.thesisDescription" />
        </p>
      </section>
    </div>
  )
}
