import React, { useState, useEffect } from 'react';
import FirstGraph from '../../graph/FirstGraph';
import PieChart from '../../graph/PieChart';
import BarGraphDashBoard from '../../graph/BarGraphDashBoard';
import { Box, Card, CardContent, Container,Grid } from '@mui/material';

const Dashboard = () => {
  // Helper to generate random candlestick data

  return(
    <>
    <Container maxWidth={"xl"}>
      <Grid container spacing={3}>
         <Grid item xs={12} sx={{mt:"20px"}}>
         <Card sx={{width:"100%",height:"100%"}}>
                <CardContent>
                  <FirstGraph/>
                </CardContent>
          </Card>
         </Grid>
         <Grid item md={7} xs={12}>
         <Card sx={{width:"100%",height:"100%"}}>
                <CardContent>
                  <BarGraphDashBoard/>
                </CardContent>
          </Card>
         </Grid>
         <Grid item md={5} xs={12}>
         <Card sx={{width:"100%",height:"100%"}}>
                <CardContent>
                <PieChart/>
                </CardContent>
          </Card>
         </Grid>
      </Grid>
    </Container>
    </>
  )
};

export default Dashboard;
