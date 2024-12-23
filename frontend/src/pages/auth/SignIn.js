import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import { Link, useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import { SIGNIN_SCHEMA } from '../../validationUtil/validationschemas/commonSchemas';
import apiClient from '../../api/apiClient';
import { toast } from 'react-toastify';
import { useForm } from '../../hooks/useFormHook';
import { PasswordField,InputField } from '../../utils/InputField';
import { useDispatch } from 'react-redux';
import {setTokenData} from '../../store/slices/authSlice'
import { jwtDecode } from "jwt-decode";
// import { decodeJwtToken } from '../../utils/commonMethods';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  // background:'url('/stockbg.)',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  [theme.breakpoints.up('sm')]: {
    maxWidth: '450px',
  },
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
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

export default function SignIn(props) {
 
  const navigate=useNavigate();
  const dispatch=useDispatch();

  const initialState={
    email:"",
    password:""
  }


  const handleSubmit = async (values) => {
    try {
      console.log("values", values);
      const res = await apiClient.post("/api/login/", values);
      console.log("res", res);
      if(res.status==200){
         const decodedData= jwtDecode(res.data.data.token);
         if (decodedData.role === "Admin") {
          navigate("/dashboard/admin-dashboard");
        } else if (decodedData.role === "Sub-Admin") {
          navigate("/dashboard/sub-dashboard");
        } else if (decodedData.role === "User") {
          navigate("/dashboard");
        } else {
          // navigate("/access-denied");
        }
          console.log("decoded",decodedData);
          toast.success("Successfully Logged In!")
          // const data=decodeJwtToken(res.data.Data.token);
          const payload={id: decodedData.userId,token:res?.data?.data?.token,role:decodedData?.role};
          localStorage.setItem("token",res?.data?.data?.token)
          dispatch(setTokenData(payload));
      }
    } catch (error) {
      console.log("error", error);
      toast.error("Something Went Wrong!")
    }finally{
      resetForm();
    }
  };


  const formik=useForm(initialState,handleSubmit,SIGNIN_SCHEMA);

  const {values,registerField,errors,resetForm}=formik;


  return (
    // <AppTheme {...props}>
    //   <CssBaseline enableColorScheme />
    <Box sx={{width:"100%",height:'100vh',position:"relative",
      background: "url('/stockbg.jpg') no-repeat center center",
      overflow: "hidden", // Disables the scrollbar
      backgroundSize: "cover", // Ensures the image covers the entire viewport
      }}>
      <SignInContainer direction="column" justifyContent="space-between">
        {/* <ColorModeSelec sx={{ position: 'fixed', top: '1rem', right: '1rem' }} /> */}
        <Card variant="outlined">
          {/* <SitemarkIcon /> */}
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
          >
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={formik.handleSubmit}
            noValidate
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              gap: 2,
            }}
          >
           <InputField
           name="email"
           label="Enter Your Email Address"
           value={values.email}
           formik={formik}
           />


        <PasswordField
           type='password'
           name="password"
           label="Enter Your Password"
           value={values.password}
           formik={formik}
           />
            {/* <ForgotPassword open={open} handleClose={handleClose} /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
            >
              Sign in
            </Button>
            <Link
              component="button"
              type="button"
              // onClick={handleClickOpen}
              variant="body2"
              sx={{ alignSelf: 'center' }}
            >
              Forgot your password?
            </Link>
          </Box>
          <Divider>or</Divider>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {/* <Button
              fullWidth
              variant="outlined"
              onClick={() => alert('Sign in with Google')}
              startIcon={<GoogleIcon />}
            >
              Sign in with Google
            </Button> */}
            {/* <Button
              fullWidth
              variant="outlined"
              onClick={() => alert('Sign in with Facebook')}
              startIcon={<FacebookIcon />}
            >
              Sign in with Facebook
            </Button> */}
            <Typography sx={{ textAlign: 'center' }}>
              Don&apos;t have an account?{' '}
              <Link
                to="/signup"
                variant="body2"
                sx={{ alignSelf: 'center' }}
              >
                Sign up
              </Link>
            </Typography>
          </Box>
        </Card>
      </SignInContainer>
      </Box>
    // </AppTheme>
  );
}