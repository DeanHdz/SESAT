export const UserRegistryForm = () => {
    return (



        <div className="flex flex-wrap gap-4 m-8 ">

            <label className="block text-4xl font-bold">Dar de alta Usuario</label>
            <div className="border-b border-light-gray-22 border-solid w-full"></div>

            <div className="border border-light-gray-22 border-solid rounded p-10 m-4 self-start">
                <p className="text-3xl">Añadir usuario</p>

                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Clave Única</span>
                    </label>
                    <input type="text" placeholder="0-9" className="input rounded input-bordered w-full max-w-xs" />
                </div>

                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Estado</span>
                    </label>
                    <select className="select select-bordered rounded">
                        <option>Activo</option>
                        <option>Inactivo</option>
                    </select>
                </div>
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Tipo de usuario</span>
                    </label>
                    <select className="select select-bordered rounded">
                        <option>Alumno</option>
                        <option>Asesor</option>
                    </select>
                </div>

                <div className="ml-auto mt-5 flex justify-end items-center">
                    <button className="btn shadow rounded">Agregar</button>
                </div>
            </div>

            <div className="border border-light-gray-22 border-solid rounded p-10 m-4 self-start">
                <p className="text-3xl">Datos de usuario</p>

                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Nombre</span>
                        {}
                    </label>

                    <label className="label">
                        <span className="label-text">Apellido Paterno</span>
                        {}
                    </label>
                    <label className="label">
                        <span className="label-text">Apellido Materno</span>
                        {}
                    </label>

                </div>


            </div>



        </div>

    );
};

export default UserRegistryForm;