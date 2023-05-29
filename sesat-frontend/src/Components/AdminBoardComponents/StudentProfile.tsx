import { Link } from "react-router-dom";
import { useState, useEffect, ChangeEvent } from "react";
import { IProfileDetail } from "../../Interfaces/IProfileDetail";
import { PrimaryButton } from "../Buttons/PrimaryButton";
import { SESAT } from "../../Interfaces/ISESAT";
import { ComiteEndpoint } from "../../api/comite.endpoint";
import { TesisEndpoint } from "../../api/tesis.endpoint";
import { ProgramaEndpoint } from "../../api/programa.endpoint";
import React from "react";
import { UsuarioEndpoint } from "../../api/usuario.endpoint";
import { DatosAlumnoEndpoint } from "../../api/datos-alumno.endpoint";
import { test } from "node:test";

const StudentProfile = ({ user }: { user: SESAT.Usuario }) => {
  //const [tesis, setTesis] = useState<SESAT.Tesis>();
  //const [comite, setComite] = useState<SESAT.Comite[]>();
  const [asesorName, setAsesorName] = useState("");
  const [asesor, setAsesor] = useState<SESAT.Usuario[]>();
  const [programs, setPrograms] = useState<SESAT.Programa[]>();
  const [correo, setCorreo] = useState("");
  const [programSelected, setProgramSelected] = useState("");
  const [estado, setEstado] = useState<boolean>()

  useEffect(() => {
    TesisEndpoint.getTesisPerStudent(user.clave, "").then((tesis) => {
      if (tesis) {
        ComiteEndpoint.getPerTesis(tesis.id_tesis, "").then((comite) => {
          if (comite) {
            comite.forEach((c) => {
              if (c.funcion.nombre == "Asesor") {
                setAsesorName(
                  c.asesor.nombre +
                    " " +
                    c.asesor.apellido_paterno +
                    " " +
                    c.asesor.apellido_materno
                );
              }
            });
          }
        });
      }
    });
  }, []);

  useEffect(() => {
    ProgramaEndpoint.getProgramas("").then((programas) => {
      if (programas) {
        setPrograms(programas);
      }
    });
  }, []);

  useEffect(() => {
    UsuarioEndpoint.getAsesores("").then((asesor) => {
      if (asesor) {
        setAsesor(asesor);
      }
    });
  }, []);

  const handleSubmit = () => {
    DatosAlumnoEndpoint.putDatosAlumno(
      {
        id_datos_alumno: user.id_datos_alumno! ?? 0,
        grado_estudio: user.datos_alumno?.grado_estudio! ?? "",
        modalidad: user.datos_alumno?.modalidad! ?? "",
        estado_activo: user.datos_alumno?.estado_activo! ?? false,
        id_programa: user.datos_alumno?.id_programa! ?? "",
        generacion: user.datos_alumno?.generacion! ?? "",
      },
      ""
    );

    UsuarioEndpoint.putUsuario(
      {
        clave: user.clave,
        nombre: user.nombre,
        apellido_paterno: user.apellido_paterno,
        apellido_materno: user.apellido_materno,
        password: user.password,
        id_rol: user.id_rol,
        correo: user.correo,
        id_datos_alumno: user.id_datos_alumno,
        id_datos_asesorexterno: user.id_datos_asesorexterno,
      },
      ""
    );
  };

  
  return (
    <div className="flex flex-row mb-1 p-2 bg-light-blue-10 rounded border border-light-gray-22 border-solid">
      <div className="flex flex-wrap gap-4 m-8 place-content-start">
        <div className="avatar online placeholder w -16 h-16">
          <div className="bg-neutral-focus text-neutral-content rounded-full w-16 h-16">
            <span className="text-xl">
              {user.nombre[0] + user.apellido_paterno[0]}
            </span>
          </div>
        </div>
        <div className="self-center">
          <span className="text-3xl">
            {user.nombre +
              " " +
              user.apellido_paterno +
              " " +
              user.apellido_materno}
          </span>

          {/* The button to open modal */}

          <PrimaryButton id="ListedStudentProfile_Edit" text="Editar Perfil" />

          {/* Put this part before </body> tag */}
          <input
            type="checkbox"
            id="ListedStudentProfile_Edit"
            className="modal-toggle"
          />
          <div className="modal">
            <div className="modal-box relative">
              <label
                htmlFor="ListedStudentProfile_Edit"
                className="btn btn-sm btn-circle absolute right-2 top-2"
              >
                ✕
              </label>
              <form onSubmit={handleSubmit}>
                <h3 className="text-2xl font-bold">Editar Perfil</h3>
                <div className="flex flex-col">
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-bold">Programa: </span>
                    </label>
                    <select
                      className="select select-bordered"
                      onChange={(e) => {
                        setProgramSelected(e.target.value);
                      }}
                    >
                      {programs?.map((program) => (
                        <option value={program.nombreprograma}>
                          {program.nombreprograma}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-control w-full max-w-xs">
                    <label className="label">
                      <span className="label-text font-bold">
                        Estado del alumno:{" "}
                      </span>
                    </label>
                    <select className="select select-bordered" onChange={(e) => {
                        //setEstado(e.target.value);
                    }}>
                      <option value={"true"}>Activo</option>
                      <option value={"false"}>Inactivo</option>
                    </select>
                  </div>
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-bold">Asesor: </span>
                    </label>
                    <select className="select select-bordered">
                      {asesor?.map((asesor) => (
                        <option>
                          {asesor.nombre +
                            " " +
                            asesor.apellido_paterno +
                            " " +
                            asesor.apellido_materno}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button className="btn bg-stone-500 my-2">Modificar</button>
                </div>
              </form>
            </div>
          </div>

          <div className="flex flex-col">
            <span className="font-bold">Programa: </span>
            <span>{user.datos_alumno?.programa?.nombreprograma}</span>
            <span className="font-bold">Estado del alumno: </span>
            <span>
              {user.datos_alumno?.estado_activo ? "Activo" : "Inactivo"}
            </span>
            <span className="font-bold">Dirección Email: </span>
            <span>{user.correo}</span>
            <span className="font-bold">Asesor: </span>
            <span>{asesorName}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
