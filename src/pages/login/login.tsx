/* eslint-disable */
import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@store';
import { fetchUserLog, logUser } from '..//..//services/slices/Regslice';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch<AppDispatch>();  const ans= useSelector(logUser)
  const handleSubmit = (e: SyntheticEvent) => {
    const userData={email:email,password:password}	 
    console.log(userData)
    if (!userData.email || !userData.password) {
			return;
		}
		dispatch(fetchUserLog(userData));
  
    console.log(ans);   e.preventDefault();
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
