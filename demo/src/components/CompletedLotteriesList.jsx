import {Card, Grid, Typography} from "@mui/material";
import { useNavigate } from 'react-router-dom';




function CompletedLotteriesList() {
  const navigate = useNavigate();

  function handleClick() {
    navigate('/');
  }


  return (
    <div className="activeLotteriesDiv">
        <Typography variant="h4" sx={{ color: '#fff', mt: 15, textAlign: "left" }}><strong>Completed Lotteries</strong></Typography>
        <Grid container spacing={2} sx={{mt: 1, width: '100%'}}>
          <Grid item xs={12} sm={6} md={3} sx={{ alignItems: 'flex-start' }}>
          <Card sx={{ color: '#4B0082', height: '100%', padding: '20px', cursor: 'pointer', transition: 'transform 0.2s ease', '&:hover': { transform: 'scale(1.03)' }, }} onClick={() => handleClick('/lottery/3')} >              
              <Typography variant="h5" gutterBottom><strong>Lottery Title</strong></Typography>
              <Typography variant="body1" sx={{color: '#9400D3'}}>Lottery Type: Fixed</Typography>
              <Typography variant="body2" sx={{color: '#FFA000'}}>Finished: 03/04/23</Typography>
          </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
           <Card sx={{ color: '#4B0082', height: '100%', padding: '20px', cursor: 'pointer', transition: 'transform 0.2s ease', '&:hover': { transform: 'scale(1.03)' }, }} onClick={() => handleClick('/lottery/3')} >              
              <Typography variant="h5" gutterBottom><strong>Lottery Title</strong></Typography>
              <Typography variant="body1" sx={{color: '#9400D3'}}>Lottery Type: Variable</Typography>
              <Typography variant="body2" sx={{color: '#FFA000'}}>Finished: 03/04/23</Typography>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ color: '#4B0082', height: '100%', padding: '20px', cursor: 'pointer', transition: 'transform 0.2s ease', '&:hover': { transform: 'scale(1.03)' }, }} onClick={() => handleClick('/lottery/3')} >              
              <Typography variant="h5" gutterBottom><strong>Lottery Title</strong></Typography>
              <Typography variant="body1" sx={{color: '#9400D3'}}>Lottery Type: Fixed</Typography>
              <Typography variant="body2" sx={{color: '#FFA000'}}>Finished: 03/04/23</Typography>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
           <Card sx={{ color: '#4B0082', height: '100%', padding: '20px', cursor: 'pointer', transition: 'transform 0.2s ease', '&:hover': { transform: 'scale(1.03)' }, }} onClick={() => handleClick('/lottery/3')} >              
              <Typography variant="h5" gutterBottom><strong>Lottery Title</strong></Typography>
              <Typography variant="body1" sx={{color: '#9400D3'}}>Lottery Type: Variable</Typography>
              <Typography variant="body2" sx={{color: '#FFA000'}}>Finished: 03/04/23</Typography>
            </Card>
          </Grid>
        </Grid>
    </div>
  )
}

export default CompletedLotteriesList
