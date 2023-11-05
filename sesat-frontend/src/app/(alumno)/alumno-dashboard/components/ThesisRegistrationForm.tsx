'use client'
import React, { useState } from "react";
import NotFound from "@/app/(admin)/admin-dashboard/not-found"
import { DatosAlumnoEndpoint } from "../../../../../utils/datos-alumno.endpoint";
import { create } from "domain";
import { createTesis } from "../../../../../utils/tesis.endpoint";
import { createComite } from "../../../../../utils/comite.endpoint";

//interfaz creado para no interrumpir flujo de trabajo de otros, interfaz difiere con ISESAT por un atributo. Probablemente no pasa nada al agregarlo?
interface DatosAlumno {
  id_datos_alumno: number;
  id_modalidad: number;
  id_programa: number;
  id_grado_estudio: number;
  generacion: number;
  estado_activo: boolean;
  avance_previo: boolean;
}

interface ThesisRegistrationFormProps {
  id_usuario: number
}

const ThesisRegistrationForm = (props: ThesisRegistrationFormProps) => {

  //PASO 1 - verificacion si el usuario pasado como parametro es un alumno
  let alumno_datos: DatosAlumno | null = null;
  let error: Boolean = false;
  async function fetchDatos() {
    try {
      alumno_datos = await DatosAlumnoEndpoint.getUserDataById(props.id_usuario, '');
      // Rest of your code that uses alumno_datos
    } catch (err) {
      // Handle any errors that might occur during the asynchronous operation.
    }
  }
  fetchDatos();

  if(alumno_datos === null || alumno_datos === undefined){
    error = true;
  }


  //PASO 2 - si es alumno procede con el resto
  async function handleSubmit (e: any) {
    e.preventDefault();
    try{
      //Crear condiciones de entradas. Y verificar si la creacion de tesis en conjunto al comite se hacen correctamente, de no ser asi -> deberian eliminarse?...

      //Subida de prueba tesis
      await createTesis(
        {
          id_usuario: props.id_usuario,
          titulo: titulo,
          fecha_registro: new Date(),
          generacion: 2019,
          ultimo_avance: 1,
          estado_finalizacion: false
        }, "");
      //Verificar subida de tesis con fetch y recuperar el id que se le asigna. En caso de no existir dar un mensaje de alerta y detener el proceso
      
      alert("El registro de tesis se ha realizado.");


      //Subida de prueba de un miembro de comite, debe recuperar el id_tesis generado anteriormente
      await createComite(
        {
          id_usuario: 444444,
          id_tesis: 2,
          id_funcion: 3
        }, "");
      alert("El registro de comite se ha realizado.");

    }catch(err){
      console.log(err);
    }
  };

  //Registro de Tesis
  const [titulo, setTitulo] = useState("");

  const handleTituloChange = (e: any) => {
    setTitulo(e.target.value);
  };


  //Registro de comite
  const [asesor, setAsesor] = useState('');
  const [isDropdownAsesorVisible, setDropdownAsesorVisible] = useState(false);
  const [coasesor, setCoasesor] = useState('');
  const [isDropdownCoasesorVisible, setDropdownCoasesorVisible] = useState(false);
  const [monitor, setMonitor] = useState('');
  const [isDropdownMonitorVisible, setDropdownMonitorVisible] = useState(false);

  const names = ['John', 'Jane', 'Bob', 'Alice', 'Charlie']; // Lista de nombres, reemplazar con fetch de asesores

  const handleAsesorChange = (e: any) => {
    setAsesor(e.target.value);
  };

  const handleAsesorSelect = (name: string) => {
    setAsesor(name);
    setDropdownAsesorVisible(false);
  };

  const handleCoasesorChange = (e: any) => {
    setCoasesor(e.target.value);
  };

  const handleCoasesorSelect = (name: string) => {
    setCoasesor(name);
    setDropdownCoasesorVisible(false);
  };

  const handleMonitorChange = (e: any) => {
    setMonitor(e.target.value);
  };

  const handleMonitorSelect = (name: string) => {
    setMonitor(name);
    setDropdownMonitorVisible(false);
  };

  return (
    <div>
      
      <p className="text-4xl font-bold pb-5">Registro de Tesis</p>
      <form onSubmit={handleSubmit}>
        <div className="w-full">
          <div className="mb-4">
            <label className="block text-[#000000] mb-2" htmlFor="title">
              *Título:
            </label>
            <input
              className="border rounded p-2 w-full"
              type="text"
              id="title"
              value={titulo}
              required
              onChange={(e) => setTitulo(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-[#000000] mb-2" htmlFor="submissionDate">
              Fecha de registro:
            </label>
            <input
              className="border rounded p-2 w-full bg-slate-200"
              type="date"
              id="fecha_registro"
              value="mm/dd/yyyy"
              disabled
            />
          </div>
          <div className="mb-4">
            <label className="block text-[#000000] mb-2" htmlFor="author">
              Generación:
            </label>
            <input
              className="border rounded p-2 w-full bg-slate-200"
              type="text"
              id="generacion"
              value="2019"
              disabled />
          </div>

          <p className="text-4xl font-bold pb-5">Registro de Comite</p>
          <div className="mb-4">
            <label className="block text-[#000000] mb-2" htmlFor="supervisor">
              *Asesor:
            </label>
            <input
              type="text"
              value={asesor}
              required
              onChange={handleAsesorChange}
              onClick={() => setDropdownAsesorVisible(!isDropdownAsesorVisible)}
              placeholder="Selecciona un asesor"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:border-blue-500"
            />
            {isDropdownAsesorVisible && (
              <div className="absolute z-10 mt-2 w-full bg-white border rounded shadow">
                {names.map((name, index) => (
                  <div
                    key={index}
                    className="p-2 cursor-pointer hover:bg-gray-200"
                    onClick={() => handleAsesorSelect(name)}
                  >
                    {name}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-[#000000] mb-2" htmlFor="committeeMembers">
              Co-Asesor:
            </label>
            <input
              type="text"
              value={coasesor}
              onChange={handleCoasesorChange}
              onClick={() => setDropdownCoasesorVisible(!isDropdownCoasesorVisible)}
              placeholder="Selecciona un coasesor"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:border-blue-500"
            />
            {isDropdownCoasesorVisible && (
              <div className="absolute z-10 mt-2 w-full bg-white border rounded shadow">
                {names.map((name, index) => (
                  <div
                    key={index}
                    className="p-2 cursor-pointer hover:bg-gray-200"
                    onClick={() => handleCoasesorSelect(name)}
                  >
                    {name}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-[#000000] mb-2" htmlFor="committeeMembers">
              *Monitor:
            </label>
            <input
              type="text"
              value={monitor}
              onChange={handleMonitorChange}
              onClick={() => setDropdownMonitorVisible(!isDropdownMonitorVisible)}
              placeholder="Selecciona un monitor"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:border-blue-500"
            />
            {isDropdownMonitorVisible && (
              <div className="absolute z-10 mt-2 w-full bg-white border rounded shadow">
                {names.map((name, index) => (
                  <div
                    key={index}
                    className="p-2 cursor-pointer hover:bg-gray-200"
                    onClick={() => handleMonitorSelect(name)}
                  >
                    {name}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <button
          type="submit"
          className="bg-[#03396C] text-white rounded p-2 pl-10 pr-10">
          Enviar
        </button>
      </form>
    </div>
  );
};

export default ThesisRegistrationForm;
