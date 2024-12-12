import React, { FC } from 'react';
import styles from './app-header.module.css';
import { TAppHeaderUIProps } from './type';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';

export const AppHeaderUI: FC<TAppHeaderUIProps> = ({ userName }) => (
  <header className={styles.header}>
    <nav className={`${styles.menu} p-4`}>
      <div className={styles.menu_part_left}>
        <>
          <BurgerIcon type={'primary'} />
          <p className='text text_type_main-default ml-2 mr-10'>
            <Link to='/'>Конструктор</Link>
          </p>
        </>
        <>
          <Link to='/feed/:number'>
            {' '}
            <ListIcon type={'primary'} />
          </Link>
          <Link to='/feed/:number'>
            {' '}
            <p className='text text_type_main-default ml-2'>Лента заказов</p>
          </Link>
        </>
      </div>
      <div className={styles.logo}>
        <Link to='/'>
          {' '}
          <Logo className='' />
        </Link>
      </div>
      <div className={styles.link_position_last}>
        <Link to='/profile'>
          {' '}
          <ProfileIcon type={'primary'} />
        </Link>
        <p className='text text_type_main-default ml-2'>
          <Link to='/profile'> {userName || 'Личный кабинет'}</Link>
        </p>
      </div>
    </nav>
  </header>
);
