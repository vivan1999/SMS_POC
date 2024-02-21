import React from 'react';
import Toolbar from '@mui/material/Toolbar';
import { Box, styled } from '@mui/system';
import SideBar from './Custom_sidebar';
import { Avatar, IconButton} from '@mui/material';
import logo from '../../assets/MTR_logo.png';
import { Logout, Notifications } from '@mui/icons-material';



const windowWidth=window.innerWidth;
console.log(windowWidth);


const AppNavBar = styled('div')(({ theme }) => ({
  backgroundColor: "black",
  padding: theme.spacing(0),
  paddingLeft:theme.spacing(10)
}));

function AppNavBarComponent() {
  return (
    <AppNavBar position="sticky" color="black" enableColorOnDark>

      <SideBar></SideBar>
      
      <div><Toolbar>
      <Avatar alt="MTR" src={logo} />
        <Box sx={{fontSize:18,color:"white"}}>MTR</Box>
        <Box sx={{width:15}}></Box>
        <Box sx={{bgcolor:"grey",width:2,height:30}}></Box>
        <Box sx={{width:15}}></Box>
        <Box sx={{fontSize:18,color:"white"}}>Stray Current Monitoring</Box>
        <Box sx={{width:windowWidth-790}}></Box>
        <Box sx={{bgcolor:"grey",width:2,height:30}}></Box>
        <Box sx={{width:15}}></Box>
        <Box sx={{fontSize:18,color:"white"}}>Siemens Xcelerator</Box>
        <Box sx={{width:15}}></Box>
        <Box sx={{bgcolor:"grey",width:2,height:30}}></Box>
        <Box sx={{width:15}}></Box>
        <IconButton><Notifications style={{color:"white",fontSize:25}}/></IconButton>
        <Box sx={{width:15}}></Box>
        <Box sx={{bgcolor:"grey",width:2,height:30}}></Box>
        <Box sx={{width:15}}></Box>
        <IconButton><Logout style={{color:"white",fontSize:25}}/></IconButton>
      </Toolbar>
      </div>
      
    </AppNavBar>
  );
}

export default AppNavBarComponent;
