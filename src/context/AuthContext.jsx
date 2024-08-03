import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useHistory } from "react-router-dom";
import swal from 'sweetalert2';

const AuthContext = createContext();

export default AuthContext;

const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL;


export const AuthProvider = ({ children }) => {
    const [authTokens, setAuthTokens] = useState(() =>
        localStorage.getItem("authTokens")
            ? JSON.parse(localStorage.getItem("authTokens"))
            : null
    );

    const [user, setUser] = useState(() =>
        localStorage.getItem("authTokens")
            ? jwtDecode(JSON.parse(localStorage.getItem("authTokens")).access)
            : null
    );

    const [userDetails, setUserDetails] = useState(() =>
        localStorage.getItem("userDetails")
            ? JSON.parse(localStorage.getItem("userDetails"))
            : null
    );

    const [loading, setLoading] = useState(true);

    const history = useHistory();

    const saveTokens = (tokens) => {
        setAuthTokens(tokens);
        localStorage.setItem("authTokens", JSON.stringify(tokens));
        fetchUserData(tokens);
        setUser(jwtDecode(tokens.access));
    };

    const fetchUserData = async (tokens) => {
        console.log("fetchuserdata user token is", tokens)
        const response = await fetch(`${BACKEND_API_URL}/auth/v1/user`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${tokens.access}`
            }
        });
        if (response.status === 200) {
            const data = await response.json();
            setUserDetails(data.data);
            localStorage.setItem("userDetails", JSON.stringify(data.data));
        } else {
            console.log("Error fetching user data");
            swal.fire({
                title: "Unable to fetch user data",
                icon: "error",
                toast: true,
                timer: 6000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false,
            });
            logoutUser();
        }
    }

    const loginUser = async (email, password) => {
        const response = await fetch(`${BACKEND_API_URL}/auth/v1/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email, password
            })
        });
        const data = await response.json();
        console.log(data);

        if (response.status === 200) {
            console.log("Logged In");
            const tokens = {
                access: data.data.access_token,
                refresh: data.data.refresh_token
            };
            saveTokens(tokens);
            history.push("/projects");
            swal.fire({
                title: "Login Successful",
                icon: "success",
                toast: true,
                timer: 6000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false,
            });
        } else {
            console.log(response.status);
            console.log("there was a server issue");
            swal.fire({
                title: "Username or password does not exist",
                icon: "error",
                toast: true,
                timer: 6000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false,
            });
        }
    };

    const registerUser = async (email, username, password, full_name) => {
        const response = await fetch(`${BACKEND_API_URL}/auth/v1/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email, username, password, full_name
            })
        });
        const data = await response.json();
        if (response.status === 201 || response.status === 200) {
            console.log("Registered In");
            const tokens = {
                access: data.data.access_token,
                refresh: data.data.refresh_token
            };
            saveTokens(tokens);
            history.push("/projects");
            swal.fire({
                title: "Registration Successful, Login Now",
                icon: "success",
                toast: true,
                timer: 6000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false,
            });
        } else {
            console.log(response.status);
            console.log("there was a server issue");
            swal.fire({
                title: "An Error Occured " + response.status,
                icon: "error",
                toast: true,
                timer: 6000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false,
            });
        }
    };

    const logoutUser = () => {
        setAuthTokens(null);
        setUser(null);
        setUserDetails(null);
        localStorage.removeItem("authTokens");
        localStorage.removeItem("userDetails");
        history.push("/login");
        swal.fire({
            title: "You have been logged out...",
            icon: "success",
            toast: true,
            timer: 6000,
            position: 'top-right',
            timerProgressBar: true,
            showConfirmButton: false,
        });
    };

    const contextData = {
        user,
        userDetails,
        setUser,
        authTokens,
        setAuthTokens,
        fetchUserData,
        registerUser,
        loginUser,
        logoutUser,
        saveTokens
    };

    useEffect(() => {
        if (authTokens) {
            setUser(jwtDecode(authTokens.access));
            console.log("decoded token is", jwtDecode(authTokens.access));
            // fetchUserData().then(r => console.log(r));
        } else {
            console.log("No token found");
        }
        setLoading(false);
    }, [authTokens, loading]);

    return (
        <AuthContext.Provider value={contextData}>
            {loading ? null : children}
        </AuthContext.Provider>
    );
};