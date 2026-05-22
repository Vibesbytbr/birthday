import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import FamilyCard from '../components/FamilyCard'
import { familyMembers } from '../data/wishes'

export default function WishesPage() {
  const navigate = useNavigate()
  const [openId, setOpenId] = useState(null)

  return (
    <div className="relative min-h-screen bg-midnight px-4 py-12 overflow-y-auto">
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
        className="text-center mb-10 pt-4"
      >
        <h1 className="text-3xl sm:text-4xl font-cinzel font-bold text-gold mb-2">
          Birthday Wishes
        </h1>
        <p className="text-white/40 font-inter text-sm tracking-wider">
          Tap a card to read their message
        </p>
      </motion.div>

      <div className="max-w-lg mx-auto space-y-3 relative z-10">
        {familyMembers.map((member, i) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
          >
            <FamilyCard
              member={member}
              isOpen={openId === member.id}
              onToggle={() => setOpenId(openId === member.id ? null : member.id)}
            />
          </motion.div>
        ))}
      </div>
    </div>
  )
}
