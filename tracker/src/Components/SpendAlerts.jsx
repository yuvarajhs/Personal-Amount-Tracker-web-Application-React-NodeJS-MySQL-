import React, { useState } from 'react'
import axios from 'axios'

function SpendAlerts() {

  const [amount, setAmount] = useState('')
  const updateAmount =(e)=>{
    e.preventDefault()
    axios.put('http://localhost:8081/updateDebitAlert',{amount})
    .then((response)=>{
      alert("Set Debit Alert Successfully")
      console.log(response)
    })
    .catch((err)=>console.log(err))
  }

  return (
    <>
      <div className=' spendAlert emailIntegration'>
        <h1>Spend Alert</h1>
          <div className="emailIntegration-container">
              <div className="emailIntegration-block">
                <h2>Set the Monthly Spend Alert Amount</h2>
                <form onSubmit={updateAmount}>
                  <input type="number" placeholder='Enter Amount'  value={amount} onChange={e=>setAmount(e.target.value)}/>
                  <br /><br /><br />
                  <button>Submit</button>
                </form>
              </div>
          </div>
      </div>
    </>
  )
}

export default SpendAlerts
