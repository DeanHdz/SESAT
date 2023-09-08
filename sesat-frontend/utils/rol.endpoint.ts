/*
import axios from "axios";
import { SESAT } from "../Interfaces/ISESAT";

export namespace RolEndpoint {
  export const getRol = async (
    id: number,
    token: string
  ): Promise<SESAT.Rol | undefined> => {
    return await axios
      .get<SESAT.Rol>(
        `${import.meta.env.VITE_API_HOSTNAME}/rol/` + id,
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

  export const getAllRols = async (
    token: string
  ): Promise<SESAT.Rol[] | undefined> => {
    return await axios
      .get<SESAT.Rol[]>(
        `${import.meta.env.VITE_API_HOSTNAME}/rol`,
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

  export const postRol = async (
    CreateRolDto: SESAT.CreateRol,
    token: string
  ): Promise<SESAT.Rol | undefined> => {
    return await axios
      .post(
        `${import.meta.env.VITE_API_HOSTNAME}/rol`,
        CreateRolDto,
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

  export const putRol = async (
    UpdateRolDto: SESAT.UpdateRol,
    token: string
  ): Promise<SESAT.Usuario | undefined> => {
    return await axios
      .put(
        `${import.meta.env.VITE_API_HOSTNAME}/rol`,
        UpdateRolDto,
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

  export const deleteRol = async (
    id: number,
    token: string
  ): Promise<SESAT.Rol | undefined> => {
    return await axios
      .delete(`${import.meta.env.VITE_API_HOSTNAME}/rol/` + id, {
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

*/