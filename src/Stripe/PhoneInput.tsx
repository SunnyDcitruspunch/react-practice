import React, { useState } from 'react'

// source: https://www.1point3acres.com/bbs/thread-852568-1-1.html
// const phoneNumberLength = 13

function PhoneInput() {
  const [input, setInput] = useState('')

  function updateInput(e) {
    const value = e.target.value
    let val = ''
    for (const char of value) {
      if (!isNaN(char) && char !== ' ') {
        val += char
      }
    }

    // val = val.replace(/\D/g, '') // Remove non-digit characters

    if (val.length > 10) {
      val = val.slice(0, 10)
    }

    if (val.length > 6) {
      val = `(${val.slice(0, 3)}) ${val.slice(3, 6)}-${val.slice(6)}`
    } else if (val.length > 3) {
      val = `(${val.slice(0, 3)}) ${val.slice(3)}`
    } else if (val.length > 0) {
      val = `(${val}`
    }

    setInput(val)
  }

  return (
    <div>
      <label htmlFor='phone-number'>Phone number</label>
      <input id='phone-number' type='text' value={input} onChange={updateInput} />
    </div>
  )
}

export default PhoneInput
