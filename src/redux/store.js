import {configureStore} from "@reduxjs/toolkit";
import userReducer from "../redux/user/userSlice"
import walletReducer from "./wallet/walletSlice";

const store = configureStore({
    reducer : {
        users : userReducer,
        wallet : walletReducer
        
    }
})
export default store