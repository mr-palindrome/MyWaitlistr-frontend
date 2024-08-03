import React, {useContext} from 'react';
import AuthContext from "../../context/AuthContext.jsx";
import "./Navbar.modules.css";
import profileImage from "@/assets/icons/user-solid.svg";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


const Profile = () => {

    const {user, userDetails, logoutUser} = useContext(AuthContext)

    let userImage = profileImage;

    if (user && userDetails && userDetails.img_url) {
        console.log("user", user)
        userImage = userDetails.img_url
    }

    return (
        // <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton">
        //     <li className="dropdownItems ps-4">
        //         <div className="row">
        //             <div className="col">{user.email}</div>
        //             <div className="col">
        //                 <img
        //                     src={userImage}
        //                     alt="user-icon"
        //                     className="rounded-circle"
        //                     width="30"
        //                     height="30"
        //                 />
        //             </div>
        //
        //         </div>
        //         <span>Dashboard</span>
        //         <span>Account settings</span>
        //         <span>Billing</span>
        //         <span onClick={logoutUser} style={{cursor: 'pointer'}}>Logout</span>
        //     </li>
        // </ul>
        <div className="dropdown flex flex-row">
            <DropdownMenu>
                <DropdownMenuTrigger
                    id="dropdownMenuButton"
                    className="rounded-circle"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                >
                    <img
                        src={userImage}
                        alt="Profile"
                        style={{width: '50px', height: '50px'}}
                    />
                </DropdownMenuTrigger>
                {/*<Profile/>*/}

                {/*<DropdownMenuTrigger>Open</DropdownMenuTrigger>*/}
                <DropdownMenuContent>
                    <DropdownMenuLabel>{user.email}</DropdownMenuLabel>
                    <DropdownMenuSeparator/>
                    {/*<DropdownMenuItem>Profile</DropdownMenuItem>*/}
                    {/*<DropdownMenuItem>Projects</DropdownMenuItem>*/}
                    {/*<DropdownMenuItem>Billing</DropdownMenuItem>*/}
                    <DropdownMenuItem onClick={logoutUser} style={{cursor: 'pointer'}}>Logout</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>


    )
        ;
};

export default Profile;