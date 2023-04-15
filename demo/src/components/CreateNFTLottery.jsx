import React from 'react'
import { useState } from "react";
import LotteryGeneratorABI from '../abi/LotteryGeneratorABI.json'
import { Card, CardContent, TextField, Button } from "@mui/material";
import { ethers } from 'ethers';
import { useEthers } from '@usedapp/core';
import Slider from '@mui/material/Slider';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import CardOfferTab from './CardOfferTab';
import Checkbox from '@mui/material/Checkbox';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';


function CreateLotteryForm() {
  const {account} = useEthers()
  const [lotteryAddress, setLotteryAddress] = useState(account)
  const [lotteryOwner, setLotteryOwner] = useState(account)
  const [lotteryType, setLotteryType] = useState(1)
  const [winningPercentage, setWinningPercentage] = useState(30)
  const [deadLineInDays, setDeadLineInDays] = useState(0)
  const [ticketPrice, setTicketPrice] = useState(0)
  const [minDepositPerUserInCoins, setMinDepositPerUserInCoins] = useState(0)
  const [maxDepositPerUserInCoins, setMaxDepositPerUserInCoins] = useState(0)
  const [looserGetNeft, setLooserGetNeft] = useState(false)
  const [maxPlayers, setMaxPlayers] = useState(0)
  const [duration, setDuration] = useState(0)
  const [multichain, setMultichain] = useState(false)
  const [chains, setChains] = useState(['Ethereum'])
  const [nftContract, setNftContract] = useState('')

  // Create the contract instance
  const LotteryGeneratorAddress = '0x4D13E4B074b49BFe57af46A1a36D00aC59317CAB';
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(LotteryGeneratorAddress, LotteryGeneratorABI, signer);



const handleSliderChange = (event, newValue) => {
  setWinningPercentage(newValue);
};

const handlePriceChange = (event) => {
  setMinDepositPerUserInCoins(event)
  setMaxDepositPerUserInCoins(event)
}


const handleSubmit = async (e) => {
  e.preventDefault();

  setLotteryType(1)

  // Call the createLottery function of the ContractGenerator contract
  await contract.createNFTLottery(
    lotteryType,
    winningPercentage,
    deadLineInDays,
    looserGetNeft,
    maxDepositPerUserInCoins, // pass same min and max for fixed
    minDepositPerUserInCoins,
    nftContract //Used for nft
  );

  const latestLotteryId = await contract.count() - 1;
  const latestLottery = await contract.lotteries(latestLotteryId);
  console.log(latestLottery.maxDepositPerUserInCoins.toString());



  console.log('Lottery created succeessfully!')
  // Clear the form
  setLotteryType(0);
  setWinningPercentage(30);
  setDeadLineInDays(1);
  setTicketPrice(0);
  setMinDepositPerUserInCoins(0);
  setMaxDepositPerUserInCoins(0);
  setLooserGetNeft(false);
  setMaxPlayers(0);
  setDuration(0);
  setMultichain(false);
  setChains(['Ethereum']);
};

  return (
    <div className="mainContainer">
      <CardOfferTab />
      <Card sx={{ color: '#4B0082', marginTop: '40px', maxWidth: 600, margin: "0 auto", padding: '20px'}}>
        <h2 className='lotteryFormHeader'>NFT Lottery</h2>
        <CardContent sx={{padding: '40px'}}>
          <form onSubmit={handleSubmit}>
            
            <FormLabel sx={{ color: '#4B0082' }}>Lottery Type</FormLabel>
            <RadioGroup row aria-label="lotteryType" name="lotteryType" value="fixed" sx={{ color: "#4B0082", mb: 3, "& .Mui-checked": {color: "#ffa000"}}}>
              <FormControlLabel value="fixed" control={<Radio />} label="Fixed" />
              <TextField label='Percentage of winners' type='number' variant='outlined' fullWidth value={winningPercentage} onChange={(e) => setWinningPercentage(e.target.value)} sx={{ color: '#4B0082', marginTop: '30px', '& label.Mui-focused': { color: '#4B0082', borderColor: '#ffa000', }, }} InputProps={{ endAdornment: '%' }} /> 
              <Slider aria-label='Winning Percentage' defaultValue={30} color='secondary' sx={{ color: '#9400D3', mb: 3 }} value={winningPercentage} onChange={handleSliderChange} />        
            </RadioGroup>

            <TextField label="Ticket Price" onChange={e => handlePriceChange(e.target.value)} variant="outlined" type='number' fullWidth sx={{ color: '#4B0082', mb: 3, "& label.Mui-focused": { color: '#4B0082', borderColor: '#ffa000' } }} InputProps={{ endAdornment: 'ETH' }} />
            <TextField label="Duration" onChange={e => setDeadLineInDays(e.target.value)} type='number' variant="outlined" fullWidth sx={{ color: '#4B0082', mb: 3, "& label.Mui-focused": { color: '#4B0082', borderColor: '#ffa000' } }} InputProps={{ endAdornment: 'days' }} />
            <FormLabel sx={{ color: '#4B0082' }}>Loser gets an NFT?</FormLabel>
            <RadioGroup onChange={(e) => setLooserGetNeft(e.target.checked)} row aria-label="loserNFT" name="winnerNFT" sx={{ color: "#4B0082", mb: 3, "& .Mui-checked": {color: "#ffa000"}}}>
                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
            <TextField onChange={(e) => setNftContract(e.target.value)} label="NFT Collection Address" type='text' variant="outlined" fullWidth sx={{ color: '#4B0082', mb: 3, "& label.Mui-focused": { color: '#4B0082', borderColor: '#ffa000' } }} InputProps={{ endAdornment: 'ETH' }} />

            {/* <FormLabel sx={{ color: '#4B0082'}}>Multichain? </FormLabel>
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
            )} */}



      
            <Button type="submit" variant="contained" sx={{ padding: '10px', width: '100%', backgroundColor: '#ffb400', color: '#4B0082', '&:hover': { backgroundColor: '#ffa000' }, '&:active': { backgroundColor: '#ff8f00' } }}>
              <strong>Generate Lottery</strong>
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
    
  )
}

export default CreateLotteryForm;
