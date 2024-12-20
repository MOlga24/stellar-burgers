/* eslint-disable */
import { AppDispatch, RootState, useSelector } from '..//..//services/store';
import { ProfileUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  fetchUserUpdate,
  selectLoading,
  selectRequestStatus,
  selectUser
} from '..//..//services/slices/Regslice';
import { Preloader } from '@ui';
import { TUser } from '@utils-types';

export const Profile: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector(selectLoading);
  const user = useSelector(selectUser) as TUser;
  const requestStatus=useSelector(selectRequestStatus);
  const [formValue, setFormValue] = useState({
    name: user.name,
    email: user.email,
    password: ''
  });

  useEffect(() => {
    setFormValue((prevState) => ({
      ...prevState,
      name: user?.name || '',
      email: user?.email || ''
    }));
  }, []);

  const isFormChanged =
    formValue.name !== user?.name ||
    formValue.email !== user?.email ||
    !!formValue.password;
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(
      fetchUserUpdate({
        name: formValue.name,
        email: formValue.email,
        password: formValue.password
      })     
     
    );
 

  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    setFormValue({
      name: user.name,
      email: user.email,
      password: ''
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };
  if (loading) {
    return <Preloader />;
  }
  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
    />
  );

  return null;
};
