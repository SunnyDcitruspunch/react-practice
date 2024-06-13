import React, { useEffect, useRef, useState } from 'react'
import './index.css'

const MS_PER_SECOND = 1000
const SECOND_PER_MINUTE = 60
const MINUTE_PER_HOUR = 60
function StopWatch() {
  const intervalTimerRef = useRef<null | NodeJS.Timeout>(null)
  const startTimeRef = useRef(0)
  const [isRunning, setIsRunning] = useState(false)
  const [elapsedTime, setElapsedTime] = useState(0)

  useEffect(() => {
    if (isRunning) {
      if (intervalTimerRef) {
        intervalTimerRef.current = setInterval(() => {
          setElapsedTime(Date.now() - startTimeRef.current)
        }, 10)
      }
    }

    return () => {
      if (intervalTimerRef.current) {
        clearInterval(intervalTimerRef.current)
      }
    }
  }, [isRunning])

  function toggleTimer() {
    if (isRunning) {
      stopInterval()
    } else {
      startTimer()
    }
  }

  function startTimer() {
    setIsRunning(true)
    startTimeRef.current = Date.now() - elapsedTime
  }

  function stopInterval() {
    setIsRunning(false)
  }

  function resetTimer() {
    setElapsedTime(0)
    setIsRunning(false)
  }

  // 5 % 2 = 1
  function getFormattedTime() {
    const milliSeconds = Math.floor((elapsedTime % MS_PER_SECOND) / 10)
    const seconds = Math.floor((elapsedTime / MS_PER_SECOND) % SECOND_PER_MINUTE)
    const minutes = Math.floor(seconds / (MS_PER_SECOND * SECOND_PER_MINUTE) % MINUTE_PER_HOUR)
    const hours = Math.floor(elapsedTime / (MS_PER_SECOND * MINUTE_PER_HOUR * SECOND_PER_MINUTE))

    return `${hours} : ${minutes} : ${seconds} : ${milliSeconds}`
  }

  return (
    <div className='stopWatch'>
      <button type='button' className='stopWatch-displayTime' onClick={toggleTimer}>
        <span>{getFormattedTime()}</span>
      </button>
      <div>
        <button type='button' onClick={toggleTimer}>{isRunning ? 'Stop' : 'Start'}</button>
        <button type='button' onClick={resetTimer}>ReStart</button>
      </div>
    </div>
  )
}

export default StopWatch