import { useEffect, useState } from "react";
import { SESAT } from "../../Interfaces/ISESAT";
import { UsuarioPruebaEndpoint } from "../../api/usuario-prueba.endpoint";
import { UsuarioEndpoint } from "../../api/usuario.endpoint";
import { Console } from "console";

export const UserRegistryForm = () => {

    const [claveUnica, setClaveUnica] = useState("");
    const [role, setRole] = useState<number>();
    const [activeStatus, setActiveStatus] = useState<boolean>();
    const [modalidad, setModalidad] = useState<number>();

    const [hasShownUserInfo, setHasShownUserInfo] = useState(false);
    const [usuarioPrueba, setUsuarioPrueba] = useState<SESAT.UsuarioPrueba | undefined>();

    const getUsuarioPrueba = async () => {
        if (claveUnica && claveUnica.length == 6) {
            setUsuarioPrueba(
                await UsuarioPruebaEndpoint.getUsuarioPrueba(
                    parseInt(claveUnica),
                    ""
                )
            )
            setHasShownUserInfo(true);
        }

        if(hasShownUserInfo == true)
        {
            setUsuarioPrueba(
                await UsuarioPruebaEndpoint.getUsuarioPrueba(
                    parseInt(claveUnica),
                    ""
                )
            )
            setHasShownUserInfo(false);
        }

    }

    useEffect(() => {
        getUsuarioPrueba();
    }, [claveUnica]
    )

    async function handleSubmit(e: any) {
        e.preventDefault();
        try {
            await UsuarioEndpoint.postUsuario({
                clave: parseInt(claveUnica),
                name: usuarioPrueba?.nombre! ?? "",
                last_name: usuarioPrueba?.apellido_mat! ?? "",
                family_name: usuarioPrueba?.apellido_mat! ?? "",
                password: usuarioPrueba?.password! ?? "",
                role: role! ?? "",
                active_status: activeStatus! ?? "",
                modalidad: modalidad! ?? "",
            }, "");

        } catch (err) {
            console.log(err);
        }
    }

    //0 --> Medio tiempo
    //1 -->Tiempo completo

    return (
        <>
            <div className="flex flex-wrap gap-4 m-8 ">
                <label className="block text-4xl font-bold">Dar de alta Usuario</label>
                <div className="border-b border-light-gray-22 border-solid w-full"></div>

                <form onSubmit={handleSubmit} className="border border-light-gray-22 border-solid rounded p-10 m-4 self-start">
                    <p className="text-3xl">Añadir usuario</p>

                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Clave Única</span>
                        </label>
                        <input type="text" placeholder="0-9" maxLength={6} className="input rounded input-bordered w-full max-w-xs"
                            value={claveUnica}
                            onChange={(e) => {
                                setClaveUnica(e.target.value);
                            }}
                        />
                    </div>

                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Modalidad</span>
                        </label>
                        <select required className="select select-bordered rounded" 
                            onChange={(e) => {
                                if (e.target.value == "0")
                                    setModalidad(0);
                                else if (e.target.value == "1") {
                                    setModalidad(1);
                                }
                            }}>
                            <option disabled selected >Seleccione una opción</option>
                            <option value={0}>Medio tiempo</option>
                            <option value={1}>Tiempo Completo</option>
                        </select>
                    </div>

                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Estado</span>
                        </label>
                        <select required className="select select-bordered rounded"
                            onChange={(e) => {
                                if (e.target.value == "0")
                                    setActiveStatus(false);
                                else if (e.target.value == "1") {
                                    setActiveStatus(true);
                                }
                            }}
                        >

                            <option disabled selected>Seleccione una opción</option>
                            <option value={"1"}>Activo</option>
                            <option value={"0"}>Inactivo</option>
                        </select>
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Tipo de usuario</span>
                        </label>
                        <select required className="select select-bordered rounded"
                            onChange={(e) => {
                                if (e.target.value == "0")
                                    setRole(3);
                                else if (e.target.value == "1") {
                                    setRole(2);
                                }
                            }}>
                            <option disabled selected>Seleccione una opción</option>
                            <option value={"0"}>Alumno</option>
                            <option value={"1"}>Asesor</option>
                        </select>
                    </div>

                    <div className="ml-auto mt-5 flex justify-end items-center">
                        <button type="submit" className="btn shadow rounded">Agregar</button>
                    </div>
                </form>


                <div className="border border-light-gray-22 border-solid rounded p-10 m-4 self-start">
                    <p className="text-3xl">Datos de usuario</p>
                    {usuarioPrueba
                        ? (
                            <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text">Nombre</span>
                                    {usuarioPrueba?.nombre}
                                </label>

                                <label className="label">
                                    <span className="label-text">Apellido Paterno</span>
                                    {usuarioPrueba?.apellido_pat}
                                </label>
                                <label className="label">
                                    <span className="label-text">Apellido Materno</span>
                                    {usuarioPrueba?.apellido_mat}
                                </label>

                            </div>
                        ) :
                        (
                            <label className="label">
                                <span className="label-text">No existe el usuario</span>
                            </label>
                        )}



                </div>


            </div>
        </>

    );
};

export default UserRegistryForm;