import { useAuth0 } from "@auth0/auth0-react"; 
import { DASHBOARD } from "../constants/routes";

const LandingPage = () => {

    const {loginWithRedirect,isAuthenticated} = useAuth0();

    return (
        !isAuthenticated && (
            <>
                <div>Landing page</div>
                <button onClick = {() => loginWithRedirect({
                    redirectUri:`http://localhost:3000${DASHBOARD}`,
                })}>
                    Get Started
                </button>
            </>
        )
    );
}

export default LandingPage;