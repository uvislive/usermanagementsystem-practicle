import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import { MoneyOutlined, SurfingOutlined } from '@mui/icons-material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useDispatch } from 'react-redux';
import { setIsDarkMode } from '../store/slices/authSlice';

const ThemeSwitch = () => {
  const [darkMode, setDarkMode] = useState(false);
  const dispatch = useDispatch();

  const handleThemeChange = async () => {
    const newMode = !darkMode; // Calculate the new mode
    setDarkMode(newMode); // Update the state
    await dispatch(setIsDarkMode(newMode)); // Dispatch the new mode
  };

  return (
    <>
      <IconButton onClick={handleThemeChange}>
        {darkMode ? (
          <DarkModeIcon sx={{ fontSize: '37px' }} />
        ) : (
          <LightModeIcon sx={{ fontSize: '37px' }} />
        )}
      </IconButton>
    </>
  );
};

export default ThemeSwitch;
