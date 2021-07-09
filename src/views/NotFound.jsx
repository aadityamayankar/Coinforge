import React from "react";
import { Link } from "react-router-dom";
import {DASHBOARD} from "../constants/routes";
const NotFoundPage = () => {
    //using useauth0 hook make the link to landingpage or home
	return (
        <>
            <div>
                404<br/>
                Cannot find that page.
            </div>
            <Link to={DASHBOARD}>
                <button>
                    BACK TO HOME
                </button>
            </Link>
        </>
	);
};

export default NotFoundPage;