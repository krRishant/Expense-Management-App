import React,{useState,useEffect} from 'react'
import Layout from '../components/Layouts/Layout'
import Filter from './home/filter'
import { Button, Table, message } from 'antd';
import axios from 'axios';


const Home = () => {
  
  const [loading,setloading] = useState(false);
  const [alldata, setalldata] = useState([]);
   const getData = async () => { 
    try {
      setloading(true);
      const user = JSON.parse(localStorage.getItem('user'));
      console.log(user._id)
      const result =await axios.post("http://localhost:5050/transaction/gettransaction",{userid:user._id})
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
      title:'Reference',
      dataIndex:'reference',
      key:'reference',
    },
    {
      title: 'Action',
    }
  ]
  return (
    <Layout>
        <Filter />
        <div className='content'>
        <Table columns={col} dataSource={alldata} />
        </div>
        <div>
          <Button onClick={getData}> get data </Button>
        </div>
    </Layout>
    
  )

}

export default Home