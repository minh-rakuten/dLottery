import React from 'react'
import { useState } from "react";
import { Card, CardContent, TextField, Button } from "@mui/material";
import Slider from '@mui/material/Slider';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import CardOfferTab from '../components/CardOfferTab';
import Checkbox from '@mui/material/Checkbox';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';


function CreateLotteryForm() {
  const [winningPercentage, setWinningPercentage] = useState(30);
  const [multichain, setMultichain] = useState(false);
  const [chain, setChain] = useState(['Ethereum']);


  const handleSliderChange = (event, newValue) => {
    setWinningPercentage(newValue);
  };

  const handleMultichainChange = (event) => {
    setMultichain(event.target.checked);
  };
  
  const handleChainChange = (event) => {
    setChain(event.target.value);
  };
  

  const handleSubmit = (e) => {
      e.preventDefault();

    };
  return (
    <Card sx={{ color: '#4B0082', marginTop: '40px', maxWidth: 600, margin: "0 auto", padding: '20px'}}>
    <h2 className='lotteryFormHeader'>Reverse Lottery</h2>
    <CardContent sx={{padding: '40px'}}>
      <form onSubmit={handleSubmit}>
        
        <FormLabel sx={{ color: '#4B0082' }}>Lottery Type</FormLabel>
        <RadioGroup row aria-label="lotteryType" name="lotteryType" value="fixed" sx={{ color: "#4B0082", mb: 3, "& .Mui-checked": {color: "#ffa000"}}}>
          <FormControlLabel value="fixed" control={<Radio />} label="Fixed" />
          <FormControlLabel value="variable" control={<Radio />} label="Variable" />
          <TextField label='Percentage of winners' type='number' variant='outlined' fullWidth value={winningPercentage} onChange={(e) => setWinningPercentage(e.target.value)} sx={{ color: '#4B0082', marginTop: '30px', '& label.Mui-focused': { color: '#4B0082', borderColor: '#ffa000', }, }} InputProps={{ endAdornment: '%' }} InputLabelProps={{ '& .Mui-focused': { borderColor: '#ffa000' } }} /> 
          <Slider aria-label='Winning Percentage' defaultValue={30} color='secondary' sx={{ color: '#9400D3', mb: 3 }} value={winningPercentage} onChange={handleSliderChange} />        
        </RadioGroup>

        <TextField label="ETH Amount Per Player" variant="outlined" type='number' fullWidth sx={{ color: '#4B0082', mb: 3, "& label.Mui-focused": { color: '#4B0082', borderColor: '#ffa000' } }} InputProps={{ endAdornment: 'ETH' }} InputLabelProps={{ "& .Mui-focused": { borderColor: '#ffa000' } }} />
        {/* <TextField label="Maximum Stake" variant="outlined"  type='number' fullWidth sx={{ color: '#4B0082', mb: 3, "& label.Mui-focused": { color: '#4B0082', borderColor: '#ffa000' } }} InputProps={{ endAdornment: 'ETH' }} InputLabelProps={{ "& .Mui-focused": { borderColor: '#ffa000' } }} /> */}
        <TextField label="Maximum Amount of Players" variant="outlined" fullWidth sx={{ color: '#4B0082', mb: 3, "& label.Mui-focused": { color: '#4B0082', borderColor: '#ffa000' } }} InputProps={{ endAdornment: 'ETH' }} InputLabelProps={{ "& .Mui-focused": { borderColor: '#ffa000' } }} />
        <TextField label="Duration" type='number' variant="outlined" fullWidth sx={{ color: '#4B0082', mb: 3, "& label.Mui-focused": { color: '#4B0082', borderColor: '#ffa000' } }} InputProps={{ endAdornment: 'days' }} InputLabelProps={{ "& .Mui-focused": { borderColor: '#ffa000' } }} />
        <FormLabel sx={{ color: '#4B0082' }}>Loser gets an NFT?</FormLabel>
        <RadioGroup row aria-label="loserNFT" name="winnerNFT" sx={{ color: "#4B0082", mb: 3, "& .Mui-checked": {color: "#ffa000"}}}>
            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="no" control={<Radio />} label="No" />
        </RadioGroup>
        <FormLabel sx={{ color: '#4B0082'}}>Multichain? </FormLabel>
        <FormControlLabel
          control={<Checkbox checked={multichain} onChange={handleMultichainChange} />}
          label=""
        />
        {multichain && (
          <FormControl sx={{ width: '100%', color: '#4B0082', mb: 3 }}>
            <InputLabel id="chain-select-label">Select a chain</InputLabel>
            <Select
              labelId="chain-select-label"
              id="chain-select"
              value={chain}
              label="Select a chain"
              onChange={handleChainChange}
              multiple // add this prop to enable multiple selection
            >
              <MenuItem value="Ethereum">Ethereum</MenuItem>
              <MenuItem value="Filecoin">Filecoin</MenuItem>
              <MenuItem value="Polygon">Polygon</MenuItem>
            </Select>
          </FormControl>
        )}



  
        <Button type="submit" variant="contained" sx={{ padding: '10px', width: '100%', backgroundColor: '#ffb400', color: '#4B0082', '&:hover': { backgroundColor: '#ffa000' }, '&:active': { backgroundColor: '#ff8f00' } }}>
          <strong>Generate Lottery</strong>
        </Button>
      </form>
    </CardContent>
  </Card>
  )
}

export default CreateLotteryForm;
