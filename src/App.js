import Account from './views/Account';
import LandingPage from './views/LandingPage';
import Dashboard from './views/Dashboard';
import NotFound from './views/NotFound';
import Portfolio from './views/Portfolio';
import News from './views/News';
import Predictor from './views/Predictor';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import {
  DASHBOARD,
  ACCOUNT,
  LANDING_PAGE,
  PORTFOLIO,
  PREDICTOR,
  NEWS,
} from './constants/routes';
import { Switch, Route } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Navbar from './components/Navbar/Navbar';

function App() {
  const { isLoading, isAuthenticated,user } = useAuth0();

  return (
    <>
      <Switch>
        <PublicRoute exact path={LANDING_PAGE}>
          <LandingPage/>
        </PublicRoute>
        <PrivateRoute exact path={DASHBOARD}>
          <Navbar active="Dashboard" />
          <Dashboard />
        </PrivateRoute>
        <PrivateRoute exact path={PORTFOLIO}>
          <Navbar active="Portfolio" />
          <Portfolio />
        </PrivateRoute>
        <PrivateRoute exact path={PREDICTOR}>
          <Navbar active="Predictor" />
          <Predictor />
        </PrivateRoute>
        <PrivateRoute exact path={ACCOUNT}>
          <Navbar active="Account" />
          <Account />
        </PrivateRoute>
        <PrivateRoute exact path={NEWS}>
          <Navbar active="News" />
          <News />
        </PrivateRoute>
        <Route path='*'>
          <NotFound />
        </Route>
      </Switch>
    </>
  );
}

export default App;
