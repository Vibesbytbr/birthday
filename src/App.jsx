import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import LandingPage from './pages/LandingPage'
import CelebratePage from './pages/CelebratePage'
import WishPage from './pages/WishPage'
import AdventurePage from './pages/AdventurePage'
import SpinPage from './pages/SpinPage'
import WishesPage from './pages/WishesPage'
import GalleryPage from './pages/GalleryPage'
import EndingPage from './pages/EndingPage'

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/celebrate" element={<CelebratePage />} />
        <Route path="/wish" element={<WishPage />} />
        <Route path="/adventure" element={<AdventurePage />} />
        <Route path="/spin" element={<SpinPage />} />
        <Route path="/wishes" element={<WishesPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/ending" element={<EndingPage />} />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  )
}
