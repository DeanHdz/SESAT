export const UserRegistryForm = () => {
    return (
    <div className="flex flex-wrap gap-4 m-8 place-content-center">

        <div className="border-dashed border-4 border-[#0077ff] rounded-xl p-4 m-4 self-start">
            <p className="text-3xl">Añadir alumno</p>

            <div className="form-control w-full max-w-xs">
                <label className="label">
                    <span className="label-text">Clave Única del Alumno</span>
                </label>
                <input type="text" placeholder="0-9" className="input input-bordered w-full max-w-xs" />
            </div>

            <div className="form-control w-full max-w-xs">
                <label className="label">
                    <span className="label-text">Estado del alumno</span>
                </label>
                <select className="select select-bordered">
                    <option>Activo</option>
                    <option>Inactivo</option>
                </select>
            </div>

            <button className="btn bg-stone-500 my-2">Agregar</button>
        </div>

        <div className="border-dashed border-4 border-[#0077ff] rounded-xl p-4 m-4 self-start">
            <p className="text-3xl">Añadir Asesor</p>

            <div className="form-control w-full max-w-xs">
            <label className="label">
                <span className="label-text">Clave Única del Asesor</span>
            </label>
            <input type="text" placeholder="0-9" className="input input-bordered w-full max-w-xs" />
            </div>

            <div className="form-control">
            <label className="label cursor-pointer">
                <span className="label-text">¿Es sinodal?</span> 
                <input type="checkbox" className="checkbox"/>
            </label>
            </div>

            <button className="btn bg-stone-500 my-2">Agregar</button>

        </div>

        <div className="border-dashed border-4 border-[#0077ff] rounded-xl p-4 m-4 self-start">
            <p className="text-3xl">Añadir Asesor Externo</p>
        
            <div className="form-control w-full max-w-xs">
                <label className="label">
                    <span className="label-text">Clave del Asesor Externo</span>
                </label>
                <input type="text" placeholder="0-9" className="input input-bordered w-full max-w-xs" />
            </div>

            <div className="form-control">
            <label className="label cursor-pointer">
                <span className="label-text">¿Es sinodal?</span> 
                <input type="checkbox" className="checkbox"/>
            </label>
            </div>

            <div className="form-control w-full max-w-xs">
                <label className="label">
                    <span className="label-text">Nombre de Institución</span>
                </label>
                <input type="text" placeholder="" className="input input-bordered w-full max-w-xs" />
            </div>

            <div className="form-control w-full max-w-xs">
                <label className="label">
                    <span className="label-text">Nombres</span>
                </label>
                <input type="text" placeholder="" className="input input-bordered w-full max-w-xs" />
            </div>

            <div className="form-control w-full max-w-xs">
                <label className="label">
                    <span className="label-text">Apellido Paterno</span>
                </label>
                <input type="text" placeholder="" className="input input-bordered w-full max-w-xs" />
            </div>

            <div className="form-control w-full max-w-xs">
                <label className="label">
                    <span className="label-text">Apellido Materno</span>
                </label>
                <input type="text" placeholder="" className="input input-bordered w-full max-w-xs" />
            </div>

            <div className="form-control w-full max-w-xs">
                <label className="label">
                    <span className="label-text">Teléfono</span>
                </label>
                <input type="text" placeholder="" className="input input-bordered w-full max-w-xs" />
            </div>

            <div className="form-control w-full max-w-xs">
                <label className="label">
                    <span className="label-text">Correo</span>
                </label>
                <input type="text" placeholder="" className="input input-bordered w-full max-w-xs" />
            </div>

            <button className="btn bg-stone-500 my-2">Agregar</button>

        </div>

    </div>
    );
  };
  
  export default UserRegistryForm;