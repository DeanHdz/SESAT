/*
import axios from "axios";
import { SESAT } from "../Interfaces/ISESAT";

export namespace DatosAsesorExternoEndpoint {
  export const getDatosAsesorExterno = async (
    id: number,
    token: string
  ): Promise<SESAT.DatosAsesorExterno | undefined> => {
    return await axios
      .get<SESAT.DatosAsesorExterno>(
        `${import.meta.env.VITE_API_HOSTNAME}/datos-asesorexterno/` + id,
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

  export const getAllDatosAsesorExternos = async (
    token: string
  ): Promise<SESAT.DatosAsesorExterno[] | undefined> => {
    return await axios
      .get<SESAT.DatosAsesorExterno[]>(
        `${import.meta.env.VITE_API_HOSTNAME}/datos-asesorexterno`,
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

  export const postDatosAsesorExterno = async (
    CreateDatosAsesorExternoDto: SESAT.CreateDatosAsesorExterno,
    token: string
  ): Promise<SESAT.DatosAsesorExterno | undefined> => {
    return await axios
      .post(
        `${import.meta.env.VITE_API_HOSTNAME}/datos-asesorexterno`,
        CreateDatosAsesorExternoDto,
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

  export const putDatosAsesorExterno = async (
    UpdateDatosAsesorExternoDto: SESAT.UpdateDatosAsesorExterno,
    token: string
  ): Promise<SESAT.Usuario | undefined> => {
    return await axios
      .put(
        `${import.meta.env.VITE_API_HOSTNAME}/datos-asesorexterno`,
        UpdateDatosAsesorExternoDto,
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

  export const deleteDatosAsesorExterno = async (
    id: number,
    token: string
  ): Promise<SESAT.DatosAsesorExterno | undefined> => {
    return await axios
      .delete(`${import.meta.env.VITE_API_HOSTNAME}/datos-asesorexterno/` + id, {
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