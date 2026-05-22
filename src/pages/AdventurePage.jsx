import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import FloatingParticles from '../components/FloatingParticles'

export default function AdventurePage() {
  const navigate = useNavigate()

  const navButtons = [
    { label: 'Spin to Win', path: '/spin' },
    { label: 'Birthday Wishes', path: '/wishes' },
    { label: 'Gallery', path: '/gallery' },
  ]

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-midnight px-6">
      <FloatingParticles count={30} />

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-violet/8 blur-[150px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-20 text-center flex flex-col items-center gap-8 w-full max-w-md"
      >
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-2xl sm:text-3xl font-cinzel font-bold text-gold mb-2"
        >
          Choose Your Adventure
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-champagne/60 text-lg sm:text-xl font-dancing font-bold -mt-2"
        >
          The celebration awaits...
        </motion.p>

        <div className="flex flex-col gap-4 items-center pt-4 w-full">
          {navButtons.map((btn, i) => (
            <motion.button
              key={btn.path}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 + i * 0.15, duration: 0.5 }}
              whileHover={{ scale: 1.03, boxShadow: '0 0 30px rgba(201, 169, 110, 0.2)' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(btn.path)}
              className="w-full sm:w-72 px-8 py-4 border border-champagne/30 text-champagne font-inter font-medium text-base rounded-full tracking-wider transition-colors hover:bg-champagne/10"
            >
              {btn.label}
            </motion.button>
          ))}

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/ending')}
            className="text-white/20 text-xs mt-3 hover:text-white/40 transition-colors tracking-wider uppercase"
          >
            Finish
          </motion.button>
        </div>
      </motion.div>
    </div>
  )
}
