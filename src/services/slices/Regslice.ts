/* eslint-disable */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getIngredientsApi, loginUserApi, registerUserApi, TLoginData, TRegisterData} from '@api';

export interface UserRegState {
  user: TRegisterData;
  isLoading: boolean;
  error: null | undefined;
}
export interface UserLogState {
  user: TLoginData;
  isLoading: boolean;
  error: null | undefined;
}
export const initialState: UserRegState  = {
  user: {email:'', name: '', password:''},
  isLoading: false,
  error: null
};
export const loginState: UserLogState  = {
  user: {email:'', password:''},
  isLoading: false,
  error: null
};

export const fetchUserReg = createAsyncThunk('userReg/fetchUserReg', async () => {
  const newReg = await registerUserApi(initialState.user);
  return newReg;
});

export const fetchUserLog = createAsyncThunk('userLog/fetchUserlog', async () => {
  const newLog = await loginUserApi(loginState.user);
  return newLog;
});
export const userRegSlice = createSlice({
  name: 'userReg',
  initialState,
  reducers: { 
   addUser(state,action){state.user.name=action.payload.name;
    state.user.email=action.payload.email;
    state.user.password=action.payload.password;
    state.isLoading=false;
   },
   logUser(state,action){state.user.name=action.payload.name;
    state.user.email=action.payload.email;
    state.user.password=action.payload.password;
    state.isLoading=false;
   }
   

    },
  selectors: {
    getuserRegSelector: (state) => {
      return state; },
  
      isLoadingSelector: (state) => {
      return state.isLoading;   }
   
 
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserReg.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.isLoading = false;
      
    });
  }
});


export const {addUser, logUser} =userRegSlice.actions
export const { getuserRegSelector,isLoadingSelector } = userRegSlice.selectors;
export default userRegSlice.reducer;
