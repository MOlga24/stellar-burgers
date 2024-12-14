/* eslint-disable */
import { ChangeEvent, FC, FormEvent,  useState } from 'react';
import { RegisterUI } from '@ui-pages';

import { UserRegisterBodyDto } from '@utils-types';
import { registerUser } from '..//..//services/thunk/user'
import { useDispatch } from '..//..//services/hooks';
type RegisterProps = {
	onRegister?: (dataUser: UserRegisterBodyDto) => void;
};
export const Register: FC = () => {
  const dispatch = useDispatch();
const userData={
		email: '',
		password: '',
		name: '',
	};
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

	// const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
	// 	const { name, value } = e.target;
	// 	setUserData({
	// 		...userData,
	// 		[name]: value,
    
	// 	});
	// };
  const [userData1, setUserData1] = useState<UserRegisterBodyDto>({
		email: '',
		password: '',
		name: '',
	});
  const handleSubmit = (e: FormEvent) => {
    setUserData1({...userData1, [email]:setEmail,[userName]:setUserName,[password]:setPassword})
e.preventDefault();
  dispatch(registerUser(userData1));    
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
