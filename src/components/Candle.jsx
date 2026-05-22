import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Candle({ onBlow }) {
  const [blown, setBlown] = useState(false)

  const handleBlow = () => {
    if (blown) return
    setBlown(true)
    setTimeout(() => onBlow?.(), 600)
  }

  return (
    <div className="relative flex flex-col items-center justify-center select-none">
      {/* Spotlight */}
      <div className="absolute w-[300px] h-[300px] rounded-full bg-gold/10 blur-[80px] -top-20" />

      <div className="relative flex flex-col items-center cursor-pointer" onClick={handleBlow}>
        {/* Wick */}
        <motion.div
          className="w-0.5 h-5 bg-gray-400 rounded-full"
          style={{ originX: 0.5, originY: 0 }}
          animate={blown ? { scaleY: 0.6, opacity: 0.5 } : {}}
          transition={{ duration: 0.3 }}
        />

        {/* Flame */}
        <AnimatePresence>
          {!blown ? (
            <motion.div
              key="flame"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.3, opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="absolute -top-1"
            >
              <motion.div
                animate={{
                  scale: [1, 1.08, 0.95, 1.05, 1],
                  opacity: [1, 0.9, 1, 0.85, 1],
                }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                className="relative"
              >
                {/* Outer glow */}
                <div className="absolute -inset-5 rounded-full bg-orange-400/20 blur-xl" />
                {/* Flame shape */}
                <div
                  className="w-7 h-10 rounded-t-full rounded-b-sm"
                  style={{
                    background: 'linear-gradient(180deg, #FFD700 0%, #FF8C00 40%, #FF4500 100%)',
                    boxShadow: '0 0 20px rgba(255, 140, 0, 0.6), 0 0 40px rgba(255, 69, 0, 0.3)',
                    clipPath: 'ellipse(50% 100% at 50% 100%)',
                  }}
                />
                {/* Inner bright spot */}
                <div className="absolute top-1 left-1/2 -translate-x-1/2 w-2 h-3 rounded-full bg-white/60 blur-[1px]" />
              </motion.div>
            </motion.div>
          ) : (
            /* Smoke puffs */
            <motion.div
              key="smoke"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute -top-2"
            >
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0.3, opacity: 0.6, x: 0, y: 0 }}
                  animate={{
                    scale: [0.5, 1.5, 2],
                    opacity: [0.5, 0.2, 0],
                    x: (i - 1.5) * 20,
                    y: -20 - i * 10,
                  }}
                  transition={{ duration: 0.8, delay: i * 0.08, ease: 'easeOut' }}
                  className="absolute w-4 h-4 rounded-full bg-white/30 blur-md"
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Candle body */}
        <motion.div
          className="relative mt-1"
          animate={blown ? { rotate: [0, -2, 2, -1, 0] } : {}}
          transition={{ duration: 0.5 }}
        >
          <div
            className="w-10 h-24 rounded-sm rounded-b-lg relative overflow-hidden"
            style={{
              background: 'linear-gradient(180deg, #FFF8E7 0%, #F5E6C8 50%, #EDD9B0 100%)',
              boxShadow: 'inset 0 0 15px rgba(0,0,0,0.1), 0 4px 15px rgba(0,0,0,0.2)',
            }}
          >
            {/* Wax drip */}
            <div className="absolute left-1 top-3 w-2 h-6 rounded-full bg-[#F5E6C8] opacity-60" />
            <div className="absolute right-2 top-6 w-1.5 h-4 rounded-full bg-[#F5E6C8] opacity-40" />
            {/* Candle stripes */}
            <div className="absolute bottom-3 left-0 right-0 h-0.5 bg-[#EDD9B0]" />
            <div className="absolute bottom-6 left-0 right-0 h-0.5 bg-[#EDD9B0]" />
          </div>
        </motion.div>

        {/* Plate */}
        <div className="w-16 h-3 rounded-full bg-gradient-to-b from-champagne/30 to-transparent -mt-1" />
      </div>

      {/* Text */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: blown ? 0.3 : 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="text-champagne/80 text-lg sm:text-xl font-dancing font-bold mt-6 text-center"
      >
        {blown
          ? 'Your wish has been sent...'
          : 'Make a wish, tap the flame to blow your candle'
        }
      </motion.p>
    </div>
  )
}
