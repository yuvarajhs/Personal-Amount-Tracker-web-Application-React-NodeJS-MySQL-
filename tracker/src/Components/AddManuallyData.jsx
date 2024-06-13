import React, { useState } from 'react'
import Axios from 'axios'

function AddManuallyData() {
    
    const [credits_class, setCredits] = useState('addCredits visible')
    const [debits_class, setDebits] = useState('addDebits hidden')
    const [credit_btn_class, setCreditBtnClass] = useState('color-blue')
    const [debit_btn_class, setDebitBtnClass] = useState(' transparent')

  const creditsUpdate=()=>{
    setCredits('addCredits visible')
    setDebits('addDebits hidden')
    setCreditBtnClass('color-blue')
    setDebitBtnClass('transparent')
  }
  const debitsUpdates=()=>{
    setCredits('addCredits hidden')
    setDebits('addDebits visible')
    setCreditBtnClass('transparent')
    setDebitBtnClass('color-light-blue')
  }


    const [name,setName]=useState('')
    const [date,setDate]=useState('')
    const [credit,setCredit]=useState('')
    const [debit,setDebit]=useState('')


    const updateCredit=(e)=>{
        e.preventDefault()
        Axios.post('http://localhost:8081/addCredits',{name:name,date:date,credit:credit})
        .then((response)=>{
            console.log(response)
            alert("Added Successfully")
            setName('')
            setDate('')
            setCredit('')
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    const updateDebit=(e)=>{
        e.preventDefault()
        Axios.post('http://localhost:8081/addDebits',{name:name,date:date,debit:debit})
        .then((response)=>{
            console.log(response)
            alert("Added Successfully")
            setName('')
            setDate('')
            setDebit('')
        })
        .catch((err)=>{
            console.log(err)
        })
    }
  return (
    <>
        <div className='overView-section addManually-sec'>
          <div className='addManually-heading'>
            <h3 class={credit_btn_class} onClick={creditsUpdate}>Add Credits details</h3>
            <h3 class={debit_btn_class} onClick={debitsUpdates}>Add Debits details</h3>
          </div>

          <div className="addManually-section">

            <div className={credits_class}>
              <div className='addManually-block'>
                <form action="" onSubmit={updateCredit}>
                    <input type="text" placeholder='Name' value={name} required  onChange={(e)=>setName(e.target.value)}/>
                    <br /><br />
                    <input type="date" pattern="\d{4}-\d{2}-\d{2}" value={date} required onChange={(e)=>setDate(e.target.value)}/>
                    <br /><br />
                    <input type="text" placeholder='Credit Amount' value={credit} required onChange={(e)=>setCredit(e.target.value)} />
                    <br /><br />
                    <button>Submit</button>
                </form>
              </div>
              
            </div>

            <div className={debits_class}>
                <div className='addManually-block'>
                    <form action="" onSubmit={updateDebit}>
                        <input type="text" placeholder='Name' value={name} required onChange={(e)=>setName(e.target.value)}/>
                        <br /><br />
                        <input type="date" pattern="\d{4}-\d{2}-\d{2}" value={date} required onChange={(e)=>setDate(e.target.value)} />
                        <br /><br />
                        <input type="text" placeholder='Debit Amount' value={debit} required onChange={(e)=>setDebit(e.target.value)} />
                        <br /><br />
                        <button>Submit</button>
                    </form>
                </div>
            
            </div>
            
          </div>
          
        </div>
    </>
  )
}

export default AddManuallyData