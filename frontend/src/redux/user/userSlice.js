import {createSlice} from "@reduxjs/toolkit";


const initialState = {
    currentUser:null,
    errorMessage:null,
    loading:false,


};

const userSlice = createSlice(
    {
        name: 'user',
        initialState,
        reducers:
        {
            signInStart: (state) =>{
                state.loading = true;
            },
            signInSuccess:(state, action)=>
            {
                state.currentUser = action.payload;
                state.loading = false;
                state.errorMessage = null;
            },
            signInFailure:(state, action) =>
            {
                state.errorMessage = action.payload;
                state.loading = false;

            },
            updateUserStart:(state) =>
            {
                state.loading = true;
            },
            updateUserSuccess :(state, action) =>
            {
                state.currentUser = action.payload;
                state.loading = false;
                state.error = null;
            },
            updateUserFailure:(state) =>
            {
                state.errorMessage = action.payload;
                state.loading= false;
            },

        }
    }
);

export const {signInStart, signInSuccess, signInFailure, updateUserFailure, updateUserStart, updateUserSuccess} = userSlice.actions;
export default userSlice.reducer;