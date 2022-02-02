import { configureStore } from '@reduxjs/toolkit'
import userDataReducer from './reducers/userDataSlice';
import appDataReducer from './reducers/appDataSlice';

export default configureStore({
  reducer: {
    userData: userDataReducer,
    appData: appDataReducer
  }
})