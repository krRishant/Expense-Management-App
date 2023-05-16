import React, { useState } from 'react'
import './Filter.css'
import Modal from 'antd/es/modal/Modal'
import { Form, Input, Select,Button, message } from 'antd';
import Spinner from '../../components/Spinner';
import axios from 'axios';

const Filter = () => {
    const baseUrl = 'http://localhost:5050/transaction';
    const [showModel,setshowModel] = useState(false);
    const [loading,setloading] = useState(false);

    async function handleSubmit (value) {
        try {
            const user = localStorage.getItem('user');
            const userId= JSON.parse(user);
            setloading(true);
            // console.log({...value,userid:userId._id});
           const trasc_id = await axios.post(baseUrl + '/addtransaction',{...value, userid:userId._id});
           console.log(trasc_id.data.transactionid);
           setloading(false);
           message.success("Transaction added Successfully");
           setshowModel(false);

        } catch (error) {
            message.error("Failed to add transaction");
        }

    }
  return (
    <div>
        <div className='FilterBox'>
            {loading && <Spinner />}
            <div>
                <h1>Filters</h1>
            </div>
            <div>
                 <btn className='btn btn-primary' onClick={()=> setshowModel(true)}> Add New </btn>
            </div>
        </div>
        <Modal title="Add Transaction" open={showModel} onCancel={()=>setshowModel(false)}
        cancelButtonProps={{ style: { display: 'none' } }} okButtonProps={{ style: { display: 'none' } }} >
            <Form name='Add Transaction' layout="vertical" style={{fontWeight:"bolder"}} onFinish={handleSubmit}>
                <Form.Item label="Amount" name="amount" >
                    <Input type='text' />
                </Form.Item>
                <Form.Item label="Transaction Type" name="type">
                    <Select>
                        <Select.Option value="income">Income</Select.Option>
                        <Select.Option value="expense">Expense</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item label="Date" name="date">
                    <Input type='Date'/>
                </Form.Item>
                <Form.Item label="Category" name="category">
                    <Select>
                        <Select.Option value="Food">Food</Select.Option>
                        <Select.Option value="Clothes">Clothes</Select.Option>
                        <Select.Option value="Electronics">Electronics</Select.Option>
                        <Select.Option value="Grocery">Grocery</Select.Option>
                        <Select.Option value="Health">Health</Select.Option>
                        <Select.Option value="bills">Bills</Select.Option>
                        <Select.Option value="Cashback">Cashback</Select.Option>
                        <Select.Option value="Tax">Tax</Select.Option>
                        <Select.Option value="Salary">Salary</Select.Option>

                    </Select>
                </Form.Item>
                <Form.Item label="Reference" name="reference">
                    <Input type='text' />
                </Form.Item>
                <Form.Item label="Description" name="description">
                    <Input type='text' />
                </Form.Item>
                <div className='d-flex justify-content-end'>
                    <Button type="primary" htmlType="submit">ADD</Button>
                </div>
            </Form>


        </Modal>
    </div>
  )
}
export default Filter