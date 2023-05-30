import { useState, useEffect, ChangeEvent } from "react";
import { PrimaryButton } from "../Buttons/PrimaryButton";
import { SESAT } from "../../Interfaces/ISESAT";
import { ComiteEndpoint } from "../../api/comite.endpoint";
import { TesisEndpoint } from "../../api/tesis.endpoint";
import { ProgramaEndpoint } from "../../api/programa.endpoint";
import { UsuarioEndpoint } from "../../api/usuario.endpoint";
import { DatosAlumnoEndpoint } from "../../api/datos-alumno.endpoint";
import StudentProfileModal from "../Modal/StudentProfileModal";

const StudentProfile = ({ user }: { user: SESAT.Usuario }) => {
  //const [tesis, setTesis] = useState<SESAT.Tesis>();
  //const [comite, setComite] = useState<SESAT.Comite[]>();
  const [localUser, setLocalUser] = useState(user);
  const [asesorName, setAsesorName] = useState("");
  const [claveAsesor, setClaveAsesor] = useState<number>();
  const [asesor, setAsesor] = useState<SESAT.Usuario[]>();
  const [programs, setPrograms] = useState<SESAT.Programa[]>();
  const [correo, setCorreo] = useState("");
  const [programSelected, setProgramSelected] = useState("");
  const [estado, setEstado] = useState<boolean>();


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

  async function handleSubmit(e: any) {
    try {
      e.preventDefault();
      DatosAlumnoEndpoint.putDatosAlumno(
        {
          id_datos_alumno: user.id_datos_alumno! ?? 0,
          grado_estudio: user.datos_alumno?.grado_estudio! ?? "",
          modalidad: user.datos_alumno?.modalidad! ?? "",
          estado_activo: estado! ?? user.datos_alumno?.estado_activo,
          id_programa:
            parseInt(programSelected)! ?? user.datos_alumno?.id_programa,
          generacion: user.datos_alumno?.generacion! ?? "",
        },
        ""
      );

      TesisEndpoint.getTesisPerStudent(user.clave, "").then((tesis) => {
        if (tesis) {
          console.log("Tesis" + tesis);
          ComiteEndpoint.getPerTesis(tesis.id_tesis, "").then((comite) => {
            if (comite) {
              comite.forEach((c) => {
                if (c.id_tesis == tesis.id_tesis) {
                  ComiteEndpoint.putComite(
                    {
                      id_comite: c.id_comite,
                      clave_asesor: claveAsesor! ?? c.clave_asesor,
                      id_tesis: c.id_tesis,
                      id_funcion: c.id_funcion,
                    },
                    ""
                  );
                }
              });
            }
          });
        }
      });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="flex flex-col mb-1 p-2 bg-light-blue-10 rounded border border-light-gray-22 border-solid">
      <div className="flex flex-wrap ml-4 gap-4 mt-4 place-content-start">
        <div className="avatar online placeholder w-16 h-16">
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
          <div className="mt-2 flex flex-col">
            <span className="font-bold">Programa: </span>
            <span>{user.datos_alumno?.programa?.nombreprograma}</span>
            <span className="font-bold">Estado del alumno: </span>
            <span>
              {user.datos_alumno?.estado_activo ? "Activo" : "Inactivo"}
            </span>
            <span className="font-bold">Dirección Email: </span>
            <span>{user.correo}</span>
            <span className="font-bold">Asesor: </span>
            <span>{asesorName ? asesorName : "Sin registrar"}</span>
          </div>
          
        </div>
      </div>
      <div className="flex align-middle justify-end mr-4">
          <StudentProfileModal />
      </div>
    </div>
  );
};

export default StudentProfile;
