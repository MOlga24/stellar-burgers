/* eslint-disable */
import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '..//..//services/store';
import { logoutUser } from '..//..//services/slices/Regslice';
import { fetchUserOut } from 'src/services/thunk/user';


export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const handleLogout = () => {
    // dispatch(fetchUserOut())
    dispatch((logoutUser()));
  
    
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
