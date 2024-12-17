/* eslint-disable */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getIngredientsApi,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  TRegisterData
} from '..//..//utils/burger-api';
import { deleteCookie, setCookie } from '..//..//utils/cookie';
import { RequestStatus, TUser, UserRegisterBodyDto } from '@utils-types';

// export interface UserRegState {
//   user: TRegisterData;
//   // isLoading: boolean;
//   // error: null | undefined;
// }
export interface TUserState {
  user: UserRegisterBodyDto;
  isAuthChecked: boolean;
  requestStatus: RequestStatus;
}
export const initialState: TUserState = {
  user: { email: '', name: '', password: '' },
  isAuthChecked: false,
  requestStatus: RequestStatus.Idle
};

export const checkUserAuth = createAsyncThunk(
  `userReg/checkUserAuth`,
  async () => {
    return await getUserApi();
  }
);
export const fetchUserReg = createAsyncThunk(
  'userReg/fetchUserReg',
  async (initialState: TRegisterData) => {
    const newReg = await registerUserApi(initialState);
    console.log(newReg)
    setCookie('accessToken', newReg.accessToken);
    setCookie('refreshToken', newReg.refreshToken);
    return newReg;
  }
);
// export const getUserThunk = createAsyncThunk(
//   'users/getUser',
//   ({token}: {token: string}) =>
//       getUser({token}),
// )

export const fetchUserLog = createAsyncThunk(
  'userLog/fetchUserlog',
  async (dataUser: TLoginData) => {
    const newLog = await loginUserApi(dataUser);
    console.log(newLog)
    setCookie('accessToken', newLog.accessToken);
    setCookie('refreshToken', newLog.refreshToken);
    return newLog;
  }
);
export const logoutUser = createAsyncThunk(
  'user/logoutUser',
  (_, { dispatch }) => {
    logoutApi()
    .then(() => {
      localStorage.clear(); // очищаем refreshToken
      deleteCookie('accessToken'); // очищаем accessToken
      dispatch(userLogout()); 
      // удаляем пользователя из хранилища
    })
    .catch(() => {
      console.log('Ошибка выполнения выхода');
    });
  }
  );
export const fetchUserOut = createAsyncThunk(
  'userReg/fetchUserOut',
  async () => {
    const newLog = await logoutApi();
    deleteCookie('accessToken');
    deleteCookie('refreshToken');
    return newLog;
  }
);
export const userRegSlice = createSlice({
  name: 'userReg',
  initialState,
  reducers: {
    userLogout: (state) => {
      state.user = { email: '', name: '', password: '' };
    },
    addUser(state, action) {
      state.user.name = action.payload.user.name;
      state.user.email = action.payload.user.email;
      state.user.password = action.payload.user.password;
      state.requestStatus = RequestStatus.Success;
    },
    logUser(state, action) {
      state.user.name = action.payload.user.name;
      state.user.email = action.payload.user.email;
      state.requestStatus = RequestStatus.Success;
    },
   
  },
  selectors: {
    getUserName: (state) => {
      state.user.name;
    },
    getUserEmail: (state) => {
      state.user.name;
    },
    getIsAuthChecked: (state) => state.isAuthChecked
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkUserAuth.fulfilled, (state, action) => {
        // state.user.name = action.payload.user.name;
        // state.user.email = action.payload.user.email;
        state.user=action.payload.user,
        state.requestStatus = RequestStatus.Success;
      })
      .addCase(fetchUserReg.fulfilled, (state, action) => {
        // state.user.name = action.payload.user.name;
        // state.user.email = action.payload.user.email;
        state.user=action.payload.user,
        state.requestStatus = RequestStatus.Success;
      })
      .addCase(fetchUserLog.fulfilled, (state, action) => {
        // state.user.name = action.payload.user.name;
        // state.user.email = action.payload.user.email;
        state.user=action.payload.user
      })
      .addCase(fetchUserOut.fulfilled, (state, action) => {
        state.user.name = '';
        state.user.email = '';
    
      });
  }
});

export const { addUser, logUser, userLogout } = userRegSlice.actions;
export const { getUserName, getIsAuthChecked, getUserEmail } =
  userRegSlice.selectors;
export default userRegSlice.reducer;
