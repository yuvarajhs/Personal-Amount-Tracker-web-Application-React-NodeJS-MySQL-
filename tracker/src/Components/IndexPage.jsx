import React from 'react'
import { Link } from 'react-router-dom'

function IndexPage() {
    
  return (
    <div className='indexPage'>
        <div className="indexPage-container">
            <div className="index-cont-box"> 
                <h3><Link to='/register' className='link' >Register</Link></h3><br />
                <h3><Link to='/login' className='link'>Login</Link></h3>
                
            </div>
        </div>
    </div>
  )
}

export default IndexPage


