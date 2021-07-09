import {Redirect, Route} from "react-router-dom";
import Loading from "./Loading";
import {DASHBOARD} from "../constants/routes";
import {useAuth0} from "@auth0/auth0-react";

const PublicRoute = ({component: Component, ...rest}) => {

    const {isAuthenticated,isLoading} = useAuth0();

    return(
        <Route {...rest}>
            {isLoading?<Loading/>:!isAuthenticated?<Component/>:<Redirect to = {DASHBOARD}/>}
        </Route>
    );
}

export default PublicRoute;