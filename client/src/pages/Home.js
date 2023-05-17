import React, { useState, useEffect } from 'react'
import Layout from '../components/Layouts/Layout'
import '../Styles/Home.css'
import { Button, Table, message, DatePicker } from 'antd';
import axios from 'axios';
import moment from 'moment';
import Modal from 'antd/es/modal/Modal'
import { Form, Input, Select } from 'antd';
import Spinner from '../components/Spinner';
import { AreaChartOutlined, DeleteOutlined, EditOutlined, FileAddOutlined, UnorderedListOutlined } from '@ant-design/icons';
import Analytics from '../components/Analytics';
const { RangePicker } = DatePicker;

const Home = () => {
  // const t_id = "";
  const [loading, setloading] = useState(false);
  const [t_id, sett_id] = useState("");



  //filterbaarr--------------------------------------------------------------------------
  const [frequency, setfrequency] = useState("ALL");
  const [selectedDate, setselectedDate] = useState([]);
  const [type, settype] = useState('ALL');
  const [viewformat, setviewformat] = useState('table');

  //add transaction ------------------------------------------------------------------------------------
  const baseUrl = 'http://localhost:5050/transaction';
  const [showModel, setshowModel] = useState(false);
  //  const [loading,setloading] = useState(false);

  async function handleSubmit(value) {
    try {
      const user = localStorage.getItem('user');
      const userId = JSON.parse(user);
      setloading(true);
      // console.log({...value,userid:userId._id});
      if(Editdata){
        const trasc_id = await axios.post(baseUrl + '/edittransaction', {
             payload: {
              ...value,
               userid: userId._id
             },
             transactionid: Editdata._id
           
             } );
        sett_id(trasc_id.data.transactionid);
        setloading(false);
        message.success("Transaction Updated Successfully");

      }else{
        const trasc_id = await axios.post(baseUrl + '/addtransaction', { ...value, userid: userId._id });
        sett_id(trasc_id.data.transactionid);
        console.log(trasc_id.data.transactionid);
        setloading(false);
        message.success("Transaction added Successfully");
      }
      setshowModel(false);
      setEditdata(null);

    } catch (error) {
      setloading(false);
      console.log(error);
      message.error(error.message);
      message.error("Failed to add transaction");
    }

  }


  //filter barr--------------------------------------------------------------------------------------------------
  //// edit tansaction

  const [Editdata,setEditdata] = useState(null)
 
  ////
  const deleteTransaction = async (value) => {
      try {
        setloading(true);
        const result = await axios.post(baseUrl+"/deletetransaction",{
          transactionid: value._id,
          userid: value.userid
        })
        // console.log(result);
        sett_id(result.data.transactionid);
        setloading(false);
        message.success("Transaction Deleted Successfully");
      } catch (error) {
        setloading(false);
        message.error(error.message);
      }

  }


  ///

  // gettransaction ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  const [alldata, setalldata] = useState([]);
  const getData = async () => {
    try {
      setloading(true);
      const user = JSON.parse(localStorage.getItem('user'));
      console.log(user._id)
      const result = await axios.post("http://localhost:5050/transaction/gettransaction", {
        userid: user._id,
        frequency: frequency,
        selectedDate,
        type

      })
      setloading(false);
      setalldata(result.data);
      console.log(result.data);
    } catch (error) {
      setloading(false);
      console.log(error);
      message.error(error.message);
    }

  }
  const col = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (text) => <span>{moment(text).format('DD-MM-YYYY')}</span>
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Reference',
      dataIndex: 'reference',
      key: 'reference',
    },
    {
      title: 'Action',
      render: (text,record) => (
        <div>
          <EditOutlined 
          onClick={ () => {
            setEditdata(record)
            setshowModel(true)
            }
          }
          />
          <DeleteOutlined 
          onClick={()=>{
              deleteTransaction(record); 
          }}
          />
        </div>
      )
    }
  ]
  useEffect(() => {
    getData();
    message.success("Status Upatad");
  }, [t_id, frequency, selectedDate, type])
  return (
    <Layout>
      <div className='home-container'>

        {loading && <Spinner />}
        <div className='fxbox'>
          <div>
            <h6>Select Frequency</h6>
            <Select value={frequency} onChange={(value) => setfrequency(value)} style={{ width: '14ch' }} >
              <Select.Option value="5000">All</Select.Option>
              <Select.Option value="1">Daily</Select.Option>
              <Select.Option value="7">Weekly</Select.Option>
              <Select.Option value="30">Monthly</Select.Option>
              <Select.Option value="364">Yearly</Select.Option>
              <Select.Option value="Custom">Custom</Select.Option>
            </Select>
            {frequency === 'Custom' && <RangePicker value={selectedDate} onChange={(value) => setselectedDate(value)} />}
          </div>
          <div>
            <h6>Select Type</h6>
            < Select value={type} onChange={(value) => settype(value)} style={{ width: '14ch' }} >
              <Select.Option value="ALL">ALL</Select.Option>
              <Select.Option value="income">INCOME</Select.Option>
              <Select.Option value="expense">EXPENSE</Select.Option>
            </Select>
          </div>
          <div className='switch-icons'>
            <UnorderedListOutlined className={`mx-2 ${viewformat === 'table' ? 'active-icon' : 'inactive-icon'}`} 
             onClick={() => setviewformat('table')}
            />
            <AreaChartOutlined className={`mx-2 ${viewformat === 'chart' ? 'active-icon' : 'inactive-icon'}`}  
              onClick={()=> setviewformat('chart')}
            />
          </div>
          <div>
            <button className='btn' onClick={() => setshowModel(true)}><FileAddOutlined /></button>
          </div> 
        </div>
        <Modal 
        title={Editdata ? "Edit Transaction" : "Add Transaction"} open={showModel} onCancel={() => setshowModel(false)}
          cancelButtonProps={{ style: { display: 'none' } }} okButtonProps={{ style: { display: 'none' } }} >
          <Form name='Add Transaction' layout="vertical" style={{ fontWeight: "bolder" }} onFinish={handleSubmit}
            initialValues={Editdata}
          >
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
              <Input type='Date' />
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
              <Button type="primary" htmlType="submit">{Editdata ? "UPDATE":"ADD"}</Button>
            </div>
          </Form>
        </Modal>

        <div className='home-content'>
          {viewformat === 'table' ?
           <Table pagination={{ pageSize: 7 }} columns={col} dataSource={alldata} /> :
            <Analytics allTransection={alldata} />
          }
          
        </div>

      </div>
      {/* <div>
        <Button onClick={getData}> get data </Button>
      </div> */}
    </Layout>

  )

}

export default Home