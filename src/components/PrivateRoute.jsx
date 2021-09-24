import { Route } from 'react-router-dom';
import { withAuthenticationRequired } from '@auth0/auth0-react';
import Loading from './Loading';

const View = ({ children }) => {
  return children;
};

const PrivateRoute = ({ children, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        const WrappedView = withAuthenticationRequired(View, {
          onRedirecting: () => <Loading pos={'fixed'} />,
        });
        return <WrappedView children={children} />;
      }}
    />
  );
};

export default PrivateRoute;
