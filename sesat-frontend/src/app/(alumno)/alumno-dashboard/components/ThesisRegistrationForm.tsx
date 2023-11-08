'use client'
import React, { useState, useEffect } from "react";
import NotFound from "@/app/(admin)/admin-dashboard/not-found"
import { DatosAlumnoEndpoint } from "../../../../../utils/datos-alumno.endpoint";
import { create } from "domain";
import { createTesis } from "../../../../../utils/tesis.endpoint";
import { createComite } from "../../../../../utils/comite.endpoint";
import { shortFormatDate, shortFormatDateNew } from "../../../../../utils/utils";

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

  //PASO 1 - verificacion si el usuario pasado como parametro es un alumno, de paso regresa la generacion del alumno para la creacion de tesis
  const [alumnoDatos, setAlumnoDatos] = useState<DatosAlumno | null>(null);
  const [error, setError] = useState<boolean>(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const datos = await DatosAlumnoEndpoint.getUserDataById(props.id_usuario, "");
        if (datos !== null && datos !== undefined) {
          setAlumnoDatos(datos);
          setError(false);
        }
      } catch (err) {
        console.log("Error de fetch");
      }
    }

    fetchData();
  }, [props.id_usuario]);

  //PASO 2 - si es alumno procede con el resto

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

  async function handleSubmit(e: any) {
    e.preventDefault();
    try {
      //Crear condiciones de entradas. Y verificar si la creacion de tesis en conjunto al comite se hacen correctamente, de no ser asi -> deberian eliminarse?...

      //Subida de prueba tesis
      await createTesis(
        {
          id_usuario: props.id_usuario,
          titulo: titulo,
          fecha_registro: new Date(), //Determinar la manera correcta de subir la fecha actual, debe coincidir con el ejemplo -> "2021-05-06 00:00:00.000" (timestamp)
          generacion: alumnoDatos.generacion, //No es posible que sea nulo si se llega a realizar el submit, ignorar el ERROR
          ultimo_avance: 1, //Es correcto inicializar con 1?, consultar alfredo
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

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {!error ? (
        <>
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
                  type="text"
                  id="fecha_registro"
                  value={shortFormatDateNew()}
                  disabled
                  onChange={(e) => setTitulo(e.target.value)}
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
                  value={alumnoDatos?.generacion}
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
        </>
      ) : (
        <>
          <NotFound />
        </>
      )}
    </div>
  );
};

export default ThesisRegistrationForm;


/*
'use client'
import React, { useState, useEffect } from "react";
import NotFound from "@/app/(admin)/admin-dashboard/not-found"
import { DatosAlumnoEndpoint } from "../../../../../utils/datos-alumno.endpoint";
import { create } from "domain";
import { createTesis } from "../../../../../utils/tesis.endpoint";
import { createComite } from "../../../../../utils/comite.endpoint";
import { shortFormatDate, shortFormatDateNew } from "../../../../../utils/utils";
import { Usuario } from "../../../../../types/ISESAT";

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
  id_usuario: number,
  asesores: Usuario[],
  datos: any
}

const ThesisRegistrationForm = (props: ThesisRegistrationFormProps) => {

  //PASO 1 - verificacion si el usuario pasado como parametro es un alumno, de paso regresa la generacion del alumno para la creacion de tesis
  const [alumnoDatos, setAlumnoDatos] = useState<DatosAlumno | null>(null);
  const [error, setError] = useState<boolean>(true);



  //PASO 2 - si es alumno procede con el resto

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

  const [suplente, setSuplente] = useState('');
  const [isDropdownSuplenteVisible, setDropdownSuplenteVisible] = useState(false);


  const [sinodal1, setSinodal] = useState('');
  const [isDropdownSinodal1Visible, setDropdownSinodal1Visible] = useState(false);
  const [sinodal2, setSinodal2] = useState('');
  const [isDropdownSinodal2Visible, setDropdownSinodal2Visible] = useState(false);
  const [sinodal3, setSinodal3] = useState('');
  const [isDropdownSinodal3Visible, setDropdownSinodal3Visible] = useState(false);
  const [sinodal4, setSinodal4] = useState('');
  const [isDropdownSinodal4Visible, setDropdownSinodal4Visible] = useState(false);

  const handleAsesorChange = (e: any) => {
    setAsesor(e.target.value);
  };

  const handleAsesorSelect = (id_usuario: number) => {
    setAsesor(id_usuario);
    setDropdownAsesorVisible(false);
  };
  const handleAsesorChange = (e: any) => {
    setAsesor(e.target.value);
  };

  const handleAsesorSelect = (id_usuario: number) => {
    setAsesor(id_usuario);
    setDropdownAsesorVisible(false);
  };

  const handleAsesorChange = (e: any) => {
    setAsesor(e.target.value);
  };

  const handleAsesorSelect = (id_usuario: number) => {
    setAsesor(id_usuario);
    setDropdownAsesorVisible(false);
  };

  const names = ['John', 'Jane', 'Bob', 'Alice', 'Charlie']; // Lista de nombres, reemplazar con fetch de asesores

  const handleAsesorChange = (e: any) => {
    setAsesor(e.target.value);
  };

  const handleAsesorSelect = (id_usuario: number) => {
    setAsesor(id_usuario);
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
    setDropdownSinodalVisible(false);
  };

  async function handleSubmit(e: any) {
    e.preventDefault();
    try {
      //Crear condiciones de entradas. Y verificar si la creacion de tesis en conjunto al comite se hacen correctamente, de no ser asi -> deberian eliminarse?...

      //Subida de prueba tesis
      await createTesis(
        {
          id_usuario: props.id_usuario,
          titulo: titulo,
          fecha_registro: new Date(), //Determinar la manera correcta de subir la fecha actual, debe coincidir con el ejemplo -> "2021-05-06 00:00:00.000" (timestamp)
          generacion: alumnoDatos.generacion, //No es posible que sea nulo si se llega a realizar el submit, ignorar el ERROR
          ultimo_avance: 1, //Es correcto inicializar con 1?, consultar alfredo
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

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {!error ? (
        <>
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
                  type="text"
                  id="fecha_registro"
                  value={shortFormatDateNew()}
                  disabled
                  onChange={(e) => setTitulo(e.target.value)}
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
                  value={alumnoDatos?.generacion}
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
                    {props.asesores.map((asesor, index) => (
                      <div
                        key={index}
                        className="p-2 cursor-pointer hover:bg-gray-200"
                        onClick={() => handleAsesorSelect(asesor.id_usuario)}
                      >
                        {`${asesor.nombre} ${asesor.apellido_paterno} ${asesor.apellido_materno}`}
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
            </div>
            <button
            type="submit"
            className="bg-[#03396C] text-white rounded p-2 pl-10 pr-10">
            Enviar
          </button>
          </form>

          

          {props.datos.grado_estudio === 'Maestría' ? (
            
                <div className="mb-4">
                <label className="block text-[#000000] mb-2" htmlFor="supervisor">
                  *Sinodal (1):
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
                    {props.asesores.map((asesor, index) => (
                      <div
                        key={index}
                        className="p-2 cursor-pointer hover:bg-gray-200"
                        onClick={() => handleAsesorSelect(asesor.id_usuario)}
                      >
                        {`${asesor.nombre} ${asesor.apellido_paterno} ${asesor.apellido_materno}`}
                      </div>
                    ))}
                  </div>
                )}
                <div className="mb-4">
                <label className="block text-[#000000] mb-2" htmlFor="supervisor">
                  *Sinodal (2):
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
                    {props.asesores.map((asesor, index) => (
                      <div
                        key={index}
                        className="p-2 cursor-pointer hover:bg-gray-200"
                        onClick={() => handleAsesorSelect(asesor.id_usuario)}
                      >
                        {`${asesor.nombre} ${asesor.apellido_paterno} ${asesor.apellido_materno}`}
                      </div>
                    ))}
                  </div>
                )}
              </div>
          ): ()}
        </>
      ) : (
        <>
          <NotFound />
        </>
      )}
    </div>
  );
};

export default ThesisRegistrationForm;

*/