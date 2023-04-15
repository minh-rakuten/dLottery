import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

function LotteryDetails(props) {
  const { lotteryData } = props;

  if (!lotteryData) {
    return null; // or return an error message or loading spinner
  }

  return (
    <Card sx={{ maxWidth: 600, margin: '40px auto', padding: '20px' }}>
      <Typography variant='h4' sx={{ color: '#4B0082', mb: 3 }}>
        Lottery Details
      </Typography>
      <CardContent sx={{ color: '#4B0082', mb: 2 }}>
        <Typography variant='body1'>
          <strong>Lottery Type:</strong> {lotteryData.lotteryType}
        </Typography>
        <Typography variant='body1'>
          <strong>Winning Percentage:</strong> {lotteryData.winningPercentage}%
        </Typography>
        <Typography variant='body1'>
          <strong>ETH Amount Per Player:</strong> {lotteryData.ethAmountPerPlayer} ETH
        </Typography>
        <Typography variant='body1'>
          <strong>Maximum Amount of Players:</strong> {lotteryData.maxPlayers}
        </Typography>
        <Typography variant='body1'>
          <strong>Duration:</strong> {lotteryData.duration} days
        </Typography>
        <Typography variant='body1'>
          <strong>Loser gets an NFT:</strong> {lotteryData.loserNft ? 'Yes' : 'No'}
        </Typography>
        {lotteryData.loserNft && (
          <Typography variant='body1'>
            <strong>NFT Collection Address:</strong> {lotteryData.nftCollectionAddress}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}

export default LotteryDetails;
