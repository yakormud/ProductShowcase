import axios from "axios";
import {jwtDecode} from "jwt-decode"; // Ensure jwtDecode is correctly imported

export const isAuth = () => {
    const authorization = axios.defaults.headers.common["Authorization"];
    if (!token) {
        return false;
    }
    try {
        const token = authorization.replace("Bearer ", "");
        jwtDecode(token);
        return true;
    } catch (e) {
        return false;
    }
};

export const getPayload = () => {
    const authorization = axios.defaults.headers.common["Authorization"];
    const token = authorization.replace("Bearer ", "");

    return jwtDecode(token);
};