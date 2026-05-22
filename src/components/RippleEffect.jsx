import { motion, AnimatePresence } from 'framer-motion'

export default function RippleEffect({ ripples }) {
  return (
    <AnimatePresence>
      {ripples.map((ripple) => (
        <motion.div
          key={ripple.id}
          initial={{ scale: 0, opacity: 0.5 }}
          animate={{ scale: 4, opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="absolute pointer-events-none"
          style={{
            left: ripple.x - 60,
            top: ripple.y - 60,
            width: 120,
            height: 120,
          }}
        >
          <div className="absolute inset-1 rounded-full border border-blue-400/20 blur-[2px]" />
          <div className="absolute inset-0 rounded-full border border-blue-400/50" />
          <div className="absolute inset-3 rounded-full border border-blue-300/15" />
          <div className="absolute inset-6 rounded-full bg-blue-400/10 blur-sm" />
        </motion.div>
      ))}
    </AnimatePresence>
  )
}
