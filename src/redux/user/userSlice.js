import { createSlice } from "@reduxjs/toolkit";
import { login, updateUser } from "../../service/userService";

const initialState = {
    currentUser: JSON.parse(localStorage.getItem('user'))
}
const useSlice = createSlice({
    name: 'user',
    initialState,
    extraReducers: builder => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                console.log(state);
                console.log(action);
                if (action.payload.userData.accessToken) {
                    state.currentUser = action.payload.userData.userData;
                    console.log(action);
                    localStorage.setItem('user', JSON.stringify(action.payload.userData.userData))
                }

            })
            .addCase(updateUser.fulfilled, (state, action) => {
                
                console.log(state.currentUser);
                console.log(action);

                state.currentUser = {...state.currentUser, userData: action.payload}
                localStorage.setItem('user', JSON.stringify(state.currentUser))

            })
    }
})

export default useSlice.reducer;