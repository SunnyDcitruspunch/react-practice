import React, { useEffect, useState } from "react"
import Posts from './Post.tsx'
import PaginationFooter from "./PaginationFooter.tsx"

// source: https://www.youtube.com/watch?v=IYCa1F-OWmk&ab_channel=TraversyMedia
const url = 'https://jsonplaceholder.typicode.com/posts'
const Pagination = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [postPerPage] = useState(10)  // TODO: extra could 

  // never use async function on useEffect
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true)

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        body: undefined
      })

      const result = await response.json()
      setPosts(result)
      setLoading(false)
      console.log('posts ', posts)
    }

    fetchPosts()
  }, [])

  const indexOfLastPost = currentPage * postPerPage
  const indexOfFirstPost = indexOfLastPost - postPerPage
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost)

  const paginate = (number) => {
    setCurrentPage(number)
  }

  if (loading || !posts.length) {
    return <div>loading....</div>
  }

  return (
    <div>
      <h1>My app!</h1>
      <div>
        <Posts loading={loading} posts={currentPosts} />
        <PaginationFooter
          totalPosts={posts.length}
          updatePaginateNumber={paginate}
          postPerPage={postPerPage} />
      </div>
    </div>
  )
}

export default Pagination