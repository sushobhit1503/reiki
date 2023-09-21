import { createSlice } from '@reduxjs/toolkit';

const userInitialState = {
  userData: {},
  loginInput: '',
  otpSessionId: '',
  sessionType: ''
};

const userSlice = createSlice({
  name: 'userSlice',
  initialState: userInitialState,
  reducers: {
    setInitialData: (state, action) => {
      state.userData = action.payload;
    },
    setLoginInput: (state, action) => {
      state.loginInput = action.payload;
    },
    setOtpSessionId: (state, action) => {
      state.otpSessionId = action.payload;
    },
    setSessionType: (state, action) => {
      state.sessionType = action.payload;
    }
  }
});

export default userSlice.reducer;
export const userActions = userSlice.actions;
