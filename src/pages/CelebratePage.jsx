import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { startMusic } from '../lib/music'
import FloatingParticles from '../components/FloatingParticles'
import Fireworks from '../components/Fireworks'

const word1 = 'Happy'.split('')
const word2 = 'Birthdayyyy'.split('')

export default function CelebratePage() {
  const navigate = useNavigate()
  const [showReveal, setShowReveal] = useState(false)

  useEffect(() => {
    startMusic()
    const t = setTimeout(() => setShowReveal(true), 200)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-midnight px-6">
      <FloatingParticles count={20} />
      <Fireworks delay={2500} />

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-gold/5 blur-[180px]" />
      </div>

      <div className="relative z-20 text-center flex flex-col items-center gap-8 w-full max-w-md">
        {/* Happy Birthday two-line reveal */}
        <div className="flex flex-col items-center gap-1">
          {showReveal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center gap-1"
            >
              <motion.div
                className="flex flex-col items-center gap-1"
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1 }}
              >
                {/* Word 1: Happy */}
                <div className="flex justify-center">
                  {word1.map((letter, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, y: 30, rotateX: -40 }}
                      animate={{ opacity: 1, y: 0, rotateX: 0 }}
                      transition={{
                        delay: i * 0.05,
                        duration: 0.5,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="text-5xl sm:text-6xl md:text-7xl font-alexBrush text-gold inline-block leading-none"
                      style={{
                        WebkitTextStroke: '0.8px rgba(251, 191, 36, 0.25)',
                        textShadow: '0 0 30px rgba(251,191,36,0.2), 0 0 60px rgba(251,191,36,0.1)',
                      }}
                    >
                      {letter === ' ' ? '\u00A0' : letter}
                    </motion.span>
                  ))}
                </div>
                {/* Word 2: Birthdayyyy */}
                <div className="flex justify-center -mt-2">
                  {word2.map((letter, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, y: 30, rotateX: -40 }}
                      animate={{ opacity: 1, y: 0, rotateX: 0 }}
                      transition={{
                        delay: 0.6 + i * 0.04,
                        duration: 0.5,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="text-5xl sm:text-6xl md:text-7xl font-alexBrush text-gold inline-block leading-none"
                      style={{
                        WebkitTextStroke: '0.8px rgba(251, 191, 36, 0.25)',
                        textShadow: '0 0 30px rgba(251,191,36,0.2), 0 0 60px rgba(251,191,36,0.1)',
                      }}
                    >
                      {letter}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </div>

        {/* Subtitle: My loaf */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="flex flex-col items-center gap-3"
        >
          <motion.div
            animate={{
              scale: [1, 1.15, 1],
              rotate: [0, -5, 5, -3, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
              repeatDelay: 1,
            }}
            className="relative text-5xl"
          >
            <span className="relative inline-block">
              🍞
              <motion.span
                className="absolute -top-2 -right-4 text-sm"
                animate={{ y: [-5, -12, -5], opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
              >
                💕
              </motion.span>
              <motion.span
                className="absolute -bottom-1 -left-5 text-xs"
                animate={{ y: [-3, -10, -3], opacity: [0, 0.7, 0], scale: [0.3, 0.8, 0.3] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: 0.8 }}
              >
                💕
              </motion.span>
            </span>
          </motion.div>
          <p className="text-white/50 text-lg sm:text-xl font-dancing">
            My loaf
          </p>
        </motion.div>

        {/* Continue button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.5 }}
          whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(251, 191, 36, 0.2)' }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/wish')}
          className="px-10 py-3 border border-gold/30 text-gold rounded-full text-sm tracking-widest uppercase hover:bg-gold/10 transition-colors"
        >
          Continue
        </motion.button>
      </div>
    </div>
  )
}
