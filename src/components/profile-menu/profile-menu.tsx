/* eslint-disable */
import { FC} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '..//..//services/store';
import { fetchUserLogOut} from '..//..//services/slices/Regslice';
import { deleteCookie } from '..//..//utils/cookie';


 
export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const handleLogout = async() => {
    try{ 
       await dispatch(fetchUserLogOut())
   .unwrap();
   navigate('/')
  }
    catch(error){
      console.error('не удалось выгрузить пользователя',error)
    };
   
  };
  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
