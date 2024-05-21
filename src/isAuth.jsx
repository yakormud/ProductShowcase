import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const isAuth = () => {
    const authorization = axios.defaults.headers.common["Authorization"];
    console.log("Headers before request:", axios.defaults.headers);
    if (!authorization) {
        return false;
    }else{
        return true;
    }   
};

export const getPayload= () => {
    const authorization = axios.defaults.headers.common["Authorization"];
    const token = authorization.replace("Bearer ", "");
    return jwtDecode(token);
}  
