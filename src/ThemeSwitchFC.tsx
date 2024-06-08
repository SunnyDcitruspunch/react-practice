import React, { useState } from 'react'
import './index.css'

const ThemeSwitch = (): React.JSX.Element => {
  const [isDarkTheme, setDarkTheme] = useState(false)

  return (
    <div className={`theme ${isDarkTheme ? 'dark-theme' : ''}`}>
      <p>{isDarkTheme ? 'dark' : 'light'}</p>
      <button onClick={() => setDarkTheme(prevState => !prevState)}>switch</button>
    </div>
  )
}

export default ThemeSwitch