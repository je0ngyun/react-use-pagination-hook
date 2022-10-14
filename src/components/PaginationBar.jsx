import React from 'react'
import usePagination from '../hooks/usePagination'
import PropTypes from 'prop-types'
import { useEffect } from 'react'

const PaginationBar = ({ numOfPage, totalPage, onChange }) => {
  const {
    pagelist,
    goNextSection,
    goBeforeSection,
    goFirstSection,
    goLastSection,
    goNext,
    goBefore,
    setTotalPage,
    setPage,
    currentPage,
  } = usePagination({ numOfPage, totalPage })

  useEffect(() => {
    onChange(currentPage)
  }, [currentPage])

  return (
    <div className="container">
      <button onClick={() => goFirstSection()}>{'First'}</button>
      <button onClick={() => goBeforeSection()}>{'<<'}</button>
      <button onClick={() => goBefore()}>{'<'}</button>
      <ul className="pages" aria-labelledby="pages">
        {pagelist.map((page) => (
          <li
            onClick={() => setPage(page)}
            className={currentPage === page ? 'selected' : ''}
            data-testid={currentPage === page ? 'selected' : ''}
            key={page}
          >
            {page}
          </li>
        ))}
      </ul>
      <button onClick={() => goNext()}>{'>'}</button>
      <button onClick={() => goNextSection()}>{'>>'}</button>
      <button onClick={() => goLastSection()}>{'Last'}</button>
    </div>
  )
}

PaginationBar.propsTypes = {
  numOfPage: PropTypes.number,
  totalPage: PropTypes.number,
}

export default PaginationBar
