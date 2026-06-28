import { NavLink } from 'react-router-dom'

const links = [
  {
    to: '/',
    label: 'Compare',
  },
  {
    to: '/history',
    label: 'History',
  },
  {
    to: '/statistics',
    label: 'Statistics',
  },
  {
    to: '/about',
    label: 'About',
  },
]

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-8 py-4">
        <h1 className="text-xl font-bold tracking-tight">
          LLM Cultural Analysis
        </h1>

        <div className="flex gap-2">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `rounded-lg px-4 py-2 text-sm font-medium transition ${
                  isActive
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-600 hover:bg-slate-100'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      </nav>
    </header>
  )
}
