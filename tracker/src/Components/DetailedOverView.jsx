import React, { useState } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import DownloadCSV from './DownloadCSV'

function DetailedOverView() {
    const [creditsData, setCreditsData] = useState([])
    useEffect(()=>{
      fetch('http://localhost:8081/getcredits')
      .then(res=>res.json())
      .then(data=>setCreditsData(data))
      .catch(err=>console.log(err))
    },[])

    const [debitsData, setDebitsData] = useState([])
    useEffect(()=>{
      fetch('http://localhost:8081/getDebits')
      .then(res=>res.json())
      .then(data=>setDebitsData(data))
      .catch(err=>console.log(err))
    },[])

  const [management_class, setManagementClass] = useState('management-block hidden')
  const [isManagementBarClicked,setIsManagementBarClicked] = useState('false')

  const updateManagementBar=()=>{
    if(!isManagementBarClicked){
      setManagementClass("management-block visible")
    }else{
      setManagementClass('management-block hidden')
    }

    setIsManagementBarClicked(!isManagementBarClicked)
  }


  const [detailed_credits_class, setDetailedCredits] = useState('detailed-credits visible')
  const [detailed_debits_class, setDetailedDebits] = useState('detailed-debits hidden')
  const [credit_btn_class, setCreditBtnClass] = useState('color-blue')
  const [debit_btn_class, setDebitBtnClass] = useState(' transparent')

  const creditsUpdate=()=>{
    setDetailedCredits('detailed-credits visible')
    setDetailedDebits('detailed-debits hidden')
    setCreditBtnClass('color-blue')
    setDebitBtnClass('transparent')
  }
  const debitsUpdates=()=>{
    setDetailedCredits('detailed-credits hidden')
    setDetailedDebits('detailed-debits visible')
    setCreditBtnClass('transparent')
    setDebitBtnClass('color-light-blue')
  }
  return (
    <>
        <div className='nav-2'>
            <div className='management-bar' onClick={updateManagementBar} >
                <i class="fa-solid fa-list-check"></i>
                <div className={management_class}>
                  <li><Link to='/personalDetails'>Change personal Details</Link></li>
                  <li><Link to='/emailIntegration'>Email Integration</Link></li>
                  <li><Link to='/managecategory'>Manage Categories</Link></li>
                  <li><Link to='/spendAlert'>Spend Alerts Limits</Link></li>

                </div>
            </div>
            <h1>Detailed OverView</h1>
            <div className='download-icon-block'>
              <Link to='/addData'><i class="fa-solid fa-plus"></i></Link>
              <div ><DownloadCSV/></div>
            </div>
        </div>
        
        <div className='overView-section'>
          <div className='detailes-heading'>
            <h3 class={credit_btn_class} onClick={creditsUpdate}>Credits details</h3>
            <h3 class={debit_btn_class} onClick={debitsUpdates}>Debit details</h3>
          </div>

          <div className="detailes-section">

            <div className={detailed_credits_class}>
              
              <table >
                <tr>
                
                  <th>Name</th>
                  <th>Date</th>
                  <th>Amount Credited</th>
                  {/* <th>Available Balance</th> */}
                
                </tr>
                { creditsData.map((d,i)=>(
                  <tr key={i}>
                    <td>{d.name}</td>
                    <td>{d.date}</td>
                    <td>{d.credit}</td>
                    {/* <td>{d.balance}</td> */}
                  </tr>
                ))
                }
              </table>
            </div>

            <div className={detailed_debits_class}>
            <table >
                <tr>
                  <th>Name</th>
                  <th>Date</th>
                  <th>Amount Debited</th>
                  {/* <th>Available Balance</th> */}
                </tr>
                {
                  debitsData.map((d,i)=>(
                    <tr key={i}>
                      <td>{d.name}</td>
                      <td>{d.date}</td>
                      <td>{d.debit}</td>
                      {/* <td>{d.balance}</td> */}
                    </tr>
                  ))
                }
              </table>
            </div>
            
          </div>
          
        </div>
       
    </>
  )
}

export default DetailedOverView



// UPDATE credits
// SET balance = new_value;

