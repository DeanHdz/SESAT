import axios from "axios";
import { SESAT } from "../Interfaces/ISESAT";

export const getAsesor = async (
  id: number,
  token: string
): Promise<SESAT.Asesor | undefined> => {
  return await axios
    .get<SESAT.Asesor>(`${process.env.REACT_APP_API_HOSTNAME}/asesor/` + id, {
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

export const getAsesores = async (
  token: string
): Promise<SESAT.Asesor | undefined> => {
  return await axios
    .get<SESAT.Asesor>(`${process.env.REACT_APP_API_HOSTNAME}/asesor`, {
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

export const postAsesor = async (
  createAsesorDto: SESAT.CreateAsesor,
  token: string
): Promise<SESAT.Asesor | undefined> => {
  return await axios
    .post(`${process.env.REACT_APP_API_HOSTNAME}/asesor`, createAsesorDto, {
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

export const putAsesor = async (
  updateAsesorDto: SESAT.UpdateAsesor,
  token: string
): Promise<SESAT.Asesor | undefined> => {
  return await axios
    .put(`${process.env.REACT_APP_API_HOSTNAME}/asesor`, updateAsesorDto, {
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

export const deleteAsesor = async (
  id: number,
  token: string
): Promise<SESAT.Asesor | undefined> => {
  return await axios
    .delete(`${process.env.REACT_APP_API_HOSTNAME}/asesor/` + id, {
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