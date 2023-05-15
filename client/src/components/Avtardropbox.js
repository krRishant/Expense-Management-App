import React from 'react'
import './Avtardropbox.css'
import { Link } from 'react-router-dom'
import { Button } from 'antd'
const Avtardropbox = () => {
  return (
    <>
        <div className='sub-menu-wrap'>
            <div className='sub-menu'>
              <Link className='sub-menu-link'>
                <img src='./images/profile.png'/>
                <p>Edit Profile</p>
              </Link>
              <Link className='sub-menu-link'>
                <img src='./images/setting.png'/>
                <p>Edit Profile</p>
              </Link>
              <Button type="primary" htmlType="submit" className="login-form-button">
                Log in
              </Button>
            </div>
        </div>
    </>


  )
}

export default Avtardropbox