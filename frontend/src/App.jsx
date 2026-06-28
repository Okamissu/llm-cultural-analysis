import { Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar'

import Compare from './pages/Compare'
import History from './pages/History'
import Statistics from './pages/Statistics'
import About from './pages/About'
import ExperimentDetails from './pages/ExperimentDetails'

function App() {
  return (
    <>
      <Navbar />

      <main className="mx-auto max-w-6xl p-8">
        <Routes>
          <Route path="/" element={<Compare />} />

          <Route path="/history" element={<History />} />
          <Route path="/history/:id" element={<ExperimentDetails />} />

          <Route path="/statistics" element={<Statistics />} />

          <Route path="/about" element={<About />} />
        </Routes>
      </main>
    </>
  )
}

export default App
