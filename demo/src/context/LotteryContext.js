import React, { createContext, useContext, useState } from 'react'



const initialState = {
    lotteryConfig: {},
}

export const LotteryContext = createContext(initialState)


export const LotteryProvider = ({ children }) => {


    const generateLottery = (lotteryConfig) => {
        
    }

    const value = {
        generateLottery,
    }

    return (
        <LotteryContext.Provider value={value}>
            {children}
        </LotteryContext.Provider>
    )
}

export default LotteryContext;