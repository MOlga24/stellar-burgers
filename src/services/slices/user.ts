import { createSlice } from '@reduxjs/toolkit';
/* eslint-disable */
import { isActionPending, isActionRejected } from '..//..//..//src/utils/redux'
import { checkUserAuth, loginUser, registerUser } from '../thunk/user';
import { RequestStatus, UserDto } from '@utils-types';

export const sliceName = 'user';
export const USER_SLICE_NAME = 'user';
export interface TUserState {
	isAuthChecked: boolean;
	data: UserDto | null;
	requestStatus: RequestStatus;
}

const initialState: TUserState = {
	isAuthChecked: false,
	data: null,
	requestStatus: RequestStatus.Idle,
};

export const userSlice = createSlice({
	name: USER_SLICE_NAME,
	initialState,
	reducers: {
		authCheck: state => {
			state.isAuthChecked = true;
		},
	},
	extraReducers: builder => {
		builder
			.addCase(checkUserAuth.fulfilled, (state, action) => {
				state.data = action.payload.user;
				state.requestStatus = RequestStatus.Success;
			})
			.addCase(registerUser.fulfilled, (state, action) => {
				state.data = action.payload.user;
				state.requestStatus = RequestStatus.Success;
			})
			.addCase(loginUser.fulfilled, (state, action) => {
				state.data = action.payload.user;
				state.requestStatus = RequestStatus.Success;
			})
			.addMatcher(isActionPending(USER_SLICE_NAME), state => {
				state.requestStatus = RequestStatus.Loading;
			})
			.addMatcher(isActionRejected(USER_SLICE_NAME), state => {
				state.requestStatus = RequestStatus.Failed;
			});
	},
	selectors: {
		getUser: state => state.data,
		getIsAuthChecked: state => state.isAuthChecked,
	},
});



export const userActions = userSlice.actions;
export const userSelectors = userSlice.selectors;
