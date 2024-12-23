import { Box, Skeleton } from '@mui/material'
import React from 'react'

const LoaderSkeleton = () => {
  return (
    <Box sx={{display:'flex',width:'100%',flexDirection:'column', gap:.5}}>
    <Skeleton animation='wave' height={40}  variant="rectangular"/>
    <Skeleton animation='wave' height={40}  variant="rectangular"/>
    <Skeleton animation='wave' height={40} variant="rectangular"   />
    <Skeleton animation='wave'height={40} variant="rectangular"  />
    <Skeleton animation='wave' height={40}  variant="rectangular"/>
    <Skeleton variant='text' animation='wave' height={40}  />
    </Box>
  )
}

export default LoaderSkeleton;
