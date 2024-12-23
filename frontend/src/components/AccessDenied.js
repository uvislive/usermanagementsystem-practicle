import { ArrowBack } from '@mui/icons-material'
import { Container,Box, Typography, Button } from '@mui/material'
import React from 'react'
import './accessdenied.css'

const AccessDenied = () => {
  return (
    <>
    <div className="box">
      <div className="lock"></div>
      <div className="message">
        <h1 className='h1access'>Access to this page is restricted</h1>
        <p>
          Please check with the site admin if you believe this is a mistake.
        </p>
      </div>
      </div>
    </>
  );
}

export default AccessDenied
