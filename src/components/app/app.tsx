/* eslint-disable */
import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';
import {
  BrowserRouter as Router,
  Route,
  Routes,

  useNavigate,
  useLocation,
  useParams
} from 'react-router-dom';
import { AppHeader, IngredientDetails, Modal, OrderCard, OrderInfo } from '@components';
import { useEffect } from 'react';
import { fetchIngredients } from '@slices';
import { useDispatch } from 'react-redux';
import { AppDispatch} from '..//..//services/store';
import ProtectedRoute from '../protectedRoute/protected-route';
import { fetchOrders } from '..//..//services/slices/feedSlice';
import { fetchUserOrders, getOrders } from '..//..//services/slices/orderSlice';


const App = () => {
  const {index} = useParams<{index: string}>();
  const dispatch = useDispatch<AppDispatch>();
 
 
  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);
  useEffect(() => {
    dispatch(fetchOrders());
  }, []);
  const location = useLocation();
  const background = location.state?.background;
  const navigate = useNavigate();
  const onClose = () => {
    navigate(-1);
  };
  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={background || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/login' element={<Login />} />
        <Route
          path='/register'
          element={
         
              <Register />
          
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ResetPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile'
          element={
          
              <Profile />
        
          }
        />
        <Route
          path='/profile/orders'
          element={
           
              <ProfileOrders />
        
          }
        />
        <Route path='*' element={<NotFound404 />} />       
     <Route path='/profile/orders/:number' element={<OrderInfo />} />
        <Route path='/ingredients/:id' element={<IngredientDetails />} />
        <Route path='/feed/:number' element={<OrderInfo />} />      
       
      </Routes>
      {background && (
        <Routes>
          <Route
            path='/profile/orders/:number'
            element={
              <Modal title='' onClose={onClose}>
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/feed/:number'
            element={
              <Modal title='' onClose={onClose}>
                <OrderInfo />
              </Modal>
            } 
          />
          <Route
            path='/ingredients/:id'
            element={
              <Modal title='' onClose={onClose}>
                <IngredientDetails />
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
};
export default App;
