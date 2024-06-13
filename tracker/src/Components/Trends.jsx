import React from 'react'
import LineChart from './LineChart'

function Trends() {
  return (
    <>
      <div className='trends'>
        <h1>Trends</h1>

        <div className='lineChart'>
          <LineChart/>
        </div>
      </div>
    </>
  )
}

export default Trends