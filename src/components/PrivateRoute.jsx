import {Route} from "react-router-dom";
import {withAuthenticationRequired} from "@auth0/auth0-react";
import Loading from "./Loading";

const PrivateRoute = ({component, ...rest}) => {
    return(
        <Route
            {...rest}
            component = {withAuthenticationRequired(component,{
                onRedirecting: () => <Loading/>,
            })}
        />
    );
}

export default PrivateRoute;