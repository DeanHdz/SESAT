
import { useState, useEffect, ChangeEvent } from "react";
import StudentProfileModal from "./StudentProfileModal";
import { Programa, Usuario } from "@/types/ISESAT";


const StudentProfile = ({ user }: { user: Usuario }) => {

  
  //const [tesis, setTesis] = useState<SESAT.Tesis>();
  //const [comite, setComite] = useState<SESAT.Comite[]>();
  const [localUser, setLocalUser] = useState(user);
  const [asesorName, setAsesorName] = useState("");
  const [claveAsesor, setClaveAsesor] = useState<number>();
  const [asesor, setAsesor] = useState<Usuario[]>();
  const [programs, setPrograms] = useState<Programa[]>();
  const [correo, setCorreo] = useState("");
  const [programSelected, setProgramSelected] = useState("");
  const [estado, setEstado] = useState<boolean>();

  useEffect(() => {
    console.log("UE");
    /*
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
    */
  }, []);

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
        <StudentProfileModal user={user} />
      </div>
    </div>
  );

};

export default StudentProfile;
