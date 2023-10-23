/** Basura vieja, termino siendo implementado directamente en ReviewFormats */

import React from "react";
import { Suspense, useEffect, useState } from "react";
import { DatosAlumno } from "../../../../../../types/ISESAT";

export interface ActFormProps{
    alumno: any,
    programa: any
    ClaveUnica: number,
    tesis: any,
}

const ActForm = (props : ActFormProps) =>{

    return (
        <div className="lg:flex flex-col w-screen">
          <form /*onSubmit={void handleSubmit}*/>
            <div className="flex flex-row  w-5/6 m-auto mt-6 mb-0 h-fit p-0">
              <div className="flex flex-row w-full justify-end items-center sm:mb-10">
                <label className="block mr-4 text-lg font-bold">
                  Fecha de evaluación:
                </label>
                <CustomCalendar setSelectedDate={setFechaEval} />
              </div>
            </div>
            <div className="flex flex-row  w-5/6 m-auto mb-0 h-fit p-0">
              <label className="mb-3 block text-lg font-bold">
                Datos del alumno
              </label>
            </div>
            <div className="flex flex-col  w-5/6 m-auto bg-light-blue-10 rounded py-6 px-6 border border-light-gray-22 border-solid">
              <div className="flex flex-col lg:flex-row">
                <div className="lg:w-1/3">
                  <label className="mb-3 block text-lg font-bold">
                    Apellido Paterno:
                  </label>
                  <label className="mb-3 block text-lg font-sans">
                    {props.alumno?.last_name}
                  </label>
                </div>
                <div className="lg:w-1/3">
                  <label className="mb-3 block text-lg font-bold">
                    Apellido Materno:
                  </label>
                  <label className="mb-3 block text-lg font-sans">
                    {props.alumno?.family_name}
                  </label>
                </div>
                <div className="lg:w-1/3">
                  <label className="mb-3 block text-lg font-bold">Nombre:</label>
                  <label className="mb-3 block text-lg font-sans">
                    {props.alumno?.name}
                  </label>
                </div>
              </div>
              <div className="flex flex-col lg:flex-row">
                <div className="flex flex-col lg:w-1/2">
                  <label className="mb-3 block text-lg font-bold">
                    Estudiante del programa:
                  </label>
                  <label className="mb-3 block text-lg font-sans">
                    {props.programa?.nombreprograma}
                  </label>
    
                </div>
                <div className="flex flex-row w-1/2">
                  <div className="flex flex-col w-1/2">
                    <label className="mb-3 block text-lg font-bold">
                      Clave Única:
                    </label>
                    <label className="mb-3 block text-lg font-sans">
                      {props.claveUnica}
                    </label>
                  </div>
                  <div className="flex flex-col w-1/2">
                    <label className="mb-3 block text-lg font-bold">Avance No.:</label>
                    <label className="mb-3 block text-lg font-sans">
                      {props.tesis?.ultimo_avance}
                    </label>
                  </div>
    
    
                </div>
              </div>
            </div>
            <div className="flex flex-row  w-5/6 m-auto mb-0 h-fit p-0 mt-10">
              <label className="mb-3 block text-lg font-bold">
                Datos de la Tesis
              </label>
            </div>
            <div className="flex flex-col w-5/6 m-auto ">
              <div className="flex flex-col py-6 px-6 bg-light-blue-10 rounded border border-solid border-light-gray-22 mb-10">
                <label className="mb-3 block text-lg font-bold">
                  Título de la tesis
                </label>
                <label className="mb-3 block text-lg">
                  {tesis?.titulo}
                </label>
              </div>
    
    
              <div className="flex flex-col ">
                <label className="mb-3 block text-lg font-bold">
                  Porcentaje de avance en el desarrollo del proyecto de tesis
                </label>
                <input
                  className="h-1/4 py-2 px-3 shadow appearance-none rounded w-[80px] mb-10"
                  type="number"
                  placeholder="%"
                  pattern="^(100|[1-9][0-9]?|0)$"
                  value={porcentajeAv}
                  required
                  onChange={
                    (e) => {
                      setPrcAvance(e.target.value);
                    }
                  }
                />
                <label className="mb-3 block text-lg font-bold">
                  Comentarios y sugerencias
                </label>
                <textarea
                  className="textarea h-48 w-full px-10  border-primary rounded text-base mb-10 "
                  placeholder="Escriba sus sugerencias o comentarios"
                  value={comentarios}
                  required
                  onChange={
                    (e) => {
                      autosize(e.currentTarget);
                      setComentarios(e.target.value);
                    }
                  }
                ></textarea>
                <label className="mb-3 block text-lg font-bold">Evaluación</label>
               <div className="flex flex-col  w-full m-auto bg-light-blue-10 rounded py-6 px-6 border border-light-gray-22 border-solid">
                  <div className="flex flex-col lg:flex-row justify-between">
                    <div className="flex flex-col">
                      <label className="mb-3 block text-lg font-bold">
                        Documento de avance
                      </label>
                      <input
                        className="h-1/4 py-2 px-3 shadow appearance-none rounded w-[80px] mb-10"
                        type="number"
                        placeholder="%"
                        pattern="^(100|[1-9][0-9]?|0)$"
                        value={documentoAvance}
                        required
                        onChange={
                          (e) => {
                            setDocAvance(e.target.value);
                          }
                        }
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="mb-3 block text-lg font-bold">
                        Exposición
                      </label>
                      <input
                        className="h-1/4 py-2 px-3 shadow appearance-none rounded w-[80px] mb-10"
                        type="number"
                        placeholder="%"
                        pattern="^(100|[1-9][0-9]?|0)$"
                        value={exposicion}
                        required
                        onChange={
                          (e) => {
                            setExposicion(e.target.value);
                          }
                        }
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="mb-3 block text-lg font-bold">
                        Dominio del tema
                      </label>
                      <input
                        className="h-1/4 py-2 px-3 shadow appearance-none rounded w-[80px] mb-10"
                        type="number"
                        placeholder="%"
                       pattern="^(100|[1-9][0-9]?|0)$"
                        value={dominioTema}
                        required
                        onChange={
                          (e) => {
                            setDominioTema(e.target.value);
                          }
                        }
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="mb-3 block text-lg font-bold">
                        Grado de avance en el periodo
                      </label>
                     <input
                        className="h-1/4 py-2 px-3 shadow appearance-none rounded w-[80px] mb-10"
                        type="number"
                        placeholder="%"
                        pattern="^(100|[1-9][0-9]?|0)$"
                        value={gradoAvance}
                        required
                        onChange={
                          (e) => {
                            setGradoAvance(e.target.value);
                         }
                        }
                      />
                   </div>
                  </div>
                  <div className="flex flex-row">
                    <div className="flex flex-col">
                      <label className="mb-3 block text-lg font-bold">
                        Promedio de la evaluación
                      </label>
                      <label className="mb-3 block text-lg">
                        {promedio} %
                     </label>
                    </div>
                  </div>
                </div>
    
                <label className="mt-10 mb-3 block text-lg font-bold">Acerca del examen TOEFL</label>
                <div className="flex flex-col  w-full m-auto bg-light-blue-10 rounded py-6 px-6 border border-light-gray-22 border-solid">
                  <div className="flex flex-col lg:flex-row justify-normal">
                    <div className="flex flex-col mr-20">
                      <label className="mb-3 block text-lg font-bold">
                        Fecha de presentación del examen
                      </label>
                      <CustomCalendar setSelectedDate={setFechaToefl} />
                    </div>
                   <div className="flex flex-col mt-10">
                      <label className="mb-3 block text-lg font-bold">
                        Puntaje obtenido
                      </label>
                      <input
                        className="h-1/4 py-2 px-3 shadow appearance-none rounded w-[80px] mb-10"
                        type="number"
                        placeholder="pts"
                        pattern="^(100|[1-9][0-9]?|0)$"
                        value={puntajeToefl}
                        required
                        onChange={
                          (e) => {
                            setPuntajeToefl(e.target.value);
                         }
                        }
                      />
                    </div>
    
    
                  </div>
                 <div className="flex flex-row">
                   <div className="flex flex-col">
                      <label className="mb-3 block text-lg font-bold">
                        Próxima fecha para presentar el examen TOEFL
                    </label>
                      <CustomCalendar setSelectedDate={setProxToefl} />
                    </div>
                  </div>
                </div>
    
                <label className="mb-3 mt-10 block text-lg font-bold">
                  Observaciones y compromisos
                </label>
                <textarea
                  className="textarea h-12 w-full px-10 border-primary rounded text-base mb-10"
                  placeholder="Escriba sus observaciones y compromisos para el alumno"
                  value={observaciones}
                  required
                  onChange={
                    (e) => {
                      autosize(e.currentTarget);
                      setObservaciones(e.target.value);
                    }
                  }
                ></textarea>
    
                <div className="flex justify-end w-full mb-10 mt-10">
                  <div className="mr-6">
                    <SecondaryButton text="Descartar" onClick={handleGoBack} />
                  </div>
                  <button type="submit" className="btn">
                    Guardar Acta de Evaluación
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
    );
}; 

export default ActForm