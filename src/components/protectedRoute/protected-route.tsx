/* eslint-disable */
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';

import { Preloader } from '@ui';
import { RootState } from '@store';
import { selectIsAuthenticated, selectIsCheck, selectUser } from '..//..//services/slices/Regslice';


type ProtectedRouteProps = {
	onlyUnAuth?: boolean;
	children: React.ReactElement
};

export const ProtectedRoute=({onlyUnAuth,children }: ProtectedRouteProps) =>{
	const location = useLocation();	
	const user=useSelector(selectUser );
const isCheck = useSelector(selectIsCheck );

	if (!isCheck) {console.log('1:'+isCheck,user,onlyUnAuth); 
		return <Preloader />;}
		

	

	
	if (onlyUnAuth && user) {	console.log('2:'+isCheck, user, onlyUnAuth);
		const from = location.pathname|| { pathname: '/' };		
	//	const backgroundLocation = location.state?.from?.background || null;
	console.log(from)
	return <Navigate replace to={from} 		/>

		
	}

	if (!onlyUnAuth && !user) {console.log('3:'+ isCheck,user,onlyUnAuth); 
		return <Navigate  to='/login'
		state={{ from:location}} />;
	
	}




	return children;

};


