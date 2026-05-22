import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import confetti from 'canvas-confetti'

export default function EndingPage() {
  const navigate = useNavigate()

  useEffect(() => {
    const end = Date.now() + 2000
    const frame = () => {
      confetti({
        particleCount: 1,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.6 },
        colors: ['#F4B942', '#C9A96E', '#FBBF24', '#FF8A3D'],
        gravity: 0.8,
        scalar: 0.6,
      })
      confetti({
        particleCount: 1,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.6 },
        colors: ['#F4B942', '#C9A96E', '#FBBF24', '#FF8A3D'],
        gravity: 0.8,
        scalar: 0.6,
      })
      if (Date.now() < end) requestAnimationFrame(frame)
    }
    frame()
  }, [])

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-midnight px-6">
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 z-30 text-white/30 hover:text-white/60 transition-colors text-xs tracking-wider uppercase"
      >
        &larr; Back
      </motion.button>

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-violet/10 blur-[150px]" />
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full bg-gold/30"
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: `${60 + Math.random() * 30}%`,
            }}
            animate={{
              y: [0, -80, -160],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 4,
              ease: 'easeOut',
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="relative z-20 text-center max-w-lg"
      >
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-7xl mb-8"
        >
          <motion.span
            className="inline-block text-gold"
            animate={{
              scale: [1, 1.08, 1],
              filter: ['brightness(1)', 'brightness(1.3)', 'brightness(1)'],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            &#9733;
          </motion.span>
        </motion.div>

        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-4xl sm:text-6xl font-cinzel font-bold text-glow-gold text-gold mb-6"
        >
          Happy Birthday
        </motion.h1>

        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="text-white/50 text-xl font-dancing leading-relaxed mb-8"
        >
          Thank you for all the beautiful memories.
          <br />
          Here is to many more.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="text-white/20 text-xs tracking-widest uppercase"
        >
          Made with love by your family
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5 }}
          whileHover={{ scale: 1.03, boxShadow: '0 0 30px rgba(201, 169, 110, 0.2)' }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/')}
          className="mt-10 px-8 py-3 border border-champagne/30 text-champagne rounded-full text-sm tracking-wider hover:bg-champagne/10 transition-colors"
        >
          Start Over
        </motion.button>
      </motion.div>
    </div>
  )
}
