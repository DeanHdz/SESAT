import axios from "axios";
import { SESAT } from "../Interfaces/ISESAT";

export namespace ActaEvaluacion_Endpoint{

    
    export const getActa = async (
        id: number,
        token: string
    ): Promise<SESAT.ActaEvaluacionDoc | undefined> => {
        return await axios
        .get<SESAT.ActaEvaluacionDoc>(`${import.meta.env.VITE_API_HOSTNAME}/acta-evaluacion/` + id, {
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
    
    export const getAllActas = async (        
        token: string
    ): Promise<SESAT.ActaEvaluacionDoc | undefined> => {
        return await axios
        .get<SESAT.ActaEvaluacionDoc>(`${import.meta.env.VITE_API_HOSTNAME}/acta-evaluacion/`, {
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

    export const postActaForm = async (
        id_asignacion: number,
        createActaDto: SESAT.ActaEvalForm,
        token: string
    ): Promise<SESAT.ActaEvaluacionDoc | undefined> => {
        return await axios
        .post<SESAT.ActaEvaluacionDoc>(`${import.meta.env.VITE_API_HOSTNAME}/acta-evaluacion/` + id_asignacion, createActaDto, {
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

    /*Falta Modificar */
    export const put_Acta = async (
        createPDFDto: SESAT.ActaEvaluacionDoc,
        token: string
    ): Promise<SESAT.ActaEvaluacionDoc | undefined> => {
        return await axios
        .put<SESAT.ActaEvaluacionDoc>(`${import.meta.env.VITE_API_HOSTNAME}/acta-evaluacion/`, createPDFDto, {
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

    /*Falta Modificar */
    export const deleteActa = async (
        id: number,
        token: string
    ): Promise<SESAT.ActaEvaluacionDoc | undefined> => {
        return await axios
        .post<SESAT.ActaEvaluacionDoc>(`${import.meta.env.VITE_API_HOSTNAME}/acta-evaluacion/` + id, {
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