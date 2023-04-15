import React from 'react'
import { useState } from "react";
import { Card, CardContent, TextField, Button } from "@mui/material";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import CardOfferTab from '../components/CardOfferTab';
function CreateLotteryForm() {

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here
    };
  return (
    <div className='mainContainer'>
        <CardOfferTab />
        <Card sx={{ color: '#4B0082', marginTop: '40px', maxWidth: 600, margin: "0 auto", padding: '20px'}}>
            <h2 className='lotteryFormHeader'>Prediction Market</h2>
            <CardContent sx={{padding: '40px'}}>
            <form onSubmit={handleSubmit}>
                <TextField label="Enter a title" variant="outlined" fullWidth sx={{ color: '#4B0082', mb: 3, "& label.Mui-focused": { color: '#4B0082', borderColor: '#ffa000' } }} InputLabelProps={{ "& .Mui-focused": { borderColor: '#ffa000' } }} />
                <TextField label="Enter a description" variant="outlined" fullWidth sx={{ color: '#4B0082', mb: 3, "& label.Mui-focused": { color: '#4B0082', borderColor: '#ffa000' } }} InputLabelProps={{ "& .Mui-focused": { borderColor: '#ffa000' } }} />
                <FormControl>
                <RadioGroup row aria-label="lotteryType" name="lotteryType" sx={{ color: "#4B0082", mb: 3, "& .Mui-checked": {color: "#ffa000"}}}>
                    <FormControlLabel value="fixed" control={<Radio />} label="Fixed" />
                    <FormControlLabel value="variable" control={<Radio />} label="Variable" />
                </RadioGroup>
                </FormControl>
                <TextField label="Minimum Stake" variant="outlined" fullWidth sx={{ color: '#4B0082', mb: 3, "& label.Mui-focused": { color: '#4B0082', borderColor: '#ffa000' } }} InputProps={{ endAdornment: 'ETH' }} InputLabelProps={{ "& .Mui-focused": { borderColor: '#ffa000' } }} />
                <TextField label="Maximum Stake" variant="outlined" fullWidth sx={{ color: '#4B0082', mb: 3, "& label.Mui-focused": { color: '#4B0082', borderColor: '#ffa000' } }} InputProps={{ endAdornment: 'ETH' }} InputLabelProps={{ "& .Mui-focused": { borderColor: '#ffa000' } }} />
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
