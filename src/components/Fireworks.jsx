import { useEffect, useRef } from 'react'

export default function Fireworks({ delay = 0 }) {
  const intervalRef = useRef(null)

  useEffect(() => {
    let cancelled = false

    const launch = async () => {
      const confetti = (await import('canvas-confetti')).default

      const fire = () => {
        if (cancelled) return
        const x = Math.random() * 0.8 + 0.1
        const y = Math.random() * 0.3 + 0.1

        confetti({
          particleCount: 30 + Math.floor(Math.random() * 40),
          spread: 70 + Math.floor(Math.random() * 60),
          startVelocity: 20 + Math.floor(Math.random() * 15),
          origin: { x, y },
          colors: ['#FBBF24', '#C9A96E', '#7C3AED', '#8B5CF6', '#F59E0B'],
          ticks: 150,
          shapes: ['circle'],
          gravity: 0.8,
          drift: 0.5,
        })
      }

      const startTimer = setTimeout(() => {
        if (cancelled) return
        fire()
        intervalRef.current = setInterval(fire, 6000 + Math.random() * 4000)
      }, delay)

      return () => clearTimeout(startTimer)
    }

    launch()

    return () => {
      cancelled = true
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [delay])

  return null
}
