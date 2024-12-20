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

} from 'react-router-dom';
import { AppHeader, IngredientDetails, Modal,  OrderInfo } from '@components';
import { useEffect } from 'react';
import { fetchIngredients } from '@slices';
import { useDispatch } from 'react-redux';
import { AppDispatch} from '..//..//services/store';
import {  checkUserAuth} from '..//..//services/slices/Regslice';
import { ProtectedRoute } from '../protectedRoute/protected-route';


export const App = () => {
 
 const dispatch = useDispatch<AppDispatch>();   
    const location = useLocation();
    const locationState=location.state as {background?:Location}
    const background = locationState && location.state?.background;
     useEffect(() => {
        dispatch(checkUserAuth())
         
       }, [dispatch]);
   
   
  
     
  useEffect(() => {
    dispatch(fetchIngredients());

  }, [dispatch]);
  // const background = location.state?.background;
  const navigate = useNavigate();
  const onClose = () => {
    navigate(-1);
  };
  return (
    <div className={styles.app}>
      <AppHeader />
     
      <Routes 
  location={background || location}
      >
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route
          path='/login'
          element={
            <ProtectedRoute onlyUnAuth>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path='/register'
          element={<ProtectedRoute onlyUnAuth>
         
              <Register /></ProtectedRoute>
          
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute>
              <ForgotPassword />
          </ProtectedRoute>
          }
        />
        <Route
          path='/reset-password'
          element={ <ProtectedRoute>
        
              <ResetPassword />
        </ProtectedRoute>
          }
        />
        <Route
      
          path='/profile' 
          element={         
            // <ProtectedRoute>
          
              <Profile />
       // </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders'
          element={
          //  <ProtectedRoute >
              <ProfileOrders />
      //  </ProtectedRoute>
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
              <Modal title='Детали ингредиента' onClose={onClose}>
                <IngredientDetails />
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
};
// export default App;
