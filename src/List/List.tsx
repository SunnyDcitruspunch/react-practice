import React, { useRef, useState, useEffect, ChangeEvent } from 'react'

type Product = {
  id: number
  title: string
}

const DEBOUNCE_WAIT_TIME = 2000
const productsUrl = 'https://dummyjson.com/products/search?q='
function List() {
  const debounceRef = useRef<number | null>(null)
  const [list, setList] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [searchInput, setSearchInput] = useState<string>('')

  useEffect(() => {
    // fetchPosts()

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current)
      }
    }
  }, [])


  function updateSearchInput(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value
    setSearchInput(value)

    debounceUpdate()
  }

  function debounceUpdate() {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
    }

    debounceRef.current = window.setTimeout(async () => {
      await fetchPosts()
    }, DEBOUNCE_WAIT_TIME);
  }

  async function fetchPosts() {
    try {
      console.log('searching....');

      setIsLoading(true)
      const response = await fetch(`${productsUrl}${searchInput}`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (response.ok) {
        const products = await response.json()
        setList(products.products)
      }
    } catch (error) {
      // set error
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return <div>loading....</div>
  }

  if (!list.length) {
    return (
      <div>
        <input type='text' value={searchInput} onChange={updateSearchInput} />
        <div>No items found</div>
      </div>
    )
  }

  return (
    <div>
      <label htmlFor='product-search'>Product Search</label>
      <input tabIndex={0} id='product-search' type='text' value={searchInput} onChange={updateSearchInput} />
      <ul>
        {
          list.map((li) => {
            return <li key={li.id}>{li.title}</li>
          })
        }
      </ul>
    </div>
  )
}

export default List
