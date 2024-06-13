import React from 'react'
import { useState } from 'react'
import axios from 'axios'

function ChangePersonaldetails() {
    const [updatedName, setUpdateName] = useState('')
    const [updatedEmail, setUpdateEmail] = useState('')
    const [updatedPassword, setUpdatePassword] = useState('')

    const [updateName_class, setUpdateNameClass] = useState('updateName-block hidden')
    const [updateEmail_class, setUpdateEmailClass] = useState('updateName-block hidden')
    const [updatePassword_class, setUpdatePasswordClass] = useState('updateName-block hidden')
    const updateNameFun=()=>{
        setUpdateNameClass('updateName-block visible')
    }
    const updateEmailFun=()=>{
        setUpdateEmailClass('updateName-block visible')
    }
    const updatePasswordFun=()=>{
        setUpdatePasswordClass('updateName-block visible')
    }

    const changeName = (e) =>{
        e.preventDefault()
        axios.put('http://localhost:8081/updateName',{name:updatedName})
        .then((response)=>{
            alert("Successfully Changed")
            console.log("success")
            setUpdateName("")
        })
        .catch((err)=>console.log(err))   
    }

    const changeEmail = (e) =>{
        e.preventDefault()
        axios.put('http://localhost:8081/updateEmail',{email:updatedEmail})
        .then((response)=>{
            alert("Successfully Changed")
            console.log("success")
            setUpdateEmail("")
        })
        .catch((err)=>console.log(err))   
    }

    const changePassword = (e) =>{
        e.preventDefault()
        axios.put('http://localhost:8081/updatePassword',{password:updatedPassword})
        .then((response)=>{
            alert("Successfully Changed")
            console.log("success")
        })
        .catch((err)=>console.log(err))   
    }

  return (
    <>
    <div className='personal-details'>

        <h1 >Changing personal Details</h1>
        <div className={updateName_class}>
            <h2 onClick={e=>setUpdateNameClass('updateName-block hidden')}>X</h2>
            <h1>Changing Name </h1>
            <form action="" onSubmit={changeName}>
                <input type="text" placeholder='Enetr a Name' value={updatedName} onChange={(e)=>setUpdateName(e.target.value)}/>
                <br /><br />
                <button>Submit</button>
            </form>
        </div>
        <div className={updateEmail_class}>
            <h2 onClick={e=>setUpdateEmailClass('updateName-block hidden')}>X</h2>
            <h1>Changing Email </h1>
            <form action="" onSubmit={changeEmail}>
                <input type="text" placeholder='Enetr a Email' value={updatedEmail}  onChange={(e)=>setUpdateEmail(e.target.value)}/>
                <br /><br />
                <button>Submit</button>
            </form>
        </div>
        <div className={updatePassword_class}>
            <h2 onClick={e=>setUpdatePasswordClass('updateName-block hidden')}>X</h2>
            <h1>Changing Password </h1>
            <form action="" onSubmit={changePassword}>
                <input type="text" placeholder='Enetr a Password' value={updatedPassword} onChange={(e)=>setUpdatePassword(e.target.value)}/>
                <br /><br />
                <button>Submit</button>
            </form>
        </div>
        <div className='personal_details-container'>
            <div className='personal_details-container-block' onClick={updateNameFun}>Change Name</div>
            <div className='personal_details-container-block' onClick={updateEmailFun}>change Email</div>
            <div className='personal_details-container-block' onClick={updatePasswordFun}>Change Password</div>
            
        </div>
    </div>
    </>
  )
}

export default ChangePersonaldetails