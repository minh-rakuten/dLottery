import {useState} from 'react'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import { useNavigate } from 'react-router-dom';


function CreateOfferTab() {
  const [value, setValue] = useState(0);
  const url = useNavigate();


  const tabHandler = (urlParam, tab) => {
    setValue(tab);
    url(urlParam);
  };


  return (
<Tabs
  value={value}
  aria-label="secondary tabs example"
  sx={{
    "& .MuiTabs-indicator": {
      backgroundColor: "#FFD700",
    }
  }}
>
  <Tab value={0} label="Spinner" onClick={() => tabHandler('/create-lottery', 0)} sx={{color: '#ffa000', '&.Mui-selected': { color: '#FFD700' }}} />
  <Tab value={1} label="NFT" onClick={() => tabHandler('/create-nft-lottery', 1)} sx={{color: '#ffa000', '&.Mui-selected': { color: '#FFD700' }}} />
  <Tab value={2} label="Prediction Market" onClick={() => tabHandler('/create-prediction', 2)} sx={{color: '#ffa000', '&.Mui-selected': { color: '#FFD700' }}} />
</Tabs>
  )
}

export default CreateOfferTab