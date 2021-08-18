//to be deleted

import {useAuth0} from '@auth0/auth0-react';
import { Box } from '@chakra-ui/react';

const LogoutButton = () => {
    const {logout,isAuthenticated}  = useAuth0();
    return (
        isAuthenticated && (
            <>
                <Box as="button" onClick = {() => logout({
                    returnTo: window.location.origin,
                })}>
                    Log Out
                </Box>
            </>
        )
    );
}

export default LogoutButton;