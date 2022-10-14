import React, { useEffect } from 'react'
import { useRef } from 'react'
import { useState } from 'react'
import PaginationBar from './components/PaginationBar'
import './index.css'

const App = () => {
  const [currentPage, setCurrentPage] = useState()
  const [numOfPage, setNumOfPage] = useState(5)
  const [totalPage, setTotalPage] = useState(15)

  const handleNumOfPageFieldChange = ({ target: { value } }) => {
    setNumOfPage(+value)
  }

  const handleTotalPageFieldChange = ({ target: { value } }) => {
    setTotalPage(+value)
  }

  return (
    <div className="App">
      <img
        src="https://raw.githubusercontent.com/je0ngyun/react-use-pagination-hook/master/media/logo.png"
        alt="logo"
      />
      <div className="input">
        <label>currentPage : </label>
        <div>{currentPage}</div>
      </div>
      <div className="input">
        <label htmlFor="num-of-page">numOfPage : </label>
        <input
          min={1}
          value={numOfPage}
          onChange={handleNumOfPageFieldChange}
          id="num-of-page"
          type="number"
        />
      </div>
      <div className="input">
        <label htmlFor="total-page">totalPage : </label>
        <input
          value={totalPage}
          onChange={handleTotalPageFieldChange}
          id="total-page"
          type="number"
        />
      </div>
      <main>
        <PaginationBar
          onChange={setCurrentPage}
          numOfPage={numOfPage}
          totalPage={totalPage}
        />
      </main>
    </div>
  )
}

export default App
