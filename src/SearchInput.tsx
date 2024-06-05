import React, { useState, useRef, useEffect } from 'react'

const url = 'https://jsonplaceholder.typicode.com/posts/10'
const SearchInput = (): React.JSX.Element => {
  const [input, setInput] = useState('')
  let timeoutId = useRef<number | null>(null)

  const fetchPosts = async () => {
    console.log('fetching data...');

    const response = await fetch(url)
    const result = await response.json()
    console.log('result ', result)
  }

  const updateInput = (inputEvent: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = inputEvent.target;

    setInput(value)


    if (timeoutId.current) {
      clearTimeout(timeoutId.current)
    }

    timeoutId.current = window.setTimeout(async () => {
      await fetchPosts()
    }, 1000)
  }


  // clean up function
  useEffect(() => {
    return () => {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current)
      }
    }
  }, [])

  return (
    <div className='search-input'>
      <input type="text" value={input} onChange={updateInput} />
    </div>
  )
}

export default SearchInput
