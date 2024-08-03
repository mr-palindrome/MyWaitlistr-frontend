import React, {useContext} from 'react';
import AuthContext from "../../context/AuthContext.jsx";
import Profile from "./Profile.jsx";
import profileImage from '../../assets/icons/user-solid.svg';
import logo from '../../assets/logo.png';

const Navbar = () => {
    const {userDetails, user} = useContext(AuthContext);
    let userImage = profileImage;

    if (user && userDetails && userDetails.img_url) {
        console.log("user", user)
        userImage = userDetails.img_url
    }
    console.log("user details", userDetails)

    return (
        <nav className="navbar bg-body-tertiary px-5">
            <div className="container-fluid">
                <img
                    src={logo}
                    alt="MyWaitlistr-logo"
                    className="navbar-brand"
                />
                {user ? (
                    <Profile/>
                ) : (
                    <></>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
