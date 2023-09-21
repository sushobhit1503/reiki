import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slice';

const AppStore = configureStore({
  reducer: {
    userData: userReducer
  }
});

export default AppStore;