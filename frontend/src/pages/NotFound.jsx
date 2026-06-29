import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import useDocumentTitle from '../hooks/useDocumentTitle'

export default function NotFound() {
  const { t } = useTranslation()

  useDocumentTitle('pageTitles.notFound')

  return (
    <div className="mx-auto max-w-2xl rounded-2xl bg-white p-12 text-center shadow-sm">
      <div className="text-7xl font-bold text-slate-300">404</div>

      <h1 className="mt-4 text-3xl font-bold">{t('notFound.title')}</h1>

      <p className="mt-3 text-slate-500">{t('notFound.description')}</p>

      <Link
        to="/"
        className="mt-8 inline-flex rounded-xl bg-slate-900 px-5 py-3 text-white transition hover:bg-slate-800"
      >
        {t('notFound.home')}
      </Link>
    </div>
  )
}
