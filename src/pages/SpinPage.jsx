import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import SpinningWheel from '../components/SpinningWheel'

export default function SpinPage() {
  const navigate = useNavigate()

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-midnight px-4 py-12">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-violet/10 blur-[120px]" />
      </div>

      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 z-30 text-white/30 hover:text-white/60 transition-colors text-xs tracking-wider uppercase"
      >
        &larr; Back
      </motion.button>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-20 text-center space-y-4"
      >
        <h1 className="text-3xl sm:text-4xl font-cinzel font-bold text-gold">
          Spin to Win
        </h1>
        <p className="text-champagne/60 text-lg sm:text-xl font-dancing font-bold">
          What fate has in store for you
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-20 mt-8"
      >
        <SpinningWheel />
      </motion.div>
    </div>
  )
}
