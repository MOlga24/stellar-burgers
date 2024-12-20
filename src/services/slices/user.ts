import { createSlice, PayloadAction } from '@reduxjs/toolkit';
/* eslint-disable */
import { isActionPending, isActionRejected } from '..//..//..//src/utils/redux'
import { checkUserAuth, fetchUserOut, loginUser} from '../thunk/user';
import { RequestStatus, UserDto } from '@utils-types';

export const sliceName = 'user';
export const USER_SLICE_NAME = 'user';
export interface TUserState {
	isAuthChecked: boolean;
	data: UserDto;
	requestStatus: RequestStatus;
}

const initialState: TUserState = {
	isAuthChecked: false,
	data: {name:'', email:''},
	requestStatus: RequestStatus.Idle,
};

export const userSlice = createSlice({
	name: USER_SLICE_NAME,
	initialState,
	reducers: {
		authCheck: state => {
			state.isAuthChecked = true;
		},
		userLogout: (state) => {
			state.data =  { email: '', name: ''};
		  },
		  addLoginUser:(state, action:PayloadAction< UserDto>)=> {
			state.data.name= action.payload.name
			state.data.email = action.payload.email;		
			state.requestStatus = RequestStatus.Success;
		  },
	},
	extraReducers: builder => {
		builder
			.addCase(checkUserAuth.fulfilled, (state, action) => {
				state.data = action.payload.user;
				state.requestStatus = RequestStatus.Success;
			})
			// .addCase(registerUser.fulfilled, (state, action) => {
			// 	state.data = action.payload.user;
			// 	state.requestStatus = RequestStatus.Success;
			// })
			.addCase(loginUser.fulfilled, (state, action) => {
				state.data = action.payload.user;
				state.requestStatus = RequestStatus.Success;
			})
			// .addCase(fetchUserOut.fulfilled, (state, action) => {
			// 	state.data.email = '';
			// 	state.data.name = '';
			// })
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



export const  {addLoginUser, userLogout } = userSlice.actions;
export const userSelectors = userSlice.selectors;
