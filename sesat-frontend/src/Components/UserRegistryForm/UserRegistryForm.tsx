export const UserRegistryForm = () => {
    return (

        

    <div className="flex flex-wrap gap-4 m-8 place-content-center">

        <label className="m-3 block text-2xl font-bold cursor-pointer">Dar de alta Usuario</label>  
        <div className="mt-6 mb-6 p-2 border-t border-b border-light-gray-22 border-solid w-full flex justify-end"></div>

        <div className="border border-light-gray-22 border-solid rounded p-10 m-4 self-start">
            <p className="text-3xl">Añadir alumno</p>

            <div className="form-control w-full max-w-xs">
                <label className="label">
                    <span className="label-text">Clave Única del Alumno</span>
                </label>
                <input type="text" placeholder="0-9" className="input rounded input-bordered w-full max-w-xs" />
            </div>

            <div className="form-control w-full max-w-xs">
                <label className="label">
                    <span className="label-text">Estado del alumno</span>
                </label>
                <select className="select select-bordered rounded">
                    <option>Activo</option>
                    <option>Inactivo</option>
                </select>
            </div>

            <div className="ml-auto mt-5 flex justify-end items-center">
                <button className="btn shadow rounded">Agregar</button>
            </div>
        </div>

        <div className="border border-light-gray-22 border-solid rounded p-10 m-4 self-start">
            <p className="text-3xl">Añadir Asesor</p>

            <div className="form-control w-full max-w-xs">
            <label className="label">
                <span className="label-text">Clave Única del Asesor</span>
            </label>
            <input type="text" placeholder="0-9" className="input rounded input-bordered w-full max-w-xs" />
            </div>

            <div className="form-control">
            <label className="label cursor-pointer">
                <span className="label-text">¿Es sinodal?</span> 
                <input type="checkbox" className="checkbox"/>
            </label>
            </div>

            <div className="ml-auto mt-5 flex justify-end items-center">
                <button className="btn shadow rounded">Agregar</button>
            </div>

        </div>

        <div className="border border-light-gray-22 border-solid rounded p-10 m-4 self-start">
            <p className="text-3xl">Añadir Asesor Externo</p>
        
            <div className="form-control w-full max-w-xs">
                <label className="label">
                    <span className="label-text">Clave del Asesor Externo</span>
                </label>
                <input type="text" placeholder="0-9" className="input rounded input-bordered w-full max-w-xs" />
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
                <input type="text" placeholder="" className="input rounded input-bordered w-full max-w-xs" />
            </div>

            <div className="form-control w-full max-w-xs">
                <label className="label">
                    <span className="label-text">Nombres</span>
                </label>
                <input type="text" placeholder="" className="input rounded input-bordered w-full max-w-xs" />
            </div>

            <div className="form-control w-full max-w-xs">
                <label className="label">
                    <span className="label-text">Apellido Paterno</span>
                </label>
                <input type="text" placeholder="" className="input rounded input-bordered w-full max-w-xs" />
            </div>

            <div className="form-control w-full max-w-xs">
                <label className="label">
                    <span className="label-text">Apellido Materno</span>
                </label>
                <input type="text" placeholder="" className="input rounded input-bordered w-full max-w-xs" />
            </div>

            <div className="form-control w-full max-w-xs">
                <label className="label">
                    <span className="label-text">Teléfono</span>
                </label>
                <input type="text" placeholder="" className="input rounded input-bordered w-full max-w-xs" />
            </div>

            <div className="form-control w-full max-w-xs">
                <label className="label">
                    <span className="label-text">Correo</span>
                </label>
                <input type="text" placeholder="" className="input rounded input-bordered w-full max-w-xs" />
            </div>

            <div className="ml-auto mt-5 flex justify-end items-center">
                <button className="btn shadow rounded">Agregar</button>
            </div>

        </div>

    </div>

    );
  };
  
  export default UserRegistryForm;