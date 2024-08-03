import axios from "axios";
import { jwtDecode } from "jwt-decode";
import dayjs from "dayjs";
import { useContext } from "react";
import AuthContext from "@/context/AuthContext.jsx"


const baseURL = import.meta.env.VITE_BACKEND_API_URL;

export const useAxios = () => {
    const { authTokens, setUser, setAuthTokens, logoutUser, saveTokens } = useContext(AuthContext);

    const axiosInstance = axios.create({
        baseURL: baseURL,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            Authorization: authTokens ? `Bearer ${authTokens?.access}` : undefined,
        },
        withCredentials: false,
        mode: 'no-cors',
    });

    axiosInstance.interceptors.request.use(async req => {
        const user = jwtDecode(authTokens?.access);
        const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

        if (isExpired) {
            try {
                const response = await axios.post(`${baseURL}/auth/v1/refresh`, {
                    refresh: authTokens?.refresh,
                });

                const data = response.data;

                if (response.status !== 200) {
                    console.log("Error");
                    logoutUser();
                    return req;
                }

                console.log("Data", data);

                const tokens = {
                    access: data.access,
                    refresh: data.refresh,
                };

                saveTokens(tokens);

                req.headers.Authorization = `Bearer ${tokens.access}`;
            } catch (error) {
                console.log("Error refreshing token", error);
                logoutUser();
            }
        }

        return req;
    });

    return axiosInstance;
};