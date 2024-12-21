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

export const AppHeaderUI: FC<TAppHeaderUIProps> = ({ userName }) => {
  <NavLink to='/'>
    {({ isActive }) => {
      return isActive ? (
        <BurgerIcon type={'primary'} />
      ) : (
        <BurgerIcon type={'secondary'} />
      );
    }}
  </NavLink>;
  return (
    <header className={styles.header}>
      <nav className={`${styles.menu} p-4`}>
        <div className={styles.menu_part_left}>
          <>
            <NavLink to='/'>
              {({ isActive }) => {
                return isActive ? (
                  <BurgerIcon type={'primary'} />
                ) : (
                  <BurgerIcon type={'secondary'} />
                );
              }}
            </NavLink>

            <NavLink
              to='/'
              className={({ isActive }) =>
                `${styles.link} 

            ${isActive ? styles.link_active : ''}`
              }
            >
              {' '}
              <p className='text text_type_main-default ml-2 mr-10'>
                Конструктор
              </p>
            </NavLink>
          </>
          <>
            <NavLink to='/feed'>
              {({ isActive }) => {
                return isActive ? (
                  <ListIcon type={'primary'} />
                ) : (
                  <ListIcon type={'secondary'} />
                );
              }}
            </NavLink>
            <NavLink
              to='/feed'
              className={({ isActive }) =>
                `${styles.link} ${isActive ? styles.link_active : ''}`
              }
            >
              {' '}
              <p className='text text_type_main-default ml-2 mr-10'>
                Лента заказов
              </p>
            </NavLink>
          </>
        </div>
        <div className={styles.logo}>
          <Link to='/'>
            <Logo className='' />
          </Link>
        </div>
        <div className={styles.link_position_last}>
          <NavLink to='/profile'>
            {({ isActive }) => {
              return isActive ? (
                <ProfileIcon type={'primary'} />
              ) : (
                <ProfileIcon type={'secondary'} />
              );
            }}
          </NavLink>
          <NavLink
            to='/profile'
            className={({ isActive }) =>
              `${styles.link} ${isActive ? styles.link_active : ''}`
            }
          >
            {' '}
            <p className='text text_type_main-default ml-2 mr-10'>
              {userName || 'Личный кабинет'}{' '}
            </p>
          </NavLink>
        </div>
      </nav>
    </header>
  );
};
