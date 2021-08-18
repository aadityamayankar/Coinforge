import { Redirect, Route } from 'react-router-dom';
import { withAuthenticationRequired, useAuth0 } from '@auth0/auth0-react';
import Loading from './Loading';
import { LANDING_PAGE } from '../constants/routes';
import Dashboard from '../views/Dashboard';

const View = ({children}) => {
  return(
    children
  );
}

const PrivateRoute = ({ children, ...rest }) => {
  const { isAuthenticated, isLoading } = useAuth0();
  //put these in global state and access them from there instead from auth0 hook
  return (
    <Route
      {...rest}
      render = {(props) => {
        const WrappedView = withAuthenticationRequired(View,{
          onRedirecting: () => <Loading pos = {'fixed'}/>
        });
        return <WrappedView children={children}/>
      }}
    />
  );
};

export default PrivateRoute;
