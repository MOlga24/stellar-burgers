/* eslint-disable */
import { FC } from 'react';
import styles from './app-header.module.css';
import { TAppHeaderUIProps } from './type';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';
import { Link, NavLink } from 'react-router-dom';

export const AppHeaderUI: FC<TAppHeaderUIProps> = ({ userName }) => (
  <header className={styles.header}>
    <nav className={`${styles.menu} p-4`}>
      <div className={styles.menu_part_left}>
        <>
          <BurgerIcon type={'primary'} />

          <NavLink
            to='/'
            style={{ textDecoration: 'underline' }}
            className={({ isActive }) =>
              `text text_type_main-default ml-2 ${isActive ? styles.link_active : ''}`
            }
          >
            {' '}
            <p className='text text_type_main-default ml-2 mr-10'>
              Конструктор
            </p>
          </NavLink>
        </>
        <>
          <NavLink
            to='/feed'
            style={{ textDecoration: 'underline' }}
            className={({ isActive }) =>
              `text text_type_main-default ml-2 ${isActive ? styles.link_active : ''}`
            }
          >
            {' '}
            <ListIcon type={'primary'} />
          </NavLink>
          <NavLink
            to='/feed'
            style={{ textDecoration: 'underline' }}
            className={({ isActive }) =>
              `text text_type_main-default ml-2 ${isActive ? styles.link_active : ''}`
            }
          >
            {' '}
            <p className='text text_type_main-default ml-2'>Лента заказов</p>
          </NavLink>
        </>
      </div>
      <div className={styles.logo}>
        <Link to='/'>
          {' '}
          <Logo className='' />
        </Link>
      </div>
      <div className={styles.link_position_last}>
        <NavLink to='/profile'>
          {' '}
          <ProfileIcon type={'primary'} />
        </NavLink>

        <NavLink
          style={{ textDecoration: 'underline' }}
          to='/profile'
          className={({ isActive }) =>
            `text text_type_main-default ml-2 ${isActive ? styles.link_active : ''}`
          }
        >
          {' '}
          <p className='text text_type_main-default ml-2'>
            {userName || 'Личный кабинет'}{' '}
          </p>
        </NavLink>
      </div>
    </nav>
  </header>
);
