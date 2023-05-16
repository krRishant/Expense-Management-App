import React, { useState, useEffect } from 'react'
import '../Styles/Login.css'
import { Link, useNavigate } from 'react-router-dom';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, message } from 'antd';
import axios from 'axios';
import Spinner from '../components/Spinner';
const Login = () => {
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();
  const submitHandler = async (values) => {
    console.log('Success:', values);
    const data = {
      email: values.username,
      password: values.password
    }
    try {
      setloading(true);
      const response = await axios.post("http://localhost:5050/user/login", data);
      setloading(false);
      console.log(response);
      if (response.data.message === "Incorrect password") {
        message.error("Incorrect password");
      } else {
        message.success("Login successful");
        localStorage.setItem('user', JSON.stringify({ ...response.data, password: '' }));
        navigate('/');
      }

    } catch (error) {
      setloading(false);
      message.error("Invalid credentials");
    }
  }
  useEffect(() => {
    if (localStorage.getItem('user')) {
      navigate('/');
    }
  }, [navigate]);
  return (
    <>
      <div className='login-page'>
        {loading && <Spinner />}
        <div className='sub-login-page'>
        <img src={require('../images/expense-guide-1.png')} alt="expense"/>
        <div className='login-container'>
          <h1 style={{ color: "black", paddingLeft: "3.8ch", paddingBottom: "0ch" }}>Login</h1>
          <Form
            name="normal_login"
            layout="vertical"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={submitHandler}
          >
            <Form.Item
              name="username"
              label="Email"

              rules={[{
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              { required: true, message: 'Email cannot be empty' }]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username"
              />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              rules={[{ required: true, message: 'Enter Password' }]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"

              />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <Link className="login-form-forgot" to="">
                Forgot password
              </Link>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                Log in
              </Button>
              <Link to="/register" style={{ marginLeft: "110px", color: "cyan" }}>    Register now !</Link>
            </Form.Item>
          </Form>
        </div>
        </div>
      </div>
    </>

  )
}

export default Login