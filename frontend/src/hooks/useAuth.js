import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUser, setCredentials } from '../slices/authSlice';

export default () => {
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  const loggedIn = user.token;

  const logIn = (username, token) => {
    if (!localStorage.getItem('token')) {
      localStorage.setItem('username', username);
      localStorage.setItem('token', token);
    }
    dispatch(setCredentials({ username, token }));
  };

  const logOut = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    dispatch(setCredentials({ username: null, token: null }));
  };

  return {
    user,
    loggedIn,
    logIn,
    logOut,
  };
};
