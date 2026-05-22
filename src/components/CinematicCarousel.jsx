import { useState, useRef } from 'react'
import { motion, useMotionValue } from 'framer-motion'

function circularDiff(i, focused, total) {
  const diff = i - focused
  if (Math.abs(diff) > total / 2) {
    return diff > 0 ? diff - total : diff + total
  }
  return diff
}

export default function CinematicCarousel({ items }) {
  const [focusedIndex, setFocusedIndex] = useState(0)
  const containerRef = useRef(null)
  const dragX = useMotionValue(0)

  const totalItems = items.length

  const goNext = () => setFocusedIndex(prev => (prev + 1) % totalItems)
  const goPrev = () => setFocusedIndex(prev => (prev - 1 + totalItems) % totalItems)

  const handleDragEnd = (_, info) => {
    const threshold = 50
    if (info.offset.x < -threshold) goNext()
    else if (info.offset.x > threshold) goPrev()
  }

  const getItemStyle = (index) => {
    const diff = circularDiff(index, focusedIndex, totalItems)
    if (diff === 0) {
      return { scale: 1, rotate: 0, zIndex: 10, opacity: 1, x: 0 }
    } else if (diff === -1) {
      return { scale: 0.8, rotate: -6, zIndex: 5, opacity: 0.6, x: '-30%' }
    } else if (diff === 1) {
      return { scale: 0.8, rotate: 6, zIndex: 5, opacity: 0.6, x: '30%' }
    } else if (diff < 0) {
      return { scale: 0.5, rotate: -10, zIndex: 1, opacity: 0.2, x: '-60%' }
    } else {
      return { scale: 0.5, rotate: 10, zIndex: 1, opacity: 0.2, x: '60%' }
    }
  }

  return (
    <div className="w-full overflow-hidden" ref={containerRef}>
      <motion.div
        className="relative flex items-center justify-center h-[480px] sm:h-[520px]"
        drag="x"
        dragConstraints={containerRef}
        dragElastic={0.15}
        onDragEnd={handleDragEnd}
        style={{ x: dragX }}
      >
        {items.map((item, index) => {
          const style = getItemStyle(index)
          return (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{
                opacity: style.opacity,
                scale: style.scale,
                rotate: style.rotate,
                x: style.x,
                zIndex: style.zIndex,
              }}
              transition={{
                type: 'spring',
                damping: 28,
                stiffness: 180,
                mass: 0.8,
              }}
              className="absolute w-64 sm:w-80 cursor-grab active:cursor-grabbing"
              onClick={() => setFocusedIndex(index)}
            >
              <div className="relative rounded-xl overflow-hidden shadow-2xl">
                <img
                  src={item.image}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="h-72 sm:h-80 w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-5">
                  <h3 className="text-white font-cinzel text-xl sm:text-2xl font-bold drop-shadow-lg tracking-wide">
                    {item.title}
                  </h3>
                </div>
              </div>
            </motion.div>
          )
        })}
      </motion.div>

      <div className="flex justify-center gap-2 mt-6">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => setFocusedIndex(i)}
            className={`rounded-full transition-all duration-500 ${
              i === focusedIndex ? 'bg-gold w-8 h-1' : 'bg-white/20 w-1.5 h-1.5'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
