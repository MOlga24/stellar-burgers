/* eslint-disable */
import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from 'react-redux';
import { selectUser } from '..//..//services/slices/Regslice';

export const AppHeader: FC = () =>{
    const user=useSelector(selectUser);
    return <AppHeaderUI userName={user?.email} />;
    } 
