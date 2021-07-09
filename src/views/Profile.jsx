import {useAuth0} from '@auth0/auth0-react';

const Profile = () => {
    const {user,isAuthenticated} = useAuth0();
    console.log(user);
    return (
        isAuthenticated && (
            <>
                <div>
                    <img src = {user.picture} alt = {user.name}/>
                    <h1>{user.name}</h1>
                    <h2>{user.email}</h2>
                    <h3>{user.sub}</h3>
                </div>
            </>
        )
    );
}

export default Profile;