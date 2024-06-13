import React, { useEffect, useState } from 'react'
import logo from '../Assets/logo.png'
import { Link, useLocation } from 'react-router-dom'
import HalfPieChart from './PieChart'
import PieChart from './PieChart'
import CreditPieChart from './CreditPieChart'

function Home() {
    const location = useLocation()
    const data = location.state;

    


    const [name, setName]= useState('')
    const [email, setEmail] = useState('')
    useEffect(()=>{
      fetch('http://localhost:8081/getUser')
      .then(res=>res.json())
      .then(data=>{
        setName(data[0].name);
        setEmail(data[0].email)
        console.log(data)
      })
      
      .catch(err=>console.log(err))

    },[name,email])


    

    const [credits, setCredits] = useState('')
    const [debits, setDebits] = useState('')
    const [balance, setBalance] = useState('')


    useEffect(()=>{
      fetch('http://localhost:8081/totalCredits')
      .then(res=>res.json())
      .then(data=>{
        setCredits(data[0].totalCredits);
        setBalance(credits-debits)
      })
      
      .catch(err=>console.log(err))
    },[credits,debits])

    useEffect(()=>{
      fetch('http://localhost:8081/totalDebits')
      .then(res=>res.json())
      .then(data=>{
        setDebits(data[0].totalDebits)
        setBalance(credits-debits)
      })
      .catch(err=>console.log(err))
    },[])




    const [debitAlert, setDebitAlert] = useState('')
    useEffect(()=>{
      fetch('http://localhost:8081/getDebitAlert')
      .then(res=>res.json())
      .then(data=>{
        let amt=data[0].amount
        if(amt < debits)
          setDebitAlert("Your monthly Debit is more than "+amt);
      
      })

    })


  

  const [burger_class,setBurgerClass] = useState("burger-bar unclicked")
  const [menu_class,setMenuClas] = useState(" menu hidden")
  const [isMenuClicked,setIsMenuClicked] = useState(false)

  const [profile_class, setProfileClass] = useState("profile-block hidden")
  const [isProfileClicked,setIsProfileClicked] = useState(false)

  const updateMenu=()=>{
    if(!isMenuClicked){
      setBurgerClass("burger-bar clicked")
      setMenuClas("menu visible")
    }
    else{
      setBurgerClass(" unclicked")
      setMenuClas("menu hidden")
    }
    setIsMenuClicked(!isMenuClicked)
  }
  function updateProfile(){
    if(!isProfileClicked){
      setProfileClass("profile-block visible")
      
    }
    else{
      
      setProfileClass("profile-block hidden")
    }
    setIsProfileClicked(!isProfileClicked)
  }
  return (
    <>
      <div className='home'>
        <div className='home-nav'>
            <div className='amberger'onClick={updateMenu} > 
              <div className={burger_class} > <i class=" fa-solid fa-bars" ></i></div>
            </div>
            <div className={menu_class}>
                <ul>
                  <li><Link to='/home'> Home</Link></li> <br />
                  <li><Link to="/trends">Category & Trends</Link></li> <br />
                  <li> <Link to='/overView'>Detailed OverView</Link></li> <br />
                </ul>
            </div>

            <h1>Dashboard</h1>
            <div className='profile' onClick={updateProfile}> <i class="fa-solid fa-user" ></i> 
              <div className={profile_class}>
                    <div>
                      <p>{name}</p>
                      <p>{email}</p>
                        <Link to='/login'> <i class="fa-solid fa-right-to-bracket"></i> <span>Logout</span></Link>
                        
                    </div>
              </div>
            </div>

        </div>

        <div id='main-logo'><img  src={logo} alt="" /></div>

        <div className='section'>
          <div className='credits sec-container'>
            <h2>Credits </h2>
            <br />
            {
              <h3>₹ {credits}</h3>
            }

          </div>
          <div className='balance sec-container'>
            <h2>Balance </h2>
            <br />
            {
              <h3>₹ {balance}</h3>
            }
          </div>
          <div>
            <div className='debits sec-container'>
              <h2>Debits </h2>
              <br />
              { <h3>₹ {debits}</h3> }
            </div>
            <br />
            <p style={{color:'red'}}>{debitAlert}</p>
          </div>
        </div >
            
          
        
           <div className='pieChart-sec'>
            {/* <Link to='/overView'>
              <div className='credit-pieChart'>
                <CreditPieChart/>
              </div>
            </Link>
              */}
           <Link to='/overView'>
              <div className='debit-pieChart'>
                <PieChart/>
              </div>
           </Link>
              
           </div>
          
        
      </div>
    </>
  )
}

export default Home