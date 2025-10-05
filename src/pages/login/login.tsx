import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { useLocation, useNavigate } from 'react-router-dom';
import { login } from '../../services/slices/user-slice';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const error = useSelector((state) => state.user.error);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const resultLogin = await dispatch(login({ email, password }));

    if (login.fulfilled.match(resultLogin)) {
      const from = (location.state as { from?: string })?.from || '/';
      navigate(from, { replace: true });
    } else {
      navigate('/register', { replace: true });
    }
  };

  return (
    <LoginUI
      errorText=''
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
