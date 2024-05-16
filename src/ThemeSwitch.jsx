import React, { Component } from 'react'
import './index.css'

class ThemeSwitch extends Component {
  state = {
    isDarkTheme: false
  }


  render() {
    return (
      <div className='themeSwitch'>
        <button onClick={this.toggleTheme}>Toggle</button>
        <div className={`theme ${this.state.isDarkTheme ? 'dark-theme' : ''}`}>Theme</div>
      </div>
    )
  }

  toggleTheme = () => {
    this.setState(prevState => ({
      isDarkTheme: !prevState.isDarkTheme
    }))
  }
}

export default ThemeSwitch
