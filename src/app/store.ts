import { configureStore } from '@reduxjs/toolkit'
import userDataReducer from './reducers/userDataSlice';
import medidasReducer from './reducers/medidasSlice';

export default configureStore({
  reducer: {
    userData: userDataReducer,
    medidas: medidasReducer
  }
})