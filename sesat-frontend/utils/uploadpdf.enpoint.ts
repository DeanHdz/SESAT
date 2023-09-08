/*
import axios from "axios";
import { SESAT } from "../Interfaces/ISESAT";

export namespace UploadPDF_Endpoint{

    export const getPDF = async (
        id: number,
        token: string
    ): Promise<SESAT.UploadPDF | undefined> => {
        return await axios
        .get<SESAT.UploadPDF>(`${import.meta.env.VITE_API_HOSTNAME}/formatos-vacios/` + id, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `bearer ${token}`,
            },
        })
        .then(({ data }) => {
            if(data){
                return data;
            }
        });
    };

    export const getAllPDF = async (        
        token: string
    ): Promise<SESAT.UploadPDF | undefined> => {
        return await axios
        .get<SESAT.UploadPDF>(`${import.meta.env.VITE_API_HOSTNAME}/formatos-vacios/`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `bearer ${token}`,
            },
        })
        .then(({ data }) => {
            if(data){
                return data;
            }
        });
    };

    export const postPDF = async (
        createPDFDto: SESAT.UploadPDF,
        token: string
    ): Promise<SESAT.UploadPDF | undefined> => {
        return await axios
        .post<SESAT.UploadPDF>(`${import.meta.env.VITE_API_HOSTNAME}/formatos-vacios/`, createPDFDto, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `bearer ${token}`,
            },
        })
        .then(({ data }) => {
            if(data){
                return data;
            }
        });
    };

    export const putPDF = async (
        createPDFDto: SESAT.UploadPDF,
        token: string
    ): Promise<SESAT.UploadPDF | undefined> => {
        return await axios
        .put<SESAT.UploadPDF>(`${import.meta.env.VITE_API_HOSTNAME}/formatos-vacios/`, createPDFDto, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `bearer ${token}`,
            },
        })
        .then(({ data }) => {
            if(data){
                return data;
            }
        });
    };

    export const deletePDF = async (
        id: number,
        token: string
    ): Promise<SESAT.UploadPDF | undefined> => {
        return await axios
        .post<SESAT.UploadPDF>(`${import.meta.env.VITE_API_HOSTNAME}/formatos-vacios/` + id, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `bearer ${token}`,
            },
        })
        .then(({ data }) => {
            if(data){
                return data;
            }
        });
    };
}

*/