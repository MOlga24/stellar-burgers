/* eslint-disable */
import{ AppDispatch, RootState} from 'src/services/store';
import { ProfileUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  getUserEmail, getUserName } from '..//..//services/slices/Regslice';
import { fetchUserOrders } from '..//..//services/slices/orderSlice';


export const Profile: FC = () => {
  const dispatch=useDispatch<AppDispatch>();

const userName=useSelector((state: RootState) => state.userReg.user);


  /** TODO: взять переменную из стора */
  const user = {
    name:  userName.name,
    email: userName.email
  };

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
  const handleSubmit = (e: SyntheticEvent) => {e.preventDefault();
         
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
