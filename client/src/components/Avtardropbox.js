import React,{useState,useEffect} from 'react'
import './Avtardropbox.css'
import { Link, useNavigate } from 'react-router-dom'
import { Button,message } from 'antd'
const Avtardropbox = () => {
  const [userName,setUserName] = useState('');
  const navigate = useNavigate();
  useEffect(()=>{
    const user = localStorage.getItem('user');
    const {name} = JSON.parse(user);
    setUserName(name);
  },[])

  function logouthandler (){
    // console.log('logouthandler');
    localStorage.removeItem('user');
    navigate('/login');
    message.success('Successfully Logged out');
    // window.location.reload();
  }
  return (
    <>
        <div className='sub-menu-wrap'>
            <div className='sub-menu'>
              <div className='sub-menu-info'>
              <img src={require("../images/profile.jpg")} alt='rorot'/>
              <p>{userName}</p>
              </div>
              <hr></hr>
              <div className='sub-menu-logout'>
              <Link className='sub-menu-link'>
                
                <p>Edit Profile</p>
              </Link>
              <Button type="primary"  className="login-form-button" onClick={logouthandler}>
                Log Out !
              </Button>
              </div>
            </div>
        </div>
    </>


  )
}

export default Avtardropbox