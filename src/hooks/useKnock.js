import { useState, useCallback } from 'react'

export function useKnock() {
  const [knocks, setKnocks] = useState(0)
  const [ripples, setRipples] = useState([])

  const knock = useCallback((x, y) => {
    const id = Date.now()
    setRipples(prev => [...prev, { id, x, y }])
    setKnocks(prev => prev + 1)

    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== id))
    }, 800)

    return knocks + 1 >= 3
  }, [knocks])

  const reset = useCallback(() => {
    setKnocks(0)
    setRipples([])
  }, [])

  return { knocks, ripples, knock, reset }
}
