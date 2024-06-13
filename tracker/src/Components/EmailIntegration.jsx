import React from 'react'

function EmailIntegration() {
  return (
    <>
      <div className='emailIntegration'>
        <h1>Email Integration</h1>
          <div className="emailIntegration-container">
              <div className="emailIntegration-block">
                <h2>Add Account</h2>
                <form action="">
                  <input type="email" placeholder='Enter a Email' />
                  <br /><br /><br />
                  <button>Submit</button>
                </form>
              </div>
          </div>
      </div>
    </>
  )
}

export default EmailIntegration