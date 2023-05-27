import axios from "axios";
import { SESAT } from "../Interfaces/ISESAT";

export namespace ComiteEndpoint {
  export const getComite = async (
    id: number,
    token: string
  ): Promise<SESAT.Comite | undefined> => {
    return await axios
      .get<SESAT.Comite>(
        `${import.meta.env.VITE_API_HOSTNAME}/comite/` + id,
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

  export const getAllComites = async (
    token: string
  ): Promise<SESAT.Comite[] | undefined> => {
    return await axios
      .get<SESAT.Comite[]>(
        `${import.meta.env.VITE_API_HOSTNAME}/comite`,
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

  export const postComite = async (
    CreateComiteDto: SESAT.CreateComite,
    token: string
  ): Promise<SESAT.Comite | undefined> => {
    return await axios
      .post(
        `${import.meta.env.VITE_API_HOSTNAME}/comite`,
        CreateComiteDto,
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

  export const putComite = async (
    UpdateComiteDto: SESAT.UpdateComite,
    token: string
  ): Promise<SESAT.Usuario | undefined> => {
    return await axios
      .put(
        `${import.meta.env.VITE_API_HOSTNAME}/comite`,
        UpdateComiteDto,
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

  export const deleteComite = async (
    id: number,
    token: string
  ): Promise<SESAT.Comite | undefined> => {
    return await axios
      .delete(`${import.meta.env.VITE_API_HOSTNAME}/comite/` + id, {
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