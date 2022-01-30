import { createSlice } from '@reduxjs/toolkit'

const initialState = [
  { id: '1', title: 'First Post!', content: 'Hello!' },
  { id: '2', title: 'Second Post', content: 'More text' }
]

const medidasSlice = createSlice({
  name: 'medidas',
  initialState,
  reducers: {}
})

export default medidasSlice.reducer