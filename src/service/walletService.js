import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { SITE } from "../App";

export const updateDefaultWallet = createAsyncThunk(
    'wallet/updateDefault', //! để tạo action creator tên là user/login
    async (wallet) => {
        return wallet;
    }

)
export const updatecurrentListWallet = createAsyncThunk(
    'wallet/updatecurrentListWallet', //! để tạo action creator tên là user/login
    async (userId) => {
        const resWallet = await axios.get(`${SITE}/wallet`, {
            params: {
                userId: userId,
            }

        });

        return resWallet;
    }

)