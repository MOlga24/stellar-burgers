/* eslint-disable */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TRegisterData,
  updateUserApi
} from '..//..//utils/burger-api';
import { deleteCookie, getCookie, setCookie } from '..//..//utils/cookie';
import { UserDto } from '@utils-types';

export interface TUserState {
  user: UserDto | null;
  userCheck: boolean;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: undefined | string;
}
export const initialState: TUserState = {
  user: null,
  userCheck: false,
  isAuthenticated: false,
  isLoading: false,
  error: ''
};

export const checkUserAuth = createAsyncThunk(
  'user/checkUserAuth',
  (_, { dispatch }) => {
    if (getCookie('accessToken')) {
      dispatch(fetchUserApi()).finally(() => {
        dispatch(authChecked());
      });
    } else {
      dispatch(authChecked());
    }
  }
);

export const fetchUserReg = createAsyncThunk(
  'userReg/fetchUserReg',
  async ({ email, password, name }: TRegisterData) => {
    const newReg = await registerUserApi({ email, password, name });
    localStorage.setItem('refreshToken', newReg.refreshToken);
    setCookie('accessToken', newReg.accessToken);
    return newReg.user;
  }
);

export const fetchUserLog = createAsyncThunk(
  'userLog/fetchUserlog',
  async ({ email, password }: Omit<TRegisterData, 'name'>) => {
    const newLog = await loginUserApi({ email, password });
    localStorage.setItem('refreshToken', newLog.refreshToken);
    setCookie('accessToken', newLog.accessToken);

    return newLog;
  }
);

export const fetchUserApi = createAsyncThunk('user/getUser', async () =>
  getUserApi()
);
export const fetchUserUpdate = createAsyncThunk(
  'userLog/fetchUserupdate',
  updateUserApi
);
export const fetchUserLogOut = createAsyncThunk('user/logout', async () =>
  logoutApi()
);
export const logoutUser = createAsyncThunk(
  'user/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      await logoutApi();
      deleteCookie('accessToken');
      localStorage.clear();
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const userSlice = createSlice({
  name: 'userReg',
  initialState,
  reducers: {
    authChecked: (state) => {
      state.userCheck = true;
    }
  },
  selectors: {
    selectUser: (state) => state.user,
    selectIsCheck: (state) => state.userCheck,
    selectIsAuthenticated: (state) => state.isAuthenticated,
    getUserIsChecked: (state) => state.userCheck,
    selectLoading: (state) => state.isLoading
  },
  extraReducers: (builder) => {
    builder

      .addCase(fetchUserReg.pending, (state) => {
        state.isAuthenticated = false;
        state.user = null;
        state.isLoading = true;
      })
      .addCase(fetchUserReg.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.isLoading = false;
      })
      .addCase(fetchUserReg.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.isLoading = false;
      })
      .addCase(fetchUserApi.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.userCheck = true;
        state.isLoading = false;
        state.user = action.payload.user;
      })
      .addCase(fetchUserApi.rejected, (state) => {
        state.isAuthenticated = false;
        state.user = null;
        state.userCheck = true;
        state.isLoading = false;
      })
      .addCase(fetchUserApi.pending, (state) => {
        state.isAuthenticated = false;
        state.user = null;
        state.isLoading = true;
      })
      .addCase(fetchUserLog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUserLog.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.isLoading = false;
        state.userCheck = true;
      })
      .addCase(fetchUserLog.rejected, (state, action) => {
        state.isLoading = false;
        state.userCheck = true;
        state.error = action.error.message;
      })
      .addCase(fetchUserUpdate.fulfilled, (state, action) => {
        state.error = '';
        state.user = action.payload.user;
      })
      .addCase(fetchUserLogOut.fulfilled, (state, action) => {
        state.user = null;
        state.isAuthenticated = false;
        state.isLoading = false;
        deleteCookie('accessToken');
        localStorage.removeItem('refreshToken');
      })
      .addCase(fetchUserLogOut.rejected, (state, action) => {
        state.user = null;
        state.isAuthenticated = true;
        state.isLoading = false;
      })
      .addCase(fetchUserLogOut.pending, (state, action) => {
        if (action.payload) {
          state.isAuthenticated = true;
          state.isLoading = true;
        }
      });
  }
});

export const { authChecked } = userSlice.actions;
export const {
  selectIsAuthenticated,
  selectIsCheck,
  selectLoading,
  selectUser
} = userSlice.selectors;
export default userSlice.reducer;
