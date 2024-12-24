import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import { Link, useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import { useEffect } from 'react';
import { createUser, fetchTest } from '../../api/homeApi';
import { toast } from 'react-toastify';
import { useForm } from '../../hooks/useFormHook';
import  { PasswordField,InputField, ImageField, MobileField, SelectField } from '../../utils/InputField';
import { SIGNUP_SCHEMA } from '../../validationUtil/validationschemas/commonSchemas';
import apiClient from '../../api/apiClient';
import { Grid, MenuItem } from '@mui/material';
import {ROLE_CONSTANTS_LIST }  from "../../constants/optionsConstant"
// import AppTheme from '../shared-theme/AppTheme';
// import { GoogleIcon, FacebookIcon, SitemarkIcon } from './CustomIcons';
// import ColorModeSelect from '../shared-theme/ColorModeSelect';


const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  [theme.breakpoints.up('sm')]: {
    width: '450px',
  },
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
  height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
  minHeight: '100%',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    zIndex: -1,
    inset: 0,
    backgroundImage:
      'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
    backgroundRepeat: 'no-repeat',
    ...theme.applyStyles('dark', {
      backgroundImage:
        'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
    }),
  },
}));

export default function SignUp(props) {
 
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
      const res = await apiClient.post("/api/users/signup", values);
      if(res.status==200){
          navigate("/");
          toast.success("User Registered!")
      }
    } catch (error) {
      console.log("error", error);
      toast.error("Something Went Wrong!")
    }finally{
      resetForm();
    }
  };


  const formik=useForm(initialState,handleSubmit,SIGNUP_SCHEMA);

  const {values,registerField,errors,resetForm}=formik;



  // options 
  
const RoleOptions= ROLE_CONSTANTS_LIST?.map((element,idx)=>{
  return <MenuItem key={idx} value={element.value}>{element.label}</MenuItem>
})


  return (
    // <AppTheme {...props}>
    //   <CssBaseline enableColorScheme />
    //   <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }} />
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        position: "relative",
        background: "url('/stockbg.jpg') no-repeat center center",
        overflow: "hidden", // Disables the scrollbar
        backgroundSize: "cover", // Ensures the image covers the entire viewport
      }}
    >
      <SignUpContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          {/* <SitemarkIcon /> */}
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
          >
            Sign up
          </Typography>
          <Typography
            variant="body2"
            fontSize="13px"
            sx={{ color: "red",py:0,my:0 }}
          >
            <span>Note*: </span>
            Admin registration is provided for ease of use.
          </Typography>
          <Box
            component="form"
            onSubmit={formik.handleSubmit}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <Grid container spacing={.5}>
              <Grid item xs={12}>
                <InputField
                  name="name"
                  size="small"
                  label="Enter Your Name"
                  value={values.name}
                  formik={formik}
                />
              </Grid>

              <Grid item xs={12}>
                <InputField
                  name="email"
                  size="small"
                  label="Enter Your Email Address"
                  value={values.email}
                  formik={formik}
                />
              </Grid>

              <Grid item xs={12}>
                <PasswordField
                  type="password"
                  name="password"
                  size="small"
                  label="Enter Your Password"
                  value={values.password}
                  formik={formik}
                />
              </Grid>

              <Grid item xs={12}>
                <MobileField
                  name="phone"
                  size="small"
                  label="Enter Your PhoneNumber "
                  value={values.phone}
                  formik={formik}
                />
              </Grid>

              <Grid item xs={12}>
                <SelectField 
                type="select" 
                label="Select Role" 
                name="roleId"
                 value={values.roleId}
                 formik={formik}
                 selectedItems={RoleOptions}
                //  onChange={formik.handleChange}
                />
              </Grid>
            </Grid>

            <Button type="submit" fullWidth variant="contained">
              Sign up
            </Button>
          </Box>
          <Divider>
            <Typography sx={{ color: "text.secondary" }}>or</Typography>
          </Divider>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Typography sx={{ textAlign: "center" }}>
              Already have an account?{" "}
              <Link to="/" variant="body2" sx={{ alignSelf: "center" }}>
                Sign in
              </Link>
            </Typography>
          </Box>
        </Card>
      </SignUpContainer>
    </Box>
    // </AppTheme>
  );
}