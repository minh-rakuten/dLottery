import {useState, useEffect} from 'react'
import { ethers } from 'ethers';
import { useEthers } from '@usedapp/core'
import LotteryGeneratorABI from '../abi/LotteryGeneratorABI'
import dLotterySpinnerABI from '../abi/dLotterySpinnerABI.json'
import {Card, Grid, Typography, Button, TextField} from "@mui/material";
import { useNavigate } from 'react-router-dom';




function ActiveLotteriesList() {
  const { account } = useEthers()


  const [lotteryList, setLotteryList] = useState([])
  const [stake, setStake] = useState(0)

  // Create the contract instance
  const LotteryGeneratorAddress = '0x6343b3e5e69C8d8310D4D577E474cF38af004391';
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(LotteryGeneratorAddress, LotteryGeneratorABI, signer);

  // Lottery Spinner Functions

  const navigate = useNavigate();

  function handleClick() {
    navigate('/');
  }

  const handleStakeAmount = (e) => {
    setStake(e)
  }

  const getLotteryData = async () => {
    const lotteryCount = await contract.count() - 1
    console.log(`Lottery count: ${lotteryCount}`)
    let newLotteryList = []

    for(let i = 0; i <= lotteryCount; i++){
      const res = await contract.lotteries(i)
      newLotteryList.push(res)
    }

    console.log(newLotteryList)
    setLotteryList(newLotteryList)
    console.log(lotteryList)
  }

  useEffect(() => {
    getLotteryData()
  }, [])

  async function enterLottery(address) {
    try {
      console.log(address)
      const spinnerContract = new ethers.Contract(address, dLotterySpinnerABI, signer);
      const tx = await spinnerContract.enterLottery({ value: (Number(stake)*(10**18)).toString() });      
      await tx.wait();
      console.log(`Transaction hash: ${tx.hash}`);
      const receipt = await provider.getTransactionReceipt(tx.hash);      
    } catch (error) {
      console.error(error);
    }
  }

  async function pickWinner(address) {
    try {
      console.log(address)
      const spinnerContract = new ethers.Contract(address, dLotterySpinnerABI, signer);
      const tx = await spinnerContract.pickWinner();      
      await tx.wait();
      console.log(`Pickwinnert Transaction hash: ${tx.hash}`);
      const receipt = await provider.getTransactionReceipt(tx.hash);      
    } catch (error) {
      console.error(error);
    }
  }

  async function claimPrize(address) {
    try {
      console.log(address)
      const spinnerContract = new ethers.Contract(address, dLotterySpinnerABI, signer);
      const tx = await spinnerContract.claimPrize();      
      await tx.wait();
      console.log(`Pickwinnert Transaction hash: ${tx.hash}`);
      const receipt = await provider.getTransactionReceipt(tx.hash);      
    } catch (error) {
      console.error(error);
    }
  }
  

  return (
    <div className="activeLotteriesDiv">
        <Typography variant="h4" sx={{ color: '#fff', mt: 5, textAlign: "left" }}><strong>Active Lotteries</strong></Typography>
        <Grid container spacing={2} sx={{mt: 1, width: '100%'}}> 
            {
              lotteryList.map(lottery => (
                <Grid key={lotteryList.indexOf(lottery)} item xs={12} sm={6} md={3} sx={{ alignItems: 'flex-start' }}>
                  <Card sx={{ color: '#4B0082', height: '100%', padding: '20px', cursor: 'pointer', transition: 'transform 0.2s ease', '&:hover': { transform: 'scale(1.03)' }, }} onClick={() => handleClick('/lottery/3')} >              
                    <Typography variant="h5" gutterBottom><strong>Lottery Type: {lottery.lotteryType.toString() === '0' ? "Spinner" : "NFT"}</strong></Typography>
                    <Typography variant="body1" sx={{marginBottom: '10px', color: '#9400D3'}}>Type: {( lottery.minDepositPerUserInCoins.toString() === lottery.maxDepositPerUserInCoins.toString() ? 'Fixed' : 'Variable' )}</Typography>
                    {lottery.lotteryType.toString() === '0' && <Typography variant="body1" sx={{marginBottom: '10px', color: '#9400D3'}}>Min: {lottery.minDepositPerUserInCoins.toString()} ETH | Max: {lottery.maxDepositPerUserInCoins.toString()} ETH</Typography>}
                    {lottery.lotteryType.toString() === '1' && <Typography variant="body1" sx={{marginBottom: '10px', color: '#9400D3'}}>Ticket Price: {lottery.maxDepositPerUserInCoins.toString()} ETH</Typography>}
                    <Typography variant="body2" sx={{marginBottom: '25px', color: '#FFA000'}}>{lottery.deadLineInDays.toString()} days left</Typography>
                    <TextField label="Enter a stake" onChange={e => handleStakeAmount(e.target.value)} variant="outlined"  type='number' fullWidth sx={{ color: '#4B0082', mb: 3, "& label.Mui-focused": { color: '#4B0082', borderColor: '#ffa000' } }} InputProps={{ endAdornment: 'ETH' }} />
                    <Button onClick={e => enterLottery((lottery.lotteryAddress))} variant="contained" sx={{ width: '100%', marginBottom: '20px', backgroundColor: '#4B0082', color: '#fff', '&:hover': { backgroundColor: '#ffa000' }, '&:active': { backgroundColor: '#ff8f00' } }}> <strong>Join Lottery</strong> </Button>
                    {
                      (lottery.lotteryOwner === account && <Button onClick={e => pickWinner((lottery.lotteryAddress))} type="submit" variant="contained" sx={{ width: '100%', marginBottom: '20px', backgroundColor: '#ffb400', color: '#ffff', '&:hover': { backgroundColor: '#ffa000' }, '&:active': { backgroundColor: '#ff8f00' } }}>
                      <strong>Pick Winner</strong>
                    </Button> )
                    }

                    <Button onClick={e => claimPrize((lottery.lotteryAddress))} type="submit" variant="contained" sx={{ width: '100%', backgroundColor: '#9400D3', color: '#ffff', '&:hover': { backgroundColor: '#ffa000' }, '&:active': { backgroundColor: '#ff8f00' } }}>
                      <strong>Claim Reward</strong>
                    </Button>
                  </Card>
                </Grid>
              )) 
            }
        </Grid>
    </div>
  )

}

export default ActiveLotteriesList
