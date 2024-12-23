import React, { useEffect, useState } from 'react'
import apiClient, { API_BASE_URL } from '../../api/apiClient'
import MainDashboard from './UserView'


const UserDashboard = () => {

  const[users,setUsers]=useState([]);
  const [loader,setLoader]=useState(false);

  const fetchData=async()=>{
    try{
      const res=await apiClient.get(`${API_BASE_URL}/api/users/`)
      setUsers(res.data.data)
    }catch(err){
      console.log("error",err);
    }
  }

  useEffect(()=>{
    fetchData();
  },[loader])


  const columnData = ["Name", "Email", "Role"];




  return (
    <>
      
      <MainDashboard
        isActionButtons={false}
        rowData={users}
        columnData={columnData}
        loader={setLoader}
      />
    
    </>
  );
}

export default UserDashboard;
