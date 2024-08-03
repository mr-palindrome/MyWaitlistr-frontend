import React, { useEffect, useState, useContext } from "react";
import { useLocation, useHistory } from "react-router-dom";
import AuthContext from "../../context/AuthContext.jsx";
import queryString from "query-string";
import axios from "axios";
import redirect from "react-router-dom/es/Redirect.js";
import Loading from "@/sections/Loading/Loading.jsx";

const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL;

const GoogleLogin = () => {
    let location = useLocation();
    console.log("location", location);
    const [error, setError] = useState("");
    const history = useHistory();
    const { saveTokens } = useContext(AuthContext);

    useEffect(() => {
        const values = queryString.parse(location.search);
        const code = values.code ? values.code : null;

        if (code) {
            onGooglelogin();
        }
    }, []);

    const googleLoginHandler = (code) => {
        console.log(`${BACKEND_API_URL}/auth/google/v1/login${code}`);
        return axios
            .get(`${BACKEND_API_URL}/auth/google/v1/login${code}`)
            .then((res) => {
                console.log("response", res);
                const tokens = {
                    access: res.data.data.access_token,
                    refresh: res.data.data.refresh_token
                };
                saveTokens(tokens);
                history.push('/projects')
            })
            .catch((err) => {
                console.log("error", err)
                history.push('/login')
                return err;
            });
    };

    const onGooglelogin = async () => {
        const response = await googleLoginHandler(location.search);
        console.log(response);
    }

    return (
        <Loading/>
    );
};


export default GoogleLogin;
