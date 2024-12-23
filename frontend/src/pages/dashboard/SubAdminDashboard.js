import React, { useEffect, useState } from 'react'
import apiClient, { API_BASE_URL } from '../../api/apiClient'
import { Box, Button, MenuItem } from '@mui/material'
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
import { ROLE_CONSTANTS_LIST } from '../../constants/optionsConstant'
import SubAdminView from './SubAdminView'


const getSubAdminRoleId=async(userId)=>{
  try{
   const response= await apiClient.get(`/api/users/${userId}`);
   return response?.data?.data?._id;
  }catch(error){
    console.log("error",error);
  }
}


const RoleOptions = ROLE_CONSTANTS_LIST?.filter((element) => element.label === "User")
  .map((element, idx) => {
    return <MenuItem key={idx} value={element.value}>{element.label}</MenuItem>;
  });


const SubAdminDashboard = () => {

  const[users,setUsers]=useState([]);
  const token= useSelector(state=>state.auth.token);
  const [loader,setLoader]=useState(false);


  const fetchData=async()=>{
    try{
       const decoded=jwtDecode(token);
       const subAdminRoleId= await getSubAdminRoleId(decoded.userId)
      const res=await apiClient.get(`${API_BASE_URL}/api/subadmin/clients/${subAdminRoleId}`);
      setUsers(res.data.data);
    }catch(err){
      console.log("error",err);
      toast.error(err?.response?.data.message)
    }
  }

  useEffect(()=>{
    fetchData();
  },[loader])


  const columnData = ["Name","Email","PhoneNumber","Role"];

  const [openModal,setOpenModal]=useState(false);
  const handleOpenModal=()=>{
    setOpenModal(prev=>!prev);
  }


  // formik initiallization

  const navigate=useNavigate();

  const initialState={
    name:"",
    email:"",
    password:"",
    phone:"",
    roleId:""
  }


  const handleSubmit = async (values) => {
    try {
      setLoader(true);
      const res = await apiClient.post("/api/users/signup", values);
      if(res.status==200){
          toast.success("User Registered!")
      }
    } catch (error) {
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
      <SubAdminView
        rowData={users}
        columnData={columnData}
        loader={setLoader}
      />
    {/* {openModal && (
           <AddUser
             type={'Create'}
             openModal={openModal}
             handleChange={handleOpenModal}
             formik={formik}
             values={values}
             RoleOptions={RoleOptions}
           />
         )} */}
    </>
  );
}

export default SubAdminDashboard
