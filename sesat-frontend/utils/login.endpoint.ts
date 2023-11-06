import { LoggedUser } from "../types/ISESAT";
import Cookies from "js-cookie";

export namespace LoginEndpoint {
  interface LoginInterface {
    username: string;
    password: string;
  }

  export async function loginUser(
    loginCredentials: LoginInterface
  ): Promise<any | undefined> {
    const url = `${process.env.NEXT_PUBLIC_SESAT_API_URL}/auth/login`;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginCredentials),
    };
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error("Error fetching the data");
    }
    const result = await response.json();

    const sessionTime: number = 1000 * 60 * 60 * 2; //2 hours
    Cookies.set("SESATsession", JSON.stringify(result.token), {
      expires: sessionTime,
    });
    return result;
  }

  export async function getUserRole(token: string): Promise<any | undefined> {
    const url = `${process.env.NEXT_PUBLIC_SESAT_API_URL}/auth/role`;
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`,
      },
      next: { revalidate: 3600 },
    };
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error("Error fetching the data");
    }
    const result = await response.json();
    return result;
  }

  export async function getUserInfo(token: string): Promise<any | undefined> {
    const url = `${process.env.NEXT_PUBLIC_SESAT_API_URL}/auth/user-info`;
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`,
      },
      next: { revalidate: 3600 },
    };
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error("Error fetching the data");
    }
    const result = await response.json();
    return result;
  }
}

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
