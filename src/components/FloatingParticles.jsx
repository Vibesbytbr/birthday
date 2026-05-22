import { motion } from 'framer-motion'

function Particle({ index }) {
  const left = Math.random() * 100
  const duration = 12 + Math.random() * 10
  const delay = Math.random() * 8
  const size = 2 + Math.random() * 3

  return (
    <motion.div
      className="absolute rounded-full"
      style={{ left: `${left}%`, width: size, height: size }}
      initial={{ y: '110vh', opacity: 0 }}
      animate={{
        y: '-110vh',
        opacity: [0, 0.6, 0.4, 0],
        scale: [0.5, 1, 0.8, 0.3],
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
          background: index % 3 === 0
            ? 'radial-gradient(circle, #FBBF24, transparent)'
            : index % 3 === 1
            ? 'radial-gradient(circle, #C9A96E, transparent)'
            : 'radial-gradient(circle, rgba(255,255,255,0.3), transparent)',
          filter: 'blur(0.5px)',
        }}
      />
    </motion.div>
  )
}

export default function FloatingParticles({ count = 30 }) {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
      {Array.from({ length: count }, (_, i) => (
        <Particle key={i} index={i} />
      ))}
    </div>
  )
}
