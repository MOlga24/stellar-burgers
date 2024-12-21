import { FC, FormEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { fetchUserReg, selectLoading } from '..//..//services/slices/userSlice';
import { useSelector, useDispatch } from '..//..//services/store';
import { Preloader } from '@ui';

export const Register: FC = () => {
  const dispatch = useDispatch();
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const loading = useSelector(selectLoading);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const userData = { email: email, password: password, name: userName };
    dispatch(fetchUserReg(userData));
  };

  if (loading) {
    return <Preloader />;
  }

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
