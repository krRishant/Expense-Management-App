import React, { useState } from 'react'
import { Link } from "react-router-dom"
import { UserOutlined } from '@ant-design/icons';
import { Avatar, } from 'antd';
import Avtardropbox from '../Avtardropbox';

// import Avtardropbox from '../Avtardropbox.js';
// const url = 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg';
const Headers = () => {
    const [flag, setflag] = useState(false);
    function displayuser (){
        setflag(!flag);
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">

                <div className="container-fluid" style={{backgroundColor:"#53b6b9", height:"7ch"}}>

                    <Link to="/" className="navbar-brand" style={{fontWeight:"bold",fontFamily:"papyrus"}} >Expense Management</Link>
                    {/* <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button> */}
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Avatar
                                    style={{
                                        backgroundColor: '#87d068',
                                        marginRight: '40px',

                                    }}
                                    
                                    onClick={displayuser}
                                    icon={<UserOutlined />}
                                />
                                {flag && <Avtardropbox />}
                                
                                
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

        </>

    )
}

export default Headers