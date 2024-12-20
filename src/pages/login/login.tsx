/* eslint-disable */
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@store';

import { fetchWithRefresh, getUserApi, TLoginData } from '..//..//utils/burger-api';
import { Navigate} from 'react-router-dom';
import { addLoginUser } from '..//..//services/slices/user';
import { fetchUserLog,selectIsAuthenticated,userRegSlice } from '..//..//services/slices/Regslice';
import { useNavigate } from 'react-router-dom';
import { Preloader } from '@ui';
import { setCookie } from '..//..//utils/cookie';



export const Login: FC = () => {
  const [email, setEmail] = useState(localStorage.getItem('email')||'');
  const [password, setPassword] = useState('');
  const navigate=useNavigate(); 
  const dispatch = useDispatch<AppDispatch>(); 	
   
  
   const isAuthenticated = useSelector(selectIsAuthenticated)
  const handleSubmit = (e: SyntheticEvent) => {
    const userData: TLoginData ={email:email,password:password}	 
    e.preventDefault();

    if (!userData.email || !userData.password) {
			return;
		}
    
    dispatch(fetchUserLog(userData))    
   
  }
 
  
    if (isAuthenticated) {     
      return (
        <Preloader /> )};
  
  

  

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
