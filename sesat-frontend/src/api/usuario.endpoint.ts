import axios from "axios";
import { SESAT } from "../Interfaces/ISESAT";

export namespace UsuarioEndpoint {
  export const getUsuario = async (
    id: number,
    token: string
  ): Promise<SESAT.Usuario | undefined> => {
    return await axios
      .get<SESAT.Usuario>(`${import.meta.env.VITE_API_HOSTNAME}/usuario/` + id,
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

  export const getUsuarios = async (
    token: string
  ): Promise<SESAT.Usuario[] | undefined> => {
    return await axios
      .get<SESAT.Usuario[]>(`${import.meta.env.VITE_API_HOSTNAME}/usuario`, {
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

  export const postUsuario = async (
    createUsuarioDto: SESAT.CreateUsuario,
    token: string
  ): Promise<SESAT.Usuario | undefined> => {
    return await axios
      .post(`${import.meta.env.VITE_API_HOSTNAME}/usuario`, createUsuarioDto, {
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

  export const putUsuario = async (
    updateUsuarioDto: SESAT.UpdateUsuario,
    token: string
  ): Promise<SESAT.Usuario | undefined> => {
    return await axios
      .put(`${import.meta.env.VITE_API_HOSTNAME}/usuario`, updateUsuarioDto, {
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

  export const deleteUsuario = async (
    id: number,
    token: string
  ): Promise<SESAT.Usuario | undefined> => {
    return await axios
      .delete(`${import.meta.env.VITE_API_HOSTNAME}/usuario/` + id, {
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
