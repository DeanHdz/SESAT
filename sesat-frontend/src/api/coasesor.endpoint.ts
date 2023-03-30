import axios from "axios";
import { SESAT } from "../Interfaces/ISESAT";

export const getCoAsesor = async (
  id: number,
  token: string
): Promise<SESAT.CoAsesor | undefined> => {
  return await axios
    .get<SESAT.CoAsesor>(`${process.env.REACT_APP_API_HOSTNAME}/coasesor/` + id, {
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

export const getAllCoAsesores = async (
  token: string
): Promise<SESAT.CoAsesor | undefined> => {
  return await axios
    .get<SESAT.CoAsesor>(`${process.env.REACT_APP_API_HOSTNAME}/coasesor`, {
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

export const postCoAsesor = async (
  createCoasesorDto: SESAT.CreateCoAsesor,
  token: string
): Promise<SESAT.CoAsesor | undefined> => {
  return await axios
    .post(`${process.env.REACT_APP_API_HOSTNAME}/coasesor`, createCoasesorDto, {
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

export const putCoAsesor = async (
  updateCoAsesorDto: SESAT.UpdateCoAsesor,
  token: string
): Promise<SESAT.CoAsesor | undefined> => {
  return await axios
    .put(`${process.env.REACT_APP_API_HOSTNAME}/coasesor`, updateCoAsesorDto, {
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

export const deleteCoAsesor = async (
  id: number,
  token: string
): Promise<SESAT.CoAsesor | undefined> => {
  return await axios
    .delete(`${process.env.REACT_APP_API_HOSTNAME}/coasesor/` + id, {
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
