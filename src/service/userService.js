import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { SITE } from "../App";

export const login = createAsyncThunk(
    'user/login', //! để tạo action creator tên là user/login
    async (user) => {
        const res = await axios.post(`${SITE}/users/login`, user);
        console.log(res);

        if (res.data.success) {
            const userId = res.data.userData.user_id;
            const resWallet = await axios.get(`${SITE}/wallet`, {
                params: {
                    userId: userId,
                }

            });
            const response = {
                wallet: resWallet.data,
                userData: res.data

            }
            return response;
        }

    })
export const updateUser = createAsyncThunk(
    'user/updateUser', //! để tạo action creator tên là user/updateUser
    async (user) => {
        console.log(user);
        return user
    })
