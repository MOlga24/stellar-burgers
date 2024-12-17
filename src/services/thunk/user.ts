/* eslint-disable */
import { UserLoginBodyDto, UserRegisterBodyDto, UserResponse, UserResponseToken } from '@utils-types';
import { deleteCookie, setCookie } from '../../utils/cookie';
import { createAppAsyncThunk } from '../hooks';




export const USER_SLICE_NAME = 'user';
// создатель данных - payload creator () =>
export const checkUserAuth = createAppAsyncThunk<
UserResponse,
	void
>(
	`${USER_SLICE_NAME}/checkUserAuth`,
	async (_, { extra: api }) => {
		return await api.getUser();
	}
);

export const registerUser = createAppAsyncThunk<
UserResponseToken,
	UserRegisterBodyDto
>(
	`${USER_SLICE_NAME}/registerUser`,
	async (dataUser, { extra: api }) => {
			const data = await api.registerUser(dataUser);
			setCookie('accessToken', data.accessToken);
			setCookie('refreshToken', data.refreshToken);
			return data
	}
);

export const loginUser = createAppAsyncThunk<
UserResponseToken,
	UserLoginBodyDto

>(
	`${USER_SLICE_NAME}/loginUser`,
	async (dataUser, { extra: api }) => {
			const data = await api.loginUser(dataUser);
			setCookie('accessToken', data.accessToken);
			setCookie('refreshToken', data.refreshToken);
			return data;
	}
);
export const fetchUserOut = createAppAsyncThunk<
UserResponseToken,
	UserRegisterBodyDto
>(
	'userReg/fetchUserOut',
	async (_, { extra: api }) => {
	  const logOut = await api.logoutApi();
	  deleteCookie('accessToken');
	  deleteCookie('refreshToken');console.log(logOut);
	  return logOut; 
	}
  );
