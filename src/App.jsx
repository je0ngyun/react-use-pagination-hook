import React from 'react'
import PaginationBar from './components/PaginationBar'
import './index.css'

const App = () => {
  return (
    <div className="App">
      <main className="container">
        <PaginationBar numOfPage={5} totalPage={15} />
      </main>
    </div>
  )
}

export default App
