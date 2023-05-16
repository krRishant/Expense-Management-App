import React from 'react'
import Spinner from '../components/Spinner';
import "../Styles/Register.css"
import {
    Button,
    Checkbox,
    Form,
    Input,
    message, 
} from 'antd';
import { useState , useEffect} from 'react';
import { Link ,useNavigate } from 'react-router-dom';
import axios from 'axios'

const formItemLayout = {
    
    labelCol: {
      xs: {
        span: 30,
      },
      sm: {
        span: 20,
      },
    },
    wrapperCol: {
      xs: {
        span: 30,
      },
      sm: {
        span: 20,
      },
    },
  };
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 30,
        offset: 0,
      },
      sm: {
        span: 20,
        offset: 0,
      },
    },
  };
const Register = () => {
    const [loading,setloading] = useState(false);
    // const instance = axios.create({baseURL: http://localhost:5050});
    const navigate = useNavigate();
    const subimtHandler = async (values) => {
        const data = {
            name: values.Username,
            email: values.email,
            password: values.password,
        }
        console.log(data);
        try {
            setloading(true);
            await axios.post("http://localhost:5050/user/register",data)
            setloading(false);
            message.success("Registration Success");
            navigate('/login');
        } catch (error) {
            setloading(false);
            message.error("email already registered");

        }
        
    }
    useEffect(() => {
        if (localStorage.getItem('user')) {
            navigate('/');
        }
    }, [navigate]);
    return (
        <>  
            <div className='register-page'>
                {loading && < Spinner />} 
                <div className='register-container'>
                   <h1 style={{color:"black",paddingLeft:"180px",paddingTop:'2ch'}}>Register</h1> 
                
                <Form

                    {...formItemLayout}
                    className='register-form'
                    layout='vertical'
                    name="register"
                    onFinish={subimtHandler}
                    scrollToFirstError
                >
                    
                    <Form.Item
                        name="Username"
                        label="Username"
                        tooltip="What do you want others to call you?"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Username!',
                                whitespace: true,
                            },
                        ]}
                    >
                        <Input placeholder='username' />
                    </Form.Item>
            
                    <Form.Item
                        name="email"
                        label="E-mail"
                        rules={[
                            {
                                type: 'email',
                                message: 'The input is not valid E-mail!',
                            },
                            {
                                required: true,
                                message: 'Please input your E-mail!',
                            },
                        ]}
                        
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        label="Password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                        hasFeedback
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        name="confirm"
                        label="Confirm Password"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Please confirm your password!',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('Passwords that you entered do not match!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        name="agreement"
                        valuePropName="checked"
                        rules={[
                            {
                                validator: (_, value) =>
                                    value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
                            },
                        ]}
                        {...tailFormItemLayout}
                        
                    >
                        <Checkbox>
                            I have read the <Link to="/agreement">agreement</Link> 
                        </Checkbox>
                    </Form.Item>
                    <Form.Item  {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">
                            Register
                        </Button>
                    </Form.Item>

                    <Form.Item {...tailFormItemLayout}>
                            <Link to="/login" style={{color:"cyan"}}>already a user? Login</Link>
                    </Form.Item> 
                </Form>
                </div>       
            </div>
            
        </>

    )
}



export default Register