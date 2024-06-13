import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Axios from 'axios';

function Register() {
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [againPassword,setAgainPasswor] = useState('')
    const [error,setError] = useState('')
    const navigate = useNavigate()

    function validate(e){
        
        if(!name)
        {
            e.preventDefault()
            setError("Enter your name");
        }
        else if(!email || !/\S+@\S+\.\S+/.test(email))
        {
            e.preventDefault()
            setError("Enter a valid Email");
        }
        else if(!password|| password.length<8)
        {
            e.preventDefault()
            setError("Enter a minimum 8 charcter for Password");
        }
        else if(password!==againPassword)
        {
            e.preventDefault()
            setError(" Password miss match ");
        }
        else{
            e.preventDefault();
            Axios.post('http://localhost:8081/register',{name:name,email:email,password:password})
            .then((response)=>{
                    setError("")
                    console.log(response)
                    alert("Registration Successfully")
                    navigate('/login')
                }
            )
            .catch((err)=>{
                
                setError("Enter a correct Details")
            })

            // alert("registration Successful")
        }
    }


  return (
    <>

        <div className='register'>

            <div className="register-container ">
                <h2>Tracker Registration </h2>
                <div className="reg-cont-box">
                    <form  onSubmit={validate}>
                        <input type="text" placeholder='Enter your Name' value={name} required  onChange={e=>setName(e.target.value)}/><br /><br />
                        <input type="email" placeholder='Enter your Email' value={email} required onChange={e=>setEmail(e.target.value)} /><br /><br />
                        <input type="password" placeholder='Create new Password' value={password} required onChange={e=>setPassword(e.target.value)} /><br /><br />
                        <input type="password" placeholder='Enter again Password' value={againPassword} required onChange={e=>setAgainPasswor(e.target.value)}  /><br /><br />
                        { <p style={{color:'red', fontSize:'20px'}}>{error} <span><br /><br /></span></p> }
                        <button >Signup</button>
                        <Link to='/login'><button>Login</button></Link>
                        
                    </form>
                </div>
            </div>
        </div>
    </>
  )
}

export default Register