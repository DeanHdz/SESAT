import axios from "axios";
import { SESAT } from "../Interfaces/ISESAT";

export namespace ComentarioEndpoint {
  export const getComentario = async (
    id: number,
    token: string
  ): Promise<SESAT.Comentario | undefined> => {
    return await axios
      .get<SESAT.Comentario>(
        `${process.env.REACT_APP_API_HOSTNAME}/comentario/` + id,
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

  export const getAllComentarios = async (
    token: string
  ): Promise<SESAT.Comentario | undefined> => {
    return await axios
      .get<SESAT.Comentario>(
        `${process.env.REACT_APP_API_HOSTNAME}/comentario`,
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

  export const postComentario = async (
    CreateComentarioDto: SESAT.CreateComentario,
    token: string
  ): Promise<SESAT.Comentario | undefined> => {
    return await axios
      .post(
        `${process.env.REACT_APP_API_HOSTNAME}/usuario`,
        CreateComentarioDto,
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

  export const putComentario = async (
    UpdateComentarioDto: SESAT.UpdateComentario,
    token: string
  ): Promise<SESAT.Usuario | undefined> => {
    return await axios
      .put(
        `${process.env.REACT_APP_API_HOSTNAME}/usuario`,
        UpdateComentarioDto,
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

  export const deleteComentario = async (
    id: number,
    token: string
  ): Promise<SESAT.Comentario | undefined> => {
    return await axios
      .delete(`${process.env.REACT_APP_API_HOSTNAME}/comentario/` + id, {
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
