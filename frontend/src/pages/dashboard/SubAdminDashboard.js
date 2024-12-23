import React, { useEffect, useState } from 'react'
import apiClient, { API_BASE_URL } from '../../api/apiClient'
import { Box, Button } from '@mui/material'
import { Create } from '@mui/icons-material'
import AddUser from '../../components/modal/AddUser'
import { useForm } from '../../hooks/useFormHook'
import { SIGNUP_SCHEMA } from '../../validationUtil/validationschemas/commonSchemas'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import MainDashboard from './UserView'
import { useSelector } from 'react-redux'
import { jwtDecode } from 'jwt-decode'
import AssingSubAdminToUser from '../../components/modal/AssignSubAdminToUser'


const SubAdminDashboard = () => {

  const[users,setUsers]=useState([]);
  const token= useSelector(state=>state.auth.token);
  const [loader,setLoader]=useState(false);
  // const [subRoleId,setSubRoleId]=useState("")

    const getSubAdminRoleId=async(userId)=>{
      try{
       const response= await apiClient.get(`/api/users/${userId}`);
       return response?.data?.data?.roleId?._id;
      }catch(error){
        console.log("error",error);
      }
    }


  const fetchData=async()=>{
    try{
       const decoded=jwtDecode(token);
       const subAdminRoleId= await getSubAdminRoleId(decoded.userId)
       console.log("user Info",subAdminRoleId);
      const res=await apiClient.get(`${API_BASE_URL}/api/subadmin/clients/${subAdminRoleId}`);
      console.log("sub role response ",res);
    //   setUsers(res.data.data)
    }catch(err){
      console.log("error",err);
      toast.error(err?.response?.data.message)
    }
  }

  useEffect(()=>{
    fetchData();
  },[loader])


  console.log("users are the ",users)
  const columnData = ["Name","Email", "Role"];

  const [openModal,setOpenModal]=useState(false);
  const handleOpenModal=()=>{
    setOpenModal(prev=>!prev);
  }


  // formik initiallization

  const navigate=useNavigate();
  const initialState={
    subAdmin:"",
    User:""
  }


  const handleSubmit = async (values) => {
    try {
      setLoader(true);
      console.log("values", values);
      const res = await apiClient.post("/api/users/signup", values);
      if(res.status==200){
          toast.success("User Registered!")
      }
    } catch (error) {
      console.log("error", error);
      toast.error("Something Went Wrong!")
    }finally{
      resetForm();
      handleOpenModal();
      setLoader(false);
    }
  };


  const formik=useForm(initialState,handleSubmit,null);

  const {values,registerField,errors,resetForm}=formik;

  return (
    <>
      <Box fullwidth sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button variant="outlined" onClick={handleOpenModal}>
          <Create />
           Assign SubAdmin To User
        </Button>
      </Box>
      <MainDashboard
        rowData={users}
        columnData={columnData}
        loader={setLoader}
      />
      {openModal && (
        <AssingSubAdminToUser
          openModal={openModal}
          handleChange={handleOpenModal}
          formik={formik}
          values={values}
        />
      )}
    </>
  );
}

export default SubAdminDashboard
