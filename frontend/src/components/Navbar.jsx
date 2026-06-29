import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const links = [
  {
    to: '/',
    key: 'navbar.compare',
  },
  {
    to: '/history',
    key: 'navbar.history',
  },
  {
    to: '/statistics',
    key: 'navbar.statistics',
  },
  {
    to: '/about',
    key: 'navbar.about',
  },
]

export default function Navbar() {
  const { t, i18n } = useTranslation()

  return (
    <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur">
      <nav className="mx-auto max-w-7xl px-4 py-4 md:flex md:items-center md:justify-between md:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/icon.png" alt="Application logo" className="h-8 w-8" />

            <span className="hidden lg:block text-xl font-bold tracking-tight">
              {t('navbar.title')}
            </span>
          </div>

          <div className="flex overflow-hidden rounded-lg border md:hidden">
            <button
              onClick={() => i18n.changeLanguage('en')}
              className={`px-3 py-2 text-sm transition ${
                i18n.language === 'en'
                  ? 'bg-slate-900 text-white'
                  : 'hover:bg-slate-100'
              }`}
            >
              EN
            </button>

            <button
              onClick={() => i18n.changeLanguage('pl')}
              className={`px-3 py-2 text-sm transition ${
                i18n.language === 'pl'
                  ? 'bg-slate-900 text-white'
                  : 'hover:bg-slate-100'
              }`}
            >
              PL
            </button>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 md:mt-0 md:flex-nowrap md:gap-6">
          <div className="flex flex-wrap gap-2">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-2 text-sm font-medium whitespace-nowrap transition md:px-4 ${
                    isActive
                      ? 'bg-slate-900 text-white'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`
                }
              >
                {t(link.key)}
              </NavLink>
            ))}
          </div>

          <div className="hidden overflow-hidden rounded-lg border md:flex">
            <button
              onClick={() => i18n.changeLanguage('en')}
              className={`px-3 py-2 text-sm transition ${
                i18n.language === 'en'
                  ? 'bg-slate-900 text-white'
                  : 'hover:bg-slate-100'
              }`}
            >
              EN
            </button>

            <button
              onClick={() => i18n.changeLanguage('pl')}
              className={`px-3 py-2 text-sm transition ${
                i18n.language === 'pl'
                  ? 'bg-slate-900 text-white'
                  : 'hover:bg-slate-100'
              }`}
            >
              PL
            </button>
          </div>
        </div>
      </nav>
    </header>
  )
}
