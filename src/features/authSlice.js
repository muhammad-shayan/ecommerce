import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLoggedIn: false,
    userName: null,
    email: null,
    userID: null

}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    set_active_user: (state,action) => {
        const {userName,email,userID} = action.payload
        state.isLoggedIn = true
        state.userName = userName
        state.email = email
        state.userID = userID
    },
    reset: (state) => {
        state.isLoggedIn = false
        state.userName = null
        state.email = null
        state.userID = null
    }
  }
});

export const {set_active_user,reset} = authSlice.actions

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn
export const selectUserName = (state) => state.auth.userName
export const selectEmail = (state) => state.auth.email
export const selectUserID = (state) => state.auth.userID

export default authSlice.reducer