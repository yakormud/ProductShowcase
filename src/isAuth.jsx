import axios from "axios";

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
    const token = authorization.replace("Bearer ", "");
    jwt.verify(token, JWT_SECRET, async (err, payload) => {
        if (err) {
         return false;
        }else{
            
        }
        return true;
       });
}  
