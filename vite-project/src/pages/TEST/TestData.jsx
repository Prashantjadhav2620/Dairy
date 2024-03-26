
import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid'; 
import './TestData.css'

const columns = [
  { field: 'order_Id', headerName: 'Order ID', width: 150  ,headerClassName: 'header-color'},
  { field: 'user_Id', headerName: 'User ID', width: 150 ,headerClassName: 'header-color' },
  { field: 'email_Id', headerName: 'Email ID', width: 200 ,headerClassName: 'header-color' },
  { field: 'name', headerName: 'name', width: 200 ,headerClassName: 'header-color'},
  { field: 'mobileNo', headerName: 'mobile No', width: 140 ,headerClassName: 'header-color'},
 
  {
    field: 'addressInfo',
    headerName: 'Address Info',
    width: 200,
    headerClassName: 'header-color',
    renderCell: (params) => (
      <>
        <div style={{ marginRight: '10px' }}>{params.value.address}</div>
        <div>{params.value.pincode}</div>
      </>
    ),
  },
  {
    field: 'orderDetailsInfo',
    headerName: 'Order Details',
    width: 300,
    headerClassName: 'header-color',
    renderCell: (params) => (
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        {params.value.map((product) => (
          <div key={product.product_Id} style={{ marginRight: '10px' }}>
            <div>{product.product_Name}</div>
          </div>
        ))}
      </div>
    ),
  },
  { field: 'paymentMethod', headerName: 'Payment Method', width: 200 ,headerClassName: 'header-color' },
  
  { field: 'date', headerName: 'Date', width: 150 ,headerClassName: 'header-color' },
  { field: 'isActive', headerName: 'Is Active', type: 'boolean', width: 120 ,headerClassName: 'header-color'},
];

export default function TestData() {
  const [rows, setRows] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:2620/api/OrderInfo/getallorders');
        const apiData = response.data;

        console.log("apiData", apiData)
        const formattedData = apiData.map((item) => ({
          id: item.id || uuidv4(), 
          order_Id: item.order_Id,
          user_Id: item.user_Id,
          email_Id: item.email_Id,
          name: item.addressInfo.name,
          mobileNo: item.addressInfo.mobileNo,
          addressInfo: {
            address: item.addressInfo.address,
            pincode: item.addressInfo.pincode
            
          },
          orderDetailsInfo: item.orderDetailsInfo,
          paymentMethod: item.paymentMethod,
          date: item.date,
          isActive: item.isActive,
        }));

        setRows(formattedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); 

  return (<>
  <div>
  <Box sx={{ height: 500, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <DataGrid rows={rows} columns={columns} />
    </Box>
  </div>
   
  </>
   
  );
}
