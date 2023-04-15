import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import {useState} from 'react';
import Tabs from '@mui/material/Tabs';
import ConnectButton from './ConnectButton';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import dlogo from '../img/dlogo.png'
function Navbar() {
  const [value, setValue] = useState('index');
  const url = useNavigate();


  const tabHandler = (urlParam, tab) => {
    setValue(tab);
    url(urlParam);
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', color: '#fff', justifyContent: 'space-between', px: 2 }}>
      <Box><img src={dlogo} alt="Logo" height="70" /></Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Tabs
      value={value}
      textColor="inherit"
      aria-label="secondary tabs example"
      sx={{
        "& .MuiTabs-indicator": {
          backgroundColor: "#FFD700"
        }
      }}
    >
        <Tab value="index" label="Home" onClick={() => tabHandler('/', 'index')} sx={{ color: '#FFD700', justifySelf: 'center' }}/>
        <Tab value="create" label="Create Lottery" onClick={() => tabHandler('/create-lottery', 'create')} sx={{ color: '#FFD700', justifySelf: 'center' }}/>
        {/* <Tab value="leaderboard" label="Leaderboard" onClick={() => tabHandler('/leaderboard', 'leaderboard')} sx={{ color: '#FFD700', justifySelf: 'center' }}/> */}
        </Tabs>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
        <ConnectButton />
      </Box>
    </Box>
  );
}

export default Navbar;
