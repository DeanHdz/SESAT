/*

import axios from "axios";
import { SESAT } from "../Interfaces/ISESAT";

interface LoginInterface {
  clave: string;
  password: string;
}

export const loginUser = async (
  loginCredentials: LoginInterface
): Promise<SESAT.LoggedUser | undefined> => {
    return await axios
        .post<SESAT.LoggedUser>(
            `${import.meta.env.VITE_API_HOSTNAME}/auth/login`,
            {
                username: loginCredentials.clave,
                password: loginCredentials.password,
            },
            {
                headers:{
                    "Content-Type": "application/json",
                }
            }
        )
        .then((data) =>{
            if(data)
                return data;
        })
        .catch((error) => {
            return error.message;
        })
}


*/