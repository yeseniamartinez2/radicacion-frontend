import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    userName: ''
  },
  reducers: {
    updateName: (state, action) => {
      state.userName = action.payload
    }
  }
})

export const { updateName } = userSlice.actions

export default userSlice.reducer