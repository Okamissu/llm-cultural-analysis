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
      <nav className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 md:flex-row md:items-center md:justify-between md:px-8">
        <h1 className="flex items-center gap-2 text-xl font-bold tracking-tight">
          <img src="/icon.png" alt="Application logo" className="h-7 w-7" />

          <span className="hidden lg:inline">{t('navbar.title')}</span>
        </h1>

        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <div className="flex flex-wrap justify-center gap-2 md:justify-start">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `rounded-lg px-4 py-2 text-sm font-medium whitespace-nowrap transition ${
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

          <div className="ml-auto flex overflow-hidden rounded-lg border">
            <button
              onClick={() => i18n.changeLanguage('en')}
              className={`px-3 py-2 text-sm ${
                i18n.language === 'en'
                  ? 'bg-slate-900 text-white'
                  : 'bg-white hover:bg-slate-100'
              }`}
            >
              EN
            </button>

            <button
              onClick={() => i18n.changeLanguage('pl')}
              className={`px-3 py-2 text-sm ${
                i18n.language === 'pl'
                  ? 'bg-slate-900 text-white'
                  : 'bg-white hover:bg-slate-100'
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
