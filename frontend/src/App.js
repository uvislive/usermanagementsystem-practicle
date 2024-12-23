import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the Toastify CSS
import PageRouter from './routes/Router';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Box, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import CssBaseline from "@mui/material/CssBaseline";
import { useSelector } from 'react-redux';


function App() {

   const isDarkMode= useSelector(state=>state.auth.isDarkMode);
  //  console.log("isdarkmode",isDarkMode);


  const lightTheme = createTheme({
    palette: {
      mode: "light",
    },
  });

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

 


  return (
    <>
        <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
                <CssBaseline />


      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="App">
       <PageRouter />
      </div>
      </ThemeProvider>

    </>

  );
}

export default App;
