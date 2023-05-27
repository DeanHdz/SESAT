import axios from "axios";
import { SESAT } from "../Interfaces/ISESAT";

export namespace VariablesSistemaEndpoint {
  export const getVariablesSistema = async (
    id: number,
    token: string
  ): Promise<SESAT.VariablesSistema | undefined> => {
    return await axios
      .get<SESAT.VariablesSistema>(`${import.meta.env.VITE_API_HOSTNAME}/variables-sistema/` + id,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `bearer ${token}`,
          },
        }
      )
      .then(({ data }) => {
        if (data) {
          return data;
        }
      });
  };

  export const getVariablesSistemas = async (
    token: string
  ): Promise<SESAT.VariablesSistema[] | undefined> => {
    return await axios
      .get<SESAT.VariablesSistema[]>(`${import.meta.env.VITE_API_HOSTNAME}/variables-sistema`, {
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
