import {Card, Grid, Typography, Button} from "@mui/material";
import { useNavigate } from 'react-router-dom';




function ActiveLotteriesList() {
  const navigate = useNavigate();

  function handleClick() {
    navigate('/');
  }


  return (
    <div className="activeLotteriesDiv">
        <Typography variant="h4" sx={{ color: '#fff', mt: 5, textAlign: "left" }}><strong>Active Lotteries</strong></Typography>
        <Grid container spacing={2} sx={{mt: 1, width: '100%'}}>
          <Grid item xs={12} sm={6} md={3} sx={{ alignItems: 'flex-start' }}>
          <Card sx={{ color: '#4B0082', height: '100%', padding: '20px', cursor: 'pointer', transition: 'transform 0.2s ease', '&:hover': { transform: 'scale(1.03)' }, }} onClick={() => handleClick('/lottery/3')} >              
                <Typography variant="h5" gutterBottom><strong>Lottery Title</strong></Typography>
                <Typography variant="body1" sx={{marginBottom: '10px', color: '#9400D3'}}>Type: Fixed</Typography>
                <Typography variant="body1" sx={{marginBottom: '10px', color: '#9400D3'}}>Min: 0.1 ETH | Max: 1 ETH</Typography>
                <Typography variant="body2" sx={{marginBottom: '25px', color: '#FFA000'}}>Time Left: 2 days</Typography>
                <Button variant="contained" sx={{ width: '100%', backgroundColor: '#ffb400', color: '#4B0082', '&:hover': { backgroundColor: '#ffa000' }, '&:active': { backgroundColor: '#ff8f00' } }}> <strong>Join Lottery</strong> </Button>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ color: '#4B0082', height: '100%', padding: '20px', cursor: 'pointer', transition: 'transform 0.2s ease', '&:hover': { transform: 'scale(1.03)' }, }} onClick={() => handleClick('/lottery/3')} >              
                <Typography variant="h5" gutterBottom><strong>Lottery Title</strong></Typography>
                <Typography variant="body1" sx={{marginBottom: '10px', color: '#9400D3'}}>Type: Fixed</Typography>
                <Typography variant="body1" sx={{marginBottom: '10px', color: '#9400D3'}}>Min: 0.1 ETH | Max: 1 ETH</Typography>
                <Typography variant="body2" sx={{marginBottom: '25px', color: '#FFA000'}}>Time Left: 2 days</Typography>
                <Button variant="contained" sx={{ width: '100%', backgroundColor: '#ffb400', color: '#4B0082', '&:hover': { backgroundColor: '#ffa000' }, '&:active': { backgroundColor: '#ff8f00' } }}> <strong>Join Lottery</strong> </Button>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ color: '#4B0082', height: '100%', padding: '20px', cursor: 'pointer', transition: 'transform 0.2s ease', '&:hover': { transform: 'scale(1.03)' }, }} onClick={() => handleClick('/lottery/3')} >              
                  <Typography variant="h5" gutterBottom><strong>Lottery Title</strong></Typography>
                  <Typography variant="body1" sx={{marginBottom: '10px', color: '#9400D3'}}>Type: Fixed</Typography>
                  <Typography variant="body1" sx={{marginBottom: '10px', color: '#9400D3'}}>Min: 0.1 ETH | Max: 1 ETH</Typography>
                  <Typography variant="body2" sx={{marginBottom: '25px', color: '#FFA000'}}>Time Left: 2 days</Typography>
                  <Button variant="contained" sx={{ width: '100%', backgroundColor: '#ffb400', color: '#4B0082', '&:hover': { backgroundColor: '#ffa000' }, '&:active': { backgroundColor: '#ff8f00' } }}> <strong>Join Lottery</strong> </Button>
              </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ color: '#4B0082', height: '100%', padding: '20px', cursor: 'pointer', transition: 'transform 0.2s ease', '&:hover': { transform: 'scale(1.03)' }, }} onClick={() => handleClick('/lottery/3')} >              
                <Typography variant="h5" gutterBottom><strong>Lottery Title</strong></Typography>
                <Typography variant="body1" sx={{marginBottom: '10px', color: '#9400D3'}}>Type: Fixed</Typography>
                <Typography variant="body1" sx={{marginBottom: '10px', color: '#9400D3'}}>Min: 0.1 ETH | Max: 1 ETH</Typography>
                <Typography variant="body2" sx={{marginBottom: '25px', color: '#FFA000'}}>Time Left: 2 days</Typography>
                <Button variant="contained" sx={{ width: '100%', backgroundColor: '#ffb400', color: '#4B0082', '&:hover': { backgroundColor: '#ffa000' }, '&:active': { backgroundColor: '#ff8f00' } }}> <strong>Join Lottery</strong> </Button>
            </Card>
          </Grid>
        </Grid>
    </div>
  )
}

export default ActiveLotteriesList
