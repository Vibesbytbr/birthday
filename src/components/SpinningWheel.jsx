import { useState, useCallback, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import { prizes } from '../data/wheelPrizes'

const SEGMENT_COUNT = 8
const SEGMENT_ANGLE = 360 / SEGMENT_COUNT
const COLORS = [
  '#1A1A2E', '#2D1B4E', '#1A1A2E', '#3D2466',
  '#1A1A2E', '#2D1B4E', '#1A1A2E', '#3D2466',
]

function getRotation(index) {
  const base = SEGMENT_ANGLE * index + SEGMENT_ANGLE / 2
  return 360 - base
}

export default function SpinningWheel() {
  const navigate = useNavigate()
  const [spinning, setSpinning] = useState(false)
  const [prize, setPrize] = useState(null)
  const [accepted, setAccepted] = useState(false)
  const [rotation, setRotation] = useState(0)
  const rotationRef = useRef(0)

  const spin = useCallback(() => {
    if (spinning) return

    const prizeIndex = Math.floor(Math.random() * SEGMENT_COUNT)
    const targetAngle = getRotation(prizeIndex)
    const fullSpins = 6 * 360
    const currentMod = ((rotationRef.current % 360) + 360) % 360
    const delta = ((targetAngle - currentMod) + 360) % 360
    const totalRotation = rotationRef.current + fullSpins + delta

    rotationRef.current = totalRotation
    setPrize(null)
    setSpinning(true)
    setRotation(totalRotation)

    setTimeout(() => {
      setPrize(prizes[prizeIndex])
      setSpinning(false)
    }, 5000)
  }, [spinning])

  useEffect(() => {
    if (!accepted) return
    const end = Date.now() + 1500
    const frame = () => {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.6 },
        colors: ['#F4B942', '#C9A96E', '#FBBF24'],
      })
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.6 },
        colors: ['#F4B942', '#C9A96E', '#FBBF24'],
      })
      if (Date.now() < end) requestAnimationFrame(frame)
    }
    frame()
  }, [accepted])

  const handleAccept = () => {
    setAccepted(true)
  }

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="relative w-72 h-72 sm:w-80 sm:h-80">
        {/* Needle */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 z-20">
          <div className="w-0 h-0 border-l-[14px] border-r-[14px] border-t-[28px] border-l-transparent border-r-transparent border-t-gold drop-shadow-lg" />
        </div>

        {/* Wheel */}
        <motion.div
          className="w-full h-full rounded-full overflow-hidden relative shadow-2xl"
          style={{
            background: `conic-gradient(${prizes.map((s, i) =>
              `${COLORS[i]} ${i * SEGMENT_ANGLE}deg ${(i + 1) * SEGMENT_ANGLE}deg`
            ).join(', ')})`,
            boxShadow: '0 0 60px rgba(201, 169, 110, 0.1), inset 0 0 60px rgba(0,0,0,0.3)',
          }}
          animate={{ rotate: rotation }}
          transition={{ duration: 5, ease: [0.12, 0.8, 0.3, 1] }}
        >
          {prizes.map((seg, i) => {
            const midAngle = SEGMENT_ANGLE * (i + 0.5)
            const rad = (midAngle * Math.PI) / 180
            const r = 30
            const x = 50 + r * Math.cos(rad)
            const y = 50 + r * Math.sin(rad)
            return (
              <span
                key={seg.id}
                className="absolute flex items-center justify-center w-9 h-9 rounded-full bg-black/40 border border-gold/40 text-gold font-bold drop-shadow-lg text-center pointer-events-none leading-none"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  transform: `translate(-50%, -50%) rotate(${midAngle}deg)`,
                  fontSize: '15px',
                }}
              >
                {seg.id}
              </span>
            )
          })}
        </motion.div>

        {/* Center circle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-midnight border-2 border-gold z-10 flex items-center justify-center">
          <span className="text-gold text-lg">&#9733;</span>
        </div>
      </div>

      <motion.button
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.03, boxShadow: '0 0 30px rgba(201, 169, 110, 0.3)' }}
        onClick={spin}
        disabled={spinning}
        className="px-10 py-4 bg-gradient-to-r from-champagne to-gold text-midnight font-semibold text-lg rounded-full shadow-lg disabled:opacity-40 tracking-wide"
      >
        {spinning ? 'Spinning...' : 'Spin to Win'}
      </motion.button>

      <AnimatePresence>
        {prize && !accepted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 20, stiffness: 200 }}
              className="bg-surface border border-champagne/20 rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl"
              style={{ boxShadow: '0 0 60px rgba(201, 169, 110, 0.08)' }}
            >
              <div className="text-5xl mb-4 text-gold">&#9733;</div>
              <h3 className="text-2xl font-cinzel font-bold text-gold mb-2">Your Prize</h3>
              <p className="text-lg text-white/70 mb-8 leading-relaxed font-inter">{prize.text}</p>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => { setPrize(null); setTimeout(() => spin(), 100) }}
                  className="px-6 py-3 bg-champagne/20 text-champagne rounded-full text-sm tracking-wide transition-colors hover:bg-champagne/30"
                >
                  Spin Again
                </button>
                <button
                  onClick={handleAccept}
                  className="px-6 py-3 bg-gold text-midnight rounded-full text-sm font-semibold tracking-wide"
                >
                  Accept
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
        {accepted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 20, stiffness: 200 }}
              className="bg-surface border border-champagne/20 rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl"
              style={{ boxShadow: '0 0 60px rgba(201, 169, 110, 0.08)' }}
            >
              <div className="text-5xl mb-4">🎉</div>
              <h3 className="text-2xl font-cinzel font-bold text-gold mb-2">Congratulations!</h3>
              <p className="text-lg text-white/70 leading-relaxed font-inter mb-4">
                Your prize has been accepted! You won:<br />
                <span className="text-champagne font-semibold">{prize.text}</span>
              </p>
              <p className="text-sm text-champagne/60 mb-8 font-dancing italic">
                My pa will be in touch.
              </p>
              <button
                onClick={() => navigate('/adventure')}
                className="px-8 py-3 bg-gold text-midnight rounded-full text-sm font-semibold tracking-wide"
              >
                Continue to Adventure
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
