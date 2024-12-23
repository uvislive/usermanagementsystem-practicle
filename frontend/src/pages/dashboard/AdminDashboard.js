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
import AssingSubAdminToUser from '../../components/modal/AssignSubAdminToUser'
import { ROLE_CONSTANTS_LIST } from '../../constants/optionsConstant'


const RoleOptions = ROLE_CONSTANTS_LIST?.filter((element) => element.label !== "Admin")
  .map((element, idx) => {
    return <MenuItem key={idx} value={element.value}>{element.label}</MenuItem>;
  });



const AdminDashboard = () => {

  const[users,setUsers]=useState([]);
  const [loader,setLoader]=useState(false);

  // assignment List 
  const[subAdminList,setSubAdminList]=useState([]);
  const [userList,setUserList]=useState([])


  const fetchData=async()=>{
    try{
      const res=await apiClient.get(`${API_BASE_URL}/api/users/`)
      setUsers(res.data.data)
      const subAdminList=res.data.data.filter(element=> element.roleId.name=="Sub-Admin")
      const userList=res.data.data.filter(element=> element.roleId.name=="User")
      setSubAdminList(subAdminList)
      setUserList(userList)
    }catch(err){
      console.log("error",err);
    }
  }

  useEffect(()=>{
    fetchData();
  },[loader])


  const columnData = ["Name", "Email","PhoneNumber","Role"];

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
      console.log("error", error);
      toast.error("Something Went Wrong!")
    }finally{
      resetForm();
      handleOpenModal();
      setLoader(false);
    }
  };


  const formik=useForm(initialState,handleSubmit,SIGNUP_SCHEMA);

  const {values,registerField,errors,resetForm}=formik;

  
  const [assignModal,setAssignModal]=useState(false);
  const handleAssignModal=()=>{
    setAssignModal(prev=>!prev);
  }



  const subAdminState={
    subAdmin:"",
    user:""
  }
  const handleAssign=async(values)=>{
    try {
      setLoader(true);
      const data={
        userId:values.user,
        subAdminId:values.subAdmin
      }
      const res = await apiClient.post("/api/users/assign", data);
      if(res.status==200){
          toast.success("Successfully Assigned!")
      }
    } catch (error) {
      console.log("error", error);
      toast.error("Something Went Wrong!")
    }finally{
      resetForm();
      handleAssignModal();
      setLoader(false);
    }
     assignFormik.resetForm();
  }

  const assignFormik=useForm(subAdminState,handleAssign,null);

  
  return (
    <>
      <Box
        fullwidth
        sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}
      >
        <Button variant="outlined" onClick={handleAssignModal}>
          <Create />
          Assign SubAdmin To User
        </Button>
        <Button variant="outlined" onClick={handleOpenModal}>
          <Create />
          Add User
        </Button>
      </Box>
      <MainDashboard
        rowData={users}
        columnData={columnData}
        loader={setLoader}
      />
      {openModal && (
        <AddUser
          type={'Create'}
          openModal={openModal}
          handleChange={handleOpenModal}
          formik={formik}
          values={values}
          RoleOptions={RoleOptions}
        />
      )}

      {assignModal && (
        <AssingSubAdminToUser
          openModal={assignModal}
          handleChange={handleAssignModal}
          formik={assignFormik}
          values={assignFormik.values}
          subAdmins={subAdminList}
          users={userList}
        />
      )}
    </>
  );
}

export default AdminDashboard
