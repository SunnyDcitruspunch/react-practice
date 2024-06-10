import React, { useEffect, useRef, useState, useCallback } from 'react'

const THROTTLE_TIME_MS = 2000
function ThrottledResizeWindow() {
  const throttleTimer = useRef<number | null>(null)
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth)
  let lastTimeRef = useRef<number>(Date.now())

  const throttleResize = useCallback(() => {
    const now = Date.now()
    const remainingTime = THROTTLE_TIME_MS - (now - lastTimeRef.current)

    if (remainingTime <= 0) {
      setWindowWidth(window.innerWidth)
      lastTimeRef.current = now
      if (throttleTimer.current) {
        clearTimeout(throttleTimer.current)
        throttleTimer.current = null
      }
    } else {
      if (!throttleTimer.current) {
        throttleTimer.current = window.setTimeout(() => {
          setWindowWidth(window.innerWidth)
          lastTimeRef.current = Date.now()
          throttleTimer.current = null
        }, remainingTime)
      }
    }
  }, [])

  useEffect(() => {
    window.addEventListener('resize', throttleResize)

    return () => {
      window.removeEventListener('resize', throttleResize)

      if (throttleTimer.current) {
        clearTimeout(throttleTimer.current)
      }
    }
  }, [throttleResize])

  return <div>window width: {windowWidth}</div>
}

export default ThrottledResizeWindow
