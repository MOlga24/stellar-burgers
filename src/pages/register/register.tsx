/* eslint-disable */
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import {  useSelector } from 'react-redux';
import { useDispatch, AppDispatch } from '..//..//services/store';
import { addUser, fetchUserLog, fetchUserReg, getuserRegSelector, logUser } from '..//..//services/slices/Regslice';
import { log } from 'console';

export const Register: FC = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
const dispatch=useDispatch();const t=useSelector(addUser);
const s=useSelector(logUser)
// useEffect(() => {
// dispatch(fetchUserReg())
  
// }, [dispatch]); 
// useEffect(() => {
//   dispatch(fetchUserLog())
    
//   }, [dispatch]); 
// useSelector(getuserRegSelector)
  const handleSubmit = (e: SyntheticEvent) => {
const p= dispatch(addUser)
dispatch(fetchUserReg());
//dispatch(logUser(s.payload));
console.log(p);
console.log(s)
    e.preventDefault();
  };

  return (
    <RegisterUI
      errorText=''
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
