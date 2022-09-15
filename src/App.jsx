import React from 'react'
import PagenationBar from './components/PagenationBar'
import './index.css'

const App = () => {
  return (
    <div className="App">
      <main className="container">
        <PagenationBar numOfPage={3} totalPage={15} />
      </main>
    </div>
  )
}

export default App
