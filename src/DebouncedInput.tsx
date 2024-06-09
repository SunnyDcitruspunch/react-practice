import React, { useState, useRef, useEffect } from "react"

interface ProductDto {
  availabilityStatus: string
  brand: string
  category: string
  description: string
  title: string
  id: number
}

const url = 'https://dummyjson.com/products/search'
const DEBOUNCE_TIME_MS = 2000
function DebouncedInput() {
  const debounceTimerId = useRef<number | null>(null)
  const [input, setInput] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [products, setProducts] = useState<ProductDto[]>([])

  useEffect(() => {
    return () => {
      if (debounceTimerId.current) {
        clearTimeout(debounceTimerId.current)
      }
    }
  }, [])

  function updateInputValue(value: string): void {
    setInput(value)
    setError('') // clear error
    debounceRequest()
  }

  function debounceRequest(): void {
    if (debounceTimerId.current) {
      clearTimeout(debounceTimerId.current)
    }

    debounceTimerId.current = window.setTimeout(async () => {
      await fetchData()
    }, DEBOUNCE_TIME_MS);
  }

  async function fetchData(): Promise<void> {
    try {
      setIsLoading(true)
      const result = await fetch(`${url}?q=${input}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (result.ok) {
        const response = await result.json()
        setProducts(response.products)
      }
    } catch (err) {
      setError(err)
    } finally {
      setIsLoading(false)
    }
  }

  // if (error) {
  //   return <div>{error}</div>
  // }

  // if (isLoading) {
  //   return <div>loading....</div>
  // }

  return (
    <div className="debouncedInput">
      <label htmlFor="product-search">Search product</label>
      <input id="product-search" type="text" value={input} onChange={(e) => updateInputValue(e.target.value)} />

      {isLoading && <div>Loading...</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}

      <ul>
        {
          products.map((product: ProductDto) => {
            return (
              <li key={product.id}>
                <p>{product.title}</p>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}

export default DebouncedInput
