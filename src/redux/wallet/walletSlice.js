import { createSlice } from "@reduxjs/toolkit";
import { login, updateUser } from "../../service/userService";
import { updateDefaultWallet, updatecurrentListWallet } from "../../service/walletService";

const initialState = {
    currentListWallet: JSON.parse(localStorage.getItem('listWallet')),
    defaultWallet: JSON.parse(localStorage.getItem('defaultWallet'))

}
const walletSlice = createSlice({
    name: 'wallet',
    initialState,
    extraReducers: builder => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                console.log(state);
                console.log(action);
                if (action.payload.userData.accessToken) {
                    state.currentListWallet = action.payload.wallet.wallets;
                    console.log(action.payload.wallet);
                    const foundWallet = action.payload.wallet.wallets.find(wallet => wallet.wallet_name === "Tiền mặt");
                    console.log(foundWallet);
                    if(foundWallet) {
                        state.defaultWallet = foundWallet;
                        localStorage.setItem('defaultWallet', JSON.stringify(foundWallet))
                    }
                    localStorage.setItem('listWallet', JSON.stringify(action.payload.wallet.wallets))
                }

            })
            .addCase(updateDefaultWallet.fulfilled, (state, action) => {
             
                state.defaultWallet = action.payload
               
                localStorage.setItem('defaultWallet', JSON.stringify(state.defaultWallet))

            })
            .addCase(updatecurrentListWallet.fulfilled, (state, action) => {
                 console.log(action.payload.data.wallets);   
                 state.currentListWallet = action.payload.data.wallets
                 localStorage.setItem('listWallet', JSON.stringify(state.currentListWallet))

                

            })
           
    }
})

export default walletSlice.reducer;