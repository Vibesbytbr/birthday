import { useState, useEffect, useRef } from 'react'
import { motion, useAnimation, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useKnock } from '../hooks/useKnock'
import RippleEffect from '../components/RippleEffect'

const KNOCK_SOUND_URL = 'https://www.soundfisher.com/wp-content/uploads/2022/05/knock-door-1.mp3'

function KnockDot({ filled }) {
  return (
    <motion.div
      animate={filled ? {
        scale: [1, 1.3, 1],
        opacity: 1,
      } : {
        scale: 1,
        opacity: 0.2,
      }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={`w-2 h-2 rounded-full transition-colors duration-300 ${
        filled ? 'bg-gold-accent' : 'bg-white'
      }`}
      style={{
        boxShadow: filled ? '0 0 12px rgba(244, 185, 66, 0.5)' : 'none',
      }}
    />
  )
}

export default function LandingPage() {
  const navigate = useNavigate()
  const { knocks, ripples, knock } = useKnock()
  const [transitioning, setTransitioning] = useState(false)
  const [showFlash, setShowFlash] = useState(false)
  const [contentReady, setContentReady] = useState(false)
  const audioContextRef = useRef(null)
  const cardControls = useAnimation()
  const confettiRef = useRef(null)

  const playKnockSound = async () => {
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)()
      }
      const ctx = audioContextRef.current
      const response = await fetch(KNOCK_SOUND_URL, { mode: 'cors' })
      const arrayBuffer = await response.arrayBuffer()
      const audioBuffer = await ctx.decodeAudioData(arrayBuffer)
      const source = ctx.createBufferSource()
      source.buffer = audioBuffer
      source.connect(ctx.destination)
      source.start(0)
    } catch {
      // Sound optional
    }
  }

  const fireConfetti = async (count = 60) => {
    if (!confettiRef.current) return
    confettiRef.current({
      particleCount: count,
      spread: 100,
      origin: { x: 0.5, y: 0.4 },
      colors: ['#F4B942', '#FF8A3D', '#8B5CF6', '#60A5FA'],
      ticks: 150,
    })
  }

  const handleTap = async (e) => {
    if (transitioning) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX || e.touches?.[0]?.clientX || 0) - rect.left
    const y = (e.clientY || e.touches?.[0]?.clientY || 0) - rect.top

    const isThird = knock(x, y)
    cardControls.start({ scale: [1, 0.97, 1] }, { duration: 0.35, ease: [0.22, 1, 0.36, 1] })

    if (isThird) {
      playKnockSound()
      fireConfetti(100)
      setShowFlash(true)
      setTimeout(() => setShowFlash(false), 300)
      setTimeout(() => setTransitioning(true), 500)
      setTimeout(() => {
        if (audioContextRef.current) audioContextRef.current.close()
        navigate('/celebrate')
      }, 2800)
    } else {
      playKnockSound()
    }
  }

  useEffect(() => {
    const initConfetti = async () => {
      const confetti = (await import('canvas-confetti')).default
      confettiRef.current = confetti
      // Initial burst on load
      fireConfetti(40)
    }
    initConfetti()
    const t = setTimeout(() => setContentReady(true), 200)
    return () => {
      clearTimeout(t)
      if (audioContextRef.current) audioContextRef.current.close()
    }
  }, [])

  const subtext =
    knocks === 0 ? 'Knock thrice to enter' :
    knocks === 1 ? 'One more...' :
    'One last knock'

  return (
    <div
      onClick={handleTap}
      onTouchStart={handleTap}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden cursor-pointer select-none"
      style={{ backgroundColor: '#00033d' }}
    >
      {/* Background gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ x: [0, 25, -15, 0], y: [0, -15, 25, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full"
          style={{ backgroundColor: 'rgba(59, 130, 246, 0.08)', filter: 'blur(130px)' }}
        />
        <motion.div
          animate={{ x: [0, -25, 15, 0], y: [0, 15, -25, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full"
          style={{ backgroundColor: 'rgba(99, 102, 241, 0.06)', filter: 'blur(130px)' }}
        />
        <motion.div
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
          style={{ backgroundColor: 'rgba(59, 130, 246, 0.04)', filter: 'blur(150px)' }}
        />
      </div>

      {/* Floating particles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
        {Array.from({ length: 20 }, (_, i) => {
          const left = Math.random() * 100
          const duration = 18 + Math.random() * 20
          const delay = Math.random() * 12
          const size = 1 + Math.random() * 2
          const color = i % 3 === 0 ? 'rgba(96, 165, 250, 0.5)' : i % 3 === 1 ? 'rgba(129, 140, 248, 0.4)' : 'rgba(255, 255, 255, 0.15)'
          return (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{ left: `${left}%`, width: size, height: size }}
              initial={{ y: '110vh', opacity: 0 }}
              animate={{
                y: '-110vh',
                opacity: [0, 0.4, 0.2, 0],
                scale: [0.3, 1, 0.6, 0.2],
              }}
              transition={{
                duration,
                delay,
                repeat: Infinity,
                ease: 'linear',
              }}
            >
              <div
                className="w-full h-full rounded-full"
                style={{
                  background: `radial-gradient(circle, ${color}, transparent)`,
                }}
              />
            </motion.div>
          )
        })}
      </div>

      {/* Ripple effects */}
      <RippleEffect ripples={ripples} />

      {/* Flash overlay on third knock */}
      <AnimatePresence>
        {showFlash && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.3, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(96,165,250,0.3), transparent)' }}
          />
        )}
      </AnimatePresence>

      {/* Main content */}
      <AnimatePresence mode="wait">
        {!transitioning ? (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.9, filter: 'blur(8px)' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-20 text-center px-6"
          >
            <motion.div animate={cardControls}>
              <div
                className="relative px-8 py-16 sm:px-12 sm:py-20 max-w-sm mx-auto overflow-hidden min-h-[420px] flex flex-col justify-center"
                style={{
                  borderRadius: '120px 120px 24px 24px',
                  background: 'linear-gradient(180deg, rgba(30, 64, 175, 0.25) 0%, rgba(15, 23, 42, 0.6) 50%, rgba(15, 23, 42, 0.4) 100%)',
                  border: '1px solid rgba(96, 165, 250, 0.15)',
                  boxShadow: '0 0 60px rgba(59, 130, 246, 0.15), 0 0 120px rgba(59, 130, 246, 0.05), 0 8px 40px rgba(0, 0, 0, 0.4)',
                }}
              >
                {/* Door panel details */}
                <div className="absolute inset-4 rounded-[100px_100px_16px_16px] border border-blue-400/5 pointer-events-none" />
                <div className="absolute inset-x-8 top-1/2 h-px bg-blue-400/5 pointer-events-none" />
                <div className="absolute top-1/2 bottom-8 left-1/2 w-px bg-blue-400/5 pointer-events-none" />

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={contentReady ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                  {/* Title */}
                  <motion.h1
                    className="text-4xl sm:text-5xl md:text-6xl font-inter font-extrabold tracking-tight text-gold-accent leading-tight"
                    animate={{
                      textShadow: [
                        '0 0 20px rgba(244,185,66,0.15)',
                        '0 0 40px rgba(244,185,66,0.3)',
                        '0 0 20px rgba(244,185,66,0.15)',
                      ],
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    Ada nna yaaaaaaa
                  </motion.h1>

                  {/* Accent emoji */}
                  <motion.div
                    className="mt-4 text-3xl"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    🌸
                  </motion.div>
                </motion.div>

                {/* Divider */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={contentReady ? { scaleX: 1 } : {}}
                  transition={{ delay: 0.4, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="h-px bg-gradient-to-r from-transparent via-gold-accent/30 to-transparent my-6"
                />

                {/* Knock progress dots */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={contentReady ? { opacity: 1 } : {}}
                  transition={{ delay: 0.5, duration: 0.4 }}
                  className="flex justify-center gap-3 mb-4"
                >
                  {Array.from({ length: 3 }).map((_, i) => (
                    <KnockDot key={i} filled={i < knocks} />
                  ))}
                </motion.div>

                {/* Subtext */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={contentReady ? { opacity: 1 } : {}}
                  transition={{ delay: 0.6, duration: 0.4 }}
                  className="text-white/40 text-sm sm:text-base font-inter tracking-wider"
                >
                  {subtext}
                </motion.p>
              </div>
            </motion.div>

            {/* Tap anywhere hint */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={contentReady ? { opacity: [0, 0.25, 0] } : {}}
              transition={{ delay: 1.5, duration: 3, repeat: knocks === 0 ? Infinity : 0, ease: 'easeInOut' }}
              className="text-white/15 text-xs tracking-widest uppercase mt-6"
            >
              Tap anywhere
            </motion.p>
          </motion.div>
        ) : (
          <motion.div
            key="transition"
            initial={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
            animate={{ scale: 25, opacity: 0, filter: 'blur(20px)' }}
            transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-20"
          >
            <div className="w-16 h-16 rounded-full" style={{ backgroundColor: '#3B82F6', boxShadow: '0 0 60px rgba(59,130,246,0.4), 0 0 120px rgba(59,130,246,0.2)' }} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
