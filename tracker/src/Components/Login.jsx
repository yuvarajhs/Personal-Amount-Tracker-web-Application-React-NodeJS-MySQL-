import React, { useState } from 'react'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Login() {


    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [error,setError] = useState('')

    const navigate = useNavigate()
    const data ={id:'yuvaraj@gmail.com'}

   async function validate (e){
        e.preventDefault()
        
        // if(email !== "hsyuvraj8@gmail.com")
        // {
        //     e.preventDefault()
        //     setError("Enter a registered Email");
        // }
        // else if(password !== "Raj@123")
        // {
        //     e.preventDefault()
        //     setError("Password is not correct");
        // }
        // else
        //     alert("Login Successful")
    Axios.post("http://localhost:8081/login", {
      email,
      password
    }).then((response) => {
      if(response.data.message){
        setError(response.data.message);
      }else{
        // setError("Successfully Login");
        alert('Successfully Login');
        navigate('/home',{state:{data}})
      }
    })
    .catch((err)=>setError(err.data.message))
    }
  return (
    <>
        <div className=' login register'>

            <div className=" login-container register-container ">
                <h2 >Tracker Login  </h2><br />
                <div className="login-cont-box reg-cont-box">
                    <form  onSubmit={validate}>
                        
                        <input type="email" placeholder='Enter your Email' value={email} onChange={e=>setEmail(e.target.value)} /><br /><br />
                        <input type="password" placeholder='Create new Password' value={password} onChange={e=>setPassword(e.target.value)} /><br /><br />
                        
                        { <p style={{color:'red', fontSize:'15px' }}>{error} <span><br /> <br /></span></p> }
                        <button >Signin</button>
                        
                    </form>
                </div>
            </div>
        </div>
    </>
  )
}

export default Login