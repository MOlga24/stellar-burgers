/* eslint-disable */
import { ConstructorPage, Feed, ForgotPassword, Login, NotFound404, Profile, ProfileOrders, Register, ResetPassword, } from '@pages';
import '../../index.css';
import styles from './app.module.css';
import { BrowserRouter as Router, Route,Routes,Link, useNavigate, useLocation} from 'react-router-dom';
import { AppHeader,IngredientDetails,Modal,OrderInfo } from '@components';

import { useEffect } from 'react';
import { fetchBurgs, getBurgsSelector } from '@slices';
import { useDispatch, useSelector } from 'react-redux';
import  { AppDispatch, RootState } from 'src/services/store'
import { getIngredientsApi } from '@api';
import { TIngredient } from '@utils-types';

const App = () => {
  const location = useLocation();
	const background = location.state?.background;
  const navigate = useNavigate();
  const onClose =()=>{   navigate(-1);};
  return(
  <div className={styles.app}> 
  <AppHeader />
    <Routes location={background || location}>   
     <Route path="/" element={<ConstructorPage />} />       
      <Route path="/feed" element={<Feed/>} />
      <Route path="/login" element={<Login />} /> 
      <Route path="/register" element={<Register/>} />  
      <Route path="/forgot-password" element={<ForgotPassword/>} />  
      <Route path="/reset-password" element={<ResetPassword/>} />  
      <Route path="/profile" element={<Profile />} />  
      <Route path="/profile/orders" element={<ProfileOrders />} />  
      <Route path="*" element={<NotFound404 />} />   
      <Route path="/profile/orders/:number" element={<OrderInfo />} /> 
      <Route path="/ingredients/:id" element={<IngredientDetails />} /> 
      <Route path="/feed/:number" element={<OrderInfo />} /> 
      <Route path="/profile/orders/:number" element={<OrderInfo />} /> 
      </Routes>
      {background &&	<Routes >
        <Route path="/profile/orders/:number" element={<Modal title='' onClose={onClose}><OrderInfo /></Modal>} /> 
        <Route path="/feed/:number" element={<Modal title='' onClose={onClose}><OrderInfo /></Modal>} /> 
        <Route path="/ingredients/:id" element={<Modal title='' onClose={onClose}><IngredientDetails /></Modal>} /> 
			</Routes>}
  </div>)

 }
export default App;

  
