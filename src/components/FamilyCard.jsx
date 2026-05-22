import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { duckMusic, restoreMusic } from '../lib/music'

export default function FamilyCard({ member, isOpen, onToggle }) {
  const [playing, setPlaying] = useState(false)
  const audioRef = useRef(null)

  const toggleAudio = (e) => {
    e.stopPropagation()
    if (!audioRef.current) return
    if (playing) {
      audioRef.current.pause()
      restoreMusic()
      setPlaying(false)
    } else {
      duckMusic()
      audioRef.current.play()
      setPlaying(true)
    }
  }

  return (
    <motion.div
      layout
      onClick={onToggle}
      className={`rounded-xl cursor-pointer overflow-hidden transition-shadow duration-500 ${
        isOpen ? 'shadow-2xl shadow-champagne/10' : 'shadow-lg hover:shadow-xl'
      }`}
      style={{
        background: isOpen
          ? 'linear-gradient(135deg, #F5F0E8 0%, #EDE4D4 100%)'
          : 'linear-gradient(135deg, rgba(245, 240, 232, 0.95) 0%, rgba(237, 228, 212, 0.95) 100%)',
        border: isOpen ? '1px solid rgba(201, 169, 110, 0.2)' : '1px solid rgba(201, 169, 110, 0.08)',
      }}
    >
      <div className="flex items-center gap-4 p-5">
        <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${member.color} flex items-center justify-center text-lg shadow-inner flex-shrink-0 text-midnight font-cinzel font-bold`}>
          {member.name[0]}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-midnight text-base">{member.name}</h3>
        </div>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-midnight/30 text-sm"
        >
          &#9660;
        </motion.span>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 space-y-5">
              {member.images.length > 0 ? (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.15 }}
                  className="flex gap-2 overflow-x-auto snap-x snap-mandatory -mx-6 px-6"
                  onWheel={(e) => e.stopPropagation()}
                >
                  {member.images.map((url, idx) => (
                    <img
                      key={idx}
                      src={url}
                      alt={`${member.name} ${idx + 1}`}
                      referrerPolicy="no-referrer"
                      className="h-48 w-auto flex-shrink-0 snap-center rounded-lg shadow-inner"
                    />
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.15 }}
                  className={`w-full h-48 rounded-lg bg-gradient-to-br ${member.color} flex items-center justify-center shadow-inner`}
                >
                  <span className="text-6xl opacity-60 font-cinzel">{member.name[0]}</span>
                </motion.div>
              )}

              <motion.div
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <h3 className="font-cinzel text-xl font-bold text-midnight">{member.name}</h3>
              </motion.div>

              <motion.div
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="relative"
              >
                <div className="absolute -left-1 -top-1 text-3xl text-champagne/40">&ldquo;</div>
                <p className="font-inter text-base text-gray-700 leading-relaxed pl-4 pr-2">
                  {member.message}
                </p>
              </motion.div>

              <motion.div
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.35 }}
                className="flex items-center gap-3"
              >
                {member.audio && (
                  <>
                    <audio
                      ref={audioRef}
                      src={member.audio}
                      onEnded={() => { setPlaying(false); restoreMusic() }}
                    />
                    <button
                      onClick={toggleAudio}
                      className="flex items-center gap-2 px-4 py-2 rounded-full bg-midnight/10 hover:bg-midnight/20 transition-colors text-midnight/70 text-sm"
                    >
                      {playing ? '⏸ Pause' : '▶ Play'} Voice Message
                    </button>
                  </>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
