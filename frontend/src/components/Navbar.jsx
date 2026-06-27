import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="bg-slate-900 text-white px-8 py-4 flex gap-6">
      <Link to="/">Compare</Link>

      <Link to="/history">History</Link>

      <Link to="/statistics">Statistics</Link>

      <Link to="/about">About</Link>
    </nav>
  )
}

export default Navbar
