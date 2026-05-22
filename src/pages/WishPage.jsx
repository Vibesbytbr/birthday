import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import Candle from '../components/Candle'
import FloatingParticles from '../components/FloatingParticles'

export default function WishPage() {
  const navigate = useNavigate()
  const [blown, setBlown] = useState(false)
  const [exiting, setExiting] = useState(false)

  const handleBlow = useCallback(() => {
    setBlown(true)
    setTimeout(() => {
      setExiting(true)
      setTimeout(() => navigate('/adventure'), 1800)
    }, 2500)
  }, [navigate])

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-midnight px-6">
      <FloatingParticles count={20} />

      {/* Spotlight background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-gold/8 blur-[120px]" />
      </div>

      <AnimatePresence mode="wait">
        {!exiting ? (
          <motion.div
            key="wish"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05, filter: 'blur(8px)' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-20 flex flex-col items-center gap-8"
          >
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-white/30 text-xs tracking-widest uppercase"
            >
              Now...
            </motion.p>

            <Candle onBlow={handleBlow} />

            {blown && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-white/20 text-xs tracking-wider uppercase"
              >
                Your fate awaits...
              </motion.p>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="exit"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="text-champagne/30 font-dancing text-2xl"
          >
            Your wish has been sent...
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
