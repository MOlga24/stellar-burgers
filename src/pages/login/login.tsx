/* eslint-disable */
import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@store';
import { fetchUserLog, logUser } from '..//..//services/slices/Regslice';
import { fetchWithRefresh, getUserApi } from 'src/utils/burger-api';
import { loginUser } from '..//..//services/thunk/user';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [login, setLogin] = useState(localStorage.getItem('login')||'');
	// const [password, setPassword] = useState('');
	// const onChangeLogin: React.ReactEventHandler<HTMLInputElement> = (e) => {
	// 	//localStorage.setItem('login',e.currentTarget.value);
	// 	setLogin(e.currentTarget.value);
	// };
	// const onChangePassword: React.ReactEventHandler<HTMLInputElement> = (e) => {
	// 	setPassword(e.currentTarget.value);
	// };
  const dispatch = useDispatch<AppDispatch>();  
  const handleSubmit = (e: SyntheticEvent) => {
    const userData={email:email,password:password}	 
  //  localStorage.setItem('login',login)	
    if (!userData.email || !userData.password) {
			return;
		}
		dispatch(loginUser(userData)); 
  e.preventDefault();
  };

  return (
    <LoginUI
      errorText=''
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
