import axios from "axios";
import { SESAT } from "../Interfaces/ISESAT";

export namespace UsuarioPruebaEndpoint {
    export const getUsuarioPrueba= async (
      id: number,
      token: string
    ): Promise<SESAT.UsuarioPrueba | undefined> => {
      return await axios
        .get<SESAT.UsuarioPrueba>(`${import.meta.env.VITE_API_HOSTNAME}/usuarios-prueba/` + id, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `bearer ${token}`,
          },
        })
        .then(({ data }) => {
          if (data) {
            return data;
          }
        });
    };
}