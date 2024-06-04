import React from 'react'

const PaginationFooter = ({ postPerPage, totalPosts, updatePaginateNumber }) => {
  const pageNumbers: number[] = []

  // use Math.ceil to round up
  for (let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++) {
    pageNumbers.push(i)
  }

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map(num => (
          <li className="page-item" key={num}>
            <a href='!#' onClick={() => updatePaginateNumber(num)} className='page-link'>{num}</a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default PaginationFooter