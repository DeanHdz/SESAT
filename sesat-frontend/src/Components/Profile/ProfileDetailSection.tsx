import { IProfileDetail } from "../../Interfaces/IProfileDetail"
import { PrimaryButton } from "../Buttons/PrimaryButton";

//(Dean)
//1.-La idea es que dependiendo de la clave que reciba en la funcion, regrese determinado informacion dependiendo si es alumno, asesor/externo
//2.-Por ahora solo se muestra como si fuera de un estudiante
//3.-Integrar mas adelante Interface -> IProfileDetail. Para sustituir la informacion que aparece debajo del boton que abre el modal y tambien dentro del modal

export const ProfileDetailSection = () => {
    return (
        <div className="border-solid border-2 border-[#dfdfdf] rounded-xl p-4 m-4 self-start">
            
            <div className="border-solid border-2 border-[#a0a0a0] rounded-lg  bg-[#cccccc] p-1 mb-2">
                <span>Detalles de Usuario</span>
            </div>

            {/* The button to open modal */}
            
            <PrimaryButton id="my-modal-3" text="Editar Perfil" />

            {/* Put this part before </body> tag */}
            <input type="checkbox" id="my-modal-3" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="my-modal-3" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-2xl font-bold">Editar Perfil</h3>
                    <div className="flex flex-col">

                    <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-bold">Programa: </span>
                            </label>
                            <select className="select select-bordered">
                                <option>Maestría en ingeniería de Software</option>
                                <option>Maestría en Inteligencia Artificial y Ciberseguridad</option>
                                <option>Maestría en Procesamiento de Señales, Sistemas Embebidos y Computo Científico</option>
                                <option>Doctorado en ingeniería de Software</option>
                                <option>Doctorado en Inteligencia Artificial y Ciberseguridad</option>
                                <option>Doctorado en Procesamiento de Señales, Sistemas Embebidos y Computo Científico</option>
                            </select>
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text font-bold">Estado del alumno: </span>
                            </label>
                            <select className="select select-bordered">
                                <option>Activo</option>
                                <option>Inactivo</option>
                            </select>
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-bold">Dirección Email: </span>
                            </label>
                            <input type="text" defaultValue="a321123@alumnos.uaslp.mx" className="input input-bordered w-full" />
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-bold">Teléfono: </span>
                            </label>
                            <input type="text" defaultValue="4441234321" className="input input-bordered w-full" />
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-bold">Asesor: </span>
                            </label>
                            <input type="text" defaultValue="Pancho Lopez Perez" className="input input-bordered w-full" />
                        </div>
                        <button className="btn bg-stone-500 my-2">Modificar</button>

                    </div>
                </div>
            </div>

            <div className="flex flex-col">
                <span className="font-bold">Programa: </span>
                <span>Maestría en Procesamiento de Señales, Sistemas Embebidos y Computo Científico</span>
                <span className="font-bold">Estado del alumno: </span>
                <span>Activo</span>
                <span className="font-bold">Dirección Email: </span>
                <span>a321123@alumnos.uaslp.mx</span>
                <span className="font-bold">Teléfono: </span>
                <span>4441234321</span>
                <span className="font-bold">Asesor: </span>
                <span>Pancho Lopez Perez</span>
            </div>

        </div>
    );
  };
  
  export default ProfileDetailSection;