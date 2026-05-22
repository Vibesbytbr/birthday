import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import CinematicCarousel from '../components/CinematicCarousel'
import { familyMembers } from '../data/wishes'

const extraImages = [
  { title: 'Opara ukwu', url: 'https://drive.google.com/thumbnail?id=1HyQbqDYTyupvva_W-GQJ-fa2BeG_kVQL&sz=w800' },
  { title: 'Opara ukwu', url: 'https://drive.google.com/thumbnail?id=1Ang01iB5pLC1RNsvSor9S80QX6tAfC2R&sz=w800' },
  { title: 'Grandma', url: 'https://drive.google.com/thumbnail?id=1ouzsXgjLtFUKhGZxBxzUrPs7OmWXxDBI&sz=w800' },
  { title: 'Lagos girls', url: 'https://drive.google.com/thumbnail?id=1Wc-bb6ht7DCp7vBDkug8t0nSz1z5ZWoL&sz=w800' },
]

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function GalleryPage() {
  const navigate = useNavigate()

  const galleryItems = useMemo(() => {
    const items = []
    familyMembers.forEach(m => {
      m.images.forEach((url, idx) => {
        items.push({
          id: `${m.id}-${idx}`,
          title: m.name,
          image: url,
        })
      })
    })
    extraImages.forEach((img, idx) => {
      items.push({
        id: `extra-${idx}`,
        title: img.title,
        image: img.url,
      })
    })
    return shuffle(items)
  }, [])

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-midnight px-4 py-12">
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
        className="text-center mb-6 pt-4"
      >
        <h1 className="text-3xl sm:text-4xl font-cinzel font-bold text-gold mb-2">
          Gallery
        </h1>
        <p className="text-white/40 font-inter text-sm tracking-wider">
          Drag to explore
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="w-full max-w-3xl"
      >
        <CinematicCarousel items={galleryItems} />
      </motion.div>

      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate('/ending')}
        className="mt-8 text-white/20 hover:text-white/40 transition-colors text-xs tracking-wider uppercase"
      >
        Continue to the end
      </motion.button>
    </div>
  )
}
