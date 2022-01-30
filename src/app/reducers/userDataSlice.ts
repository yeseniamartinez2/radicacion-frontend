import { createSlice } from '@reduxjs/toolkit'

export const userDataSlice = createSlice({
  name: 'userData',
  initialState: {
    userName: '',
    apiAccessToken: '',
    msGraphAccessToken: '',
    email: ''
  },
  reducers: {
    updateName: (state, action) => {
      state.userName = action.payload
    },
    updateMSAccessToken: (state, action) => {
      state.msGraphAccessToken = action.payload
    },
    updateApiAccessToken: (state, action) => {
      state.apiAccessToken = action.payload
    },
    updateEmail: (state, action) => {
      state.email = action.payload
    }
  }
})

export const { updateName, updateMSAccessToken, updateEmail, updateApiAccessToken } = userDataSlice.actions

export default userDataSlice.reducer