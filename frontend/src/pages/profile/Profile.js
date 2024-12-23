import React, { useEffect, useState } from "react";
import ProfileComponent from "../../components/ProfileComponent";
import useFetchData from "../../hooks/useFetchData";
import apiClient, { API_BASE_URL } from "../../api/apiClient";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setTokenData } from "../../store/slices/authSlice";
const Profile = () => {
    
  const dispatch= useDispatch();
  const navigate=useNavigate();
    

  const [profile,setProfile]=useState({
    name:"",
    email:"",
    phone:""
  });
  const userId= useSelector(state=>state.auth.id);
  // const data= useFetchData(`${API_BASE_URL}/api/users?userId=${userId}`)
  const fetchData=async()=>{
    try{
     const response= await apiClient.get(`/api/users/${userId}`);
     setProfile(response?.data.data);
    }catch(error){
      console.log("error",error);
      toast.error(error.message)
    }
  }

  useEffect(()=>{
    fetchData();
  },[])


  const handleLogOut=()=>{
    dispatch(setTokenData({id:"",token:""}))
    localStorage.clear();
    navigate("/")
  }
  return (
    <>
      <ProfileComponent name={profile?.name} email={profile?.email} phone={profile?.phone}logout={handleLogOut} role={profile?.roleId?.name} />
    </>
  );
};

export default Profile;
