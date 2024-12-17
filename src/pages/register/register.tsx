/* eslint-disable */
import { ChangeEvent, FC, FormEvent,  useEffect,  useState } from 'react';
import { RegisterUI } from '@ui-pages';

import { UserRegisterBodyDto } from '@utils-types';
import { registerUser } from '..//..//services/thunk/user'

import { registerUserApi, TRegisterData } from '..//..//utils/burger-api';
import { addUser, fetchUserReg } from '..//..//services/slices/Regslice';
import { useSelector, useDispatch  } from 'react-redux';
import { AppDispatch } from '..//..//services/store';
type RegisterProps = {
	onRegister?: (dataUser: UserRegisterBodyDto) => void;
};
export const Register: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
// const userData={
// 		email: '',
// 		password: '',
// 		name: '',
// 	};
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  // const [userData, setUserData] = useState<TRegisterData>({
	// 	email: '',
	// 	password: '',
	// 	name: '',
	// });
 	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		// const { name, value } = e.target;
		
	};

  const handleSubmit = (e: FormEvent) => {

e.preventDefault();
const userData={email:email,password:password,name:userName,}	    

// dispatch(fetchUserReg(userData));
dispatch(registerUser(userData));
  };

  return (
    <RegisterUI
      errorText=''
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
