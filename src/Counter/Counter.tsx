import React, { useState } from 'react'

type CounterProps = {
  initialCount: number
}

function Counter({ initialCount = 0 }: CounterProps) {
  const [count, setCount] = useState(initialCount)

  function updateCount() {
    setCount(prevState => prevState + 1)
  }

  return (
    <div>
      <button onClick={updateCount} type='button'>Add</button>
      <h3>{count}</h3>
    </div>
  )
}

export default Counter
