/*

import axios from "axios";
import { SESAT } from "../Interfaces/ISESAT";

export namespace FuncionEndpoint {
  export const getFuncion = async (
    id: number,
    token: string
  ): Promise<SESAT.Funcion | undefined> => {
    return await axios
      .get<SESAT.Funcion>(
        `${import.meta.env.VITE_API_HOSTNAME}/funcion/` + id,
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

  export const getAllFuncions = async (
    token: string
  ): Promise<SESAT.Funcion[] | undefined> => {
    return await axios
      .get<SESAT.Funcion[]>(
        `${import.meta.env.VITE_API_HOSTNAME}/funcion`,
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

  export const postFuncion = async (
    CreateFuncionDto: SESAT.CreateFuncion,
    token: string
  ): Promise<SESAT.Funcion | undefined> => {
    return await axios
      .post(
        `${import.meta.env.VITE_API_HOSTNAME}/funcion`,
        CreateFuncionDto,
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

  export const putFuncion = async (
    UpdateFuncionDto: SESAT.UpdateFuncion,
    token: string
  ): Promise<SESAT.Usuario | undefined> => {
    return await axios
      .put(
        `${import.meta.env.VITE_API_HOSTNAME}/funcion`,
        UpdateFuncionDto,
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

  export const deleteFuncion = async (
    id: number,
    token: string
  ): Promise<SESAT.Funcion | undefined> => {
    return await axios
      .delete(`${import.meta.env.VITE_API_HOSTNAME}/funcion/` + id, {
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