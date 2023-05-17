import { Link } from "react-router-dom";

import { IProfileDetail } from "../../Interfaces/IProfileDetail"
import { PrimaryButton } from "../Buttons/PrimaryButton";

const StudentProfile = () => {
    return (
        <div className="flex flex-row mb-1 p-2 bg-light-blue-10 rounded border border-light-gray-22 border-solid">
            <div className="flex flex-wrap gap-4 m-8 place-content-start">
                <div className="avatar online placeholder w -16 h-16">
                    <div className="bg-neutral-focus text-neutral-content rounded-full w-16 h-16">
                        <span className="text-xl">DH</span>
                    </div>
                </div> 
                <div className="self-center">
                    <span className="text-3xl">Dean Joshua Hernandez</span>


                    {/* The button to open modal */}
            
            <PrimaryButton id="ListedStudentProfile_Edit" text="Editar Perfil" />

{/* Put this part before </body> tag */}
<input type="checkbox" id="ListedStudentProfile_Edit" className="modal-toggle" />
<div className="modal">
    <div className="modal-box relative">
        <label htmlFor="ListedStudentProfile_Edit" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
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
            </div>           
        </div>
    );
};

export default StudentProfile;