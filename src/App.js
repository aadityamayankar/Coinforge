import LogoutButton from "./components/LogoutButton";
import Account from "./views/Account";
import LandingPage from "./views/LandingPage";
import Loading from "./components/Loading";
import Dashboard from "./views/Dashboard";
import NotFound from "./views/NotFound";
import Portfolio from "./views/Portfolio";
import Predictor from "./views/Predictor";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import {DASHBOARD,ACCOUNT,LANDING_PAGE,PORTFOLIO,PREDICTOR} from "./constants/routes";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {useAuth0} from '@auth0/auth0-react';


function App() {

  const {isLoading, isAuthenticated} = useAuth0();
  console.log(isAuthenticated);

  if(isLoading) return (<Loading/>);

  return (
    <>
      <Router>
        <Switch>
          <PublicRoute exact path = {LANDING_PAGE} component = {LandingPage}/>
          <PrivateRoute exact path = {DASHBOARD} component = {Dashboard}/>
          <PrivateRoute exact path = {PORTFOLIO} component = {Portfolio}/>
        <PrivateRoute exact path = {PREDICTOR} component = {Predictor}/>
          <PrivateRoute exact path = {ACCOUNT} component = {Account}/>
          <Route path = "*">
            <NotFound/>
          </Route>
        </Switch>
        <LogoutButton/>
      </Router>
    </>
  );
}

export default App;
