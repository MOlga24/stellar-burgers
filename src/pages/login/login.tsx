import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@store';
import { TLoginData } from '..//..//utils/burger-api';
import {
  fetchUserLog,
  selectIsAuthenticated
} from '..//..//services/slices/userSlice';
import { useNavigate } from 'react-router-dom';
import { Preloader } from '@ui';

export const Login: FC = () => {
  const [email, setEmail] = useState(localStorage.getItem('email') || '');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const isAuthenticated = useSelector(selectIsAuthenticated);
  const handleSubmit = (e: SyntheticEvent) => {
    const userData: TLoginData = { email: email, password: password };
    e.preventDefault();

    if (!userData.email || !userData.password) {
      return;
    }

    dispatch(fetchUserLog(userData));
    navigate('/');
  };

  if (isAuthenticated) {
    return <Preloader />;
  }

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
