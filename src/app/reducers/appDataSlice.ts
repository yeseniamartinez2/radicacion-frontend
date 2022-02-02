import { createSlice } from '@reduxjs/toolkit'

const appDataSlice = createSlice({
  name: 'appData',
  initialState: {
    windowWidth: 0,
    windowHeight: 0,
    tableRows: 8
  },
  reducers: {
    updateWidth: (state, action) => {
      state.windowWidth = action.payload
    },
    updateHeight: (state, action) => {
      state.windowHeight = action.payload
    },
    updateRows: (state, action) => {
      state.tableRows = action.payload
    }
  }
})


export const { 
  updateWidth,
  updateHeight,
  updateRows
} = appDataSlice.actions

export default appDataSlice.reducer