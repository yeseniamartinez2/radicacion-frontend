import { createSlice } from '@reduxjs/toolkit'

export const userDataSlice = createSlice({
  name: 'userData',
  initialState: {
    userName: '',
    apiAccessToken: '',
    msGraphAccessToken: '',
    email: '',
    roles: null,
    admin: false
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
    },
    updateRoles: (state, action) => {
      state.roles = action.payload.roles
    },
    updateAdminStatus: (state, action) => {
      state.admin = action.payload
    }
  }
})

export const { 
  updateName, 
  updateMSAccessToken, 
  updateEmail, 
  updateApiAccessToken, 
  updateRoles, 
  updateAdminStatus 
} = userDataSlice.actions

export default userDataSlice.reducer