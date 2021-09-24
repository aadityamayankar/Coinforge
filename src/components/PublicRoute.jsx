import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import Loading from './Loading';
import { DASHBOARD } from '../constants/routes';
import { useAuth0 } from '@auth0/auth0-react';

const PublicRoute = ({ children, ...rest }) => {
  const { isAuthenticated, isLoading } = useAuth0();

  const auth = useSelector((state) => state.auth);

  return (
    <Route
      {...rest}
      render={(props) =>
        isLoading ? (
          <Loading pos={'fixed'} />
        ) : !isLoading && !auth.isAuthenticated ? (
          children
        ) : (
          <Redirect to={DASHBOARD} />
        )
      }
    />
  );
};

export default PublicRoute;
