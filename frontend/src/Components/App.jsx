import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Login from './pages/LoginPage';
import SignUp from './pages/SignUpPage';
import ErrorPage from './pages/ErrorPage';
import MainPage from './pages/MainPage';
import PrivateRoute from './pages/PrivateRoute';
import 'react-toastify/dist/ReactToastify.css';
import routes from '../routes';

const App = () => {
  const { pagesPaths } = routes;
  return (
    <div className="h-100">
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<ErrorPage />} />
          <Route
            path={pagesPaths.mainPage()}
            element={(
              <PrivateRoute>
                <MainPage />
              </PrivateRoute>
            )}
          />
          <Route path={pagesPaths.loginPage()} element={<Login />} />
          <Route path={pagesPaths.signupPage()} element={<SignUp />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
};

export default App;
