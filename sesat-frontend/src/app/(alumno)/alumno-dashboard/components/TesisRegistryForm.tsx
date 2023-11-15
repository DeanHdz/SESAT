"use client";
import { useState, useEffect, ChangeEvent } from "react";
import { Tesis, TesisRegistryDTO, Usuario } from "../../../../../types/ISESAT";
import Cookies from "js-cookie";
import { UsuarioEndpoint } from "../../../../../utils/usuario.endpoint";
import { useDebounce } from "use-debounce";
import { postTesisRegistry } from "../../../../../utils/comite.endpoint";
import { useRouter } from "next/navigation";

export default function TesisRegistryForm({
  user,
  tesis,
}: {
  user: Usuario;
  tesis: Tesis;
}) {
  const cookie = Cookies.get("SESATsession");
  const token: string = cookie ? cookie.substring(1, cookie?.length - 1) : "";
  const router = useRouter()
  /* Button States */
  const [asesorBtn, setAsesorBtn] = useState<boolean>(false);
  const [coasesorBtn, setCoasesorBtn] = useState<boolean>(false);
  const [sinodalBtn, setSinodalBtn] = useState<boolean>(false);
  const [suplenteBtn, setSuplenteBtn] = useState<boolean>(false);
  /* Button States */

  const [selectedAsesor, setSelectedAsesor] = useState<Usuario | null>(null);
  const [selectedCoasesor, setSelectedCoasesor] = useState<Usuario | null>(
    null
  );
  const [selectedSinodal1, setSelectedSinodal1] = useState<Usuario | null>(
    null
  );
  const [selectedSinodal2, setSelectedSinodal2] = useState<Usuario | null>(
    null
  );
  const [selectedSinodal3, setSelectedSinodal3] = useState<Usuario | null>(
    null
  );
  const [selectedSinodal4, setSelectedSinodal4] = useState<Usuario | null>(
    null
  );
  const [selectedSuplente, setSelectedSuplente] = useState<Usuario | null>(
    null
  );

  const [tesisTitle, setTesisTitle] = useState<string>("");

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTesisTitle(e.target.value);
  };

  /* Search */
  const [text, setText] = useState<string | null>(null);
  const [query] = useDebounce(text, 750);
  const [retrievedAsesor, setRetrievedAsesor] = useState<Usuario[] | null>();

  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);

  useEffect(() => {
    const getUsuario = async (op: number) => {
      switch (op) {
        case 1: //find by Id
          const usuarioByIdData: Promise<Usuario[]> =
            UsuarioEndpoint.getAsesoresById(token, query ? parseInt(query) : 0);
          const fetchedUsuarioById = await usuarioByIdData;
          if (fetchedUsuarioById != null) {
            const fetchedUsuarioById2 = fetchedUsuarioById.filter(
              (usuario) =>
                (!selectedAsesor ||
                  usuario.id_usuario !== selectedAsesor.id_usuario) &&
                (!selectedCoasesor ||
                  usuario.id_usuario !== selectedCoasesor.id_usuario) &&
                (!selectedSinodal1 ||
                  usuario.id_usuario !== selectedSinodal1.id_usuario) &&
                (!selectedSinodal2 ||
                  usuario.id_usuario !== selectedSinodal2.id_usuario) &&
                (!selectedSinodal3 ||
                  usuario.id_usuario !== selectedSinodal3.id_usuario) &&
                (!selectedSinodal4 ||
                  usuario.id_usuario !== selectedSinodal4.id_usuario) &&
                (!selectedSuplente ||
                  usuario.id_usuario !== selectedSuplente.id_usuario)
            );
            setRetrievedAsesor(fetchedUsuarioById2);
          }
          break;
        case 2: //Find by Name
          const usuarioByNameData: Promise<Usuario[]> =
            UsuarioEndpoint.getAsesoresByName(token, query ? query : "");
          const fetchedUsuarioByName = await usuarioByNameData;
          if (fetchedUsuarioByName != null) {
            const fetchedUsuarioByName2 = fetchedUsuarioByName.filter(
              (usuario) =>
                (!selectedAsesor ||
                  usuario.id_usuario !== selectedAsesor.id_usuario) &&
                (!selectedCoasesor ||
                  usuario.id_usuario !== selectedCoasesor.id_usuario) &&
                (!selectedSinodal1 ||
                  usuario.id_usuario !== selectedSinodal1.id_usuario) &&
                (!selectedSinodal2 ||
                  usuario.id_usuario !== selectedSinodal2.id_usuario) &&
                (!selectedSinodal3 ||
                  usuario.id_usuario !== selectedSinodal3.id_usuario) &&
                (!selectedSinodal4 ||
                  usuario.id_usuario !== selectedSinodal4.id_usuario) &&
                (!selectedSuplente ||
                  usuario.id_usuario !== selectedSuplente.id_usuario)
            );
            setRetrievedAsesor(fetchedUsuarioByName2);
          }
          break;
      }
    };
    if (query != null && query != "") {
      if (!isNaN(Number(query))) {
        //is Nan Shit
        getUsuario(1);
      } else {
        getUsuario(2);
      }
    }
  }, [query]); //,router

  const searchBar = (
    <div className="mb-2 p-2 border-t border-b border-light-gray-22 border-solid w-full flex justify-end">
      <input
        type="search"
        placeholder="Nombre o Clave/RPE"
        className="rounded-full border-b border-light-gray-22 border-solid px-6"
        onChange={(e) => {
          setText(e.target.value);
        }}
      />
      <div className="flex items-center ml-2">
        <svg
          stroke="#d5d3dd"
          fill="#d5d3dd"
          strokeWidth="0"
          viewBox="0 0 24 24"
          height="24px"
          width="24px"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M19.023,16.977c-0.513-0.488-1.004-0.997-1.367-1.384c-0.372-0.378-0.596-0.653-0.596-0.653l-2.8-1.337 C15.34,12.37,16,10.763,16,9c0-3.859-3.14-7-7-7S2,5.141,2,9s3.14,7,7,7c1.763,0,3.37-0.66,4.603-1.739l1.337,2.8 c0,0,0.275,0.224,0.653,0.596c0.387,0.363,0.896,0.854,1.384,1.367c0.494,0.506,0.988,1.012,1.358,1.392 c0.362,0.388,0.604,0.646,0.604,0.646l2.121-2.121c0,0-0.258-0.242-0.646-0.604C20.035,17.965,19.529,17.471,19.023,16.977z M9,14 c-2.757,0-5-2.243-5-5s2.243-5,5-5s5,2.243,5,5S11.757,14,9,14z"></path>
        </svg>
      </div>
    </div>
  );
  /* Search */

  const handleSinodalSelection = (user: Usuario) => {
    if (
      user !== selectedSinodal1 &&
      user !== selectedSinodal2 &&
      user !== selectedSinodal3 &&
      user !== selectedSinodal4
    ) {
      if (selectedSinodal1 === null) {
        setSelectedSinodal1(user);
      } else if (selectedSinodal2 === null) {
        setSelectedSinodal2(user);
      } else if (selectedSinodal3 === null) {
        setSelectedSinodal3(user);
      } else if (selectedSinodal4 === null) {
        setSelectedSinodal4(user);
      }
    }
  };

  const handleTesisRegistry = async () => {
    const tesisRegistryDTO: TesisRegistryDTO = {
      id_tesis: tesis.id_tesis,
      id_usuario: user.id_usuario,
      titulo: tesisTitle,
      asesor: selectedAsesor,
      coasesor: selectedCoasesor,
      sinodal1: selectedSinodal1,
      sinodal2: selectedSinodal2,
      sinodal3: selectedSinodal3,
      sinodal4: selectedSinodal4,
      suplente: selectedSuplente,
    }
    const res = await postTesisRegistry(token, tesisRegistryDTO);
    if(res != null) 
    {
      setShowSuccessModal(!showSuccessModal)
    }
    else 
      console.log("incorrecto")
  }

  const successModal = (
    <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                  <svg className="h-6 w-6 text-green-600" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="40" zoomAndPan="magnify" viewBox="0 0 30 30.000001" height="40" preserveAspectRatio="xMidYMid meet" version="1.0">
                    <defs>
                      <clipPath id="id1">
                        <path d="M 2.328125 4.222656 L 27.734375 4.222656 L 27.734375 24.542969 L 2.328125 24.542969 Z M 2.328125 4.222656 " clipRule="nonzero"/>
                      </clipPath>
                    </defs>
                    <g clipPath="url(#id1)">
                      <path fill="rgb(0%, 40%, 20%)" d="M 27.5 7.53125 L 24.464844 4.542969 C 24.15625 4.238281 23.65625 4.238281 23.347656 4.542969 L 11.035156 16.667969 L 6.824219 12.523438 C 6.527344 12.230469 6 12.230469 5.703125 12.523438 L 2.640625 15.539062 C 2.332031 15.84375 2.332031 16.335938 2.640625 16.640625 L 10.445312 24.324219 C 10.59375 24.472656 10.796875 24.554688 11.007812 24.554688 C 11.214844 24.554688 11.417969 24.472656 11.566406 24.324219 L 27.5 8.632812 C 27.648438 8.488281 27.734375 8.289062 27.734375 8.082031 C 27.734375 7.875 27.648438 7.679688 27.5 7.53125 Z M 27.5 7.53125 " fillOpacity="1" fillRule="nonzero"/>
                    </g>
                  </svg>
                </div>
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <h3 className="text-base font-semibold leading-6 text-gray-900" id="modal-title">Operación exitosa</h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">Se ha registrado la tesis con éxito.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6"> 
              <button 
                type="button" 
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                onClick={() => {
                  router.push("/alumno-dashboard");
                }}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full">
      {showSuccessModal ? (successModal) : ("")}
      <div className="w-full my-2 p-2">
        <div className="w-full my-2 flex gap-2">
          <div className="gray__border w-3/6 h-[200px]">
            <div className="text-xl font-bold my-2 text-dark-blue-10 px-2">
              Título de la Tesis
            </div>
            <input
              type="text"
              className="mx-2 w-11/12 border-t-0 border-l-0 border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-dark-blue-10 transition duration-300 ease-in-out appearance-none"
              placeholder="Titulo de la tesis..."
              onChange={handleTitleChange}
            />
            <p className="w-full text-center text-[15px] px-8 my-8">
              Indica el <span className="font-semibold text-dark-blue-10 italic">título de tu tesis</span> para realizar el registro.
              <br/>
              Recuerda que puedes solicitar un <span className="font-semibold text-dark-blue-10 italic">cambio de título</span> a tu asesor.
            </p>
          </div>
          <div className="gray__border w-3/6 h-[200px] p-2 flex flex-col overflow-auto">
            <div className="text-xl font-bold my-2 text-dark-blue-10">
              Comité
            </div>
            <div className="w-full px-4 flex flex-col">
              <div className="w-full text-[14px] font-semibold">Asesor</div>
              {selectedAsesor ? (
                <div className="w-full flex gap-2">
                  <div className="w-[25px] text-dark-blue-10 flex items-center justify-center mx-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                    </svg>
                  </div>
                  <div className="w-1/2">
                    <div className="font-semibold text-dark-blue-10 text-[14px] italic">
                      Nombre
                    </div>
                    <div className="text-base">{`${selectedAsesor.nombre} ${selectedAsesor.apellido_paterno} ${selectedAsesor.apellido_materno}`}</div>
                  </div>
                  <div className="w-1/3">
                    <div className="font-semibold text-dark-blue-10 text-[14px] italic">
                      Correo
                    </div>
                    <div className="text-base">{selectedAsesor.correo}</div>
                  </div>
                </div>
              ) : (
                <div className="w-full flex gap-2">
                  <div className="w-[25px] text-dark-blue-10 flex items-center justify-center mx-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                    </svg>
                  </div>
                  <div className="w-1/2">
                    <div className="font-semibold text-dark-blue-10 text-[14px] italic">
                      Nombre
                    </div>
                    <div className="text-base"></div>
                  </div>
                  <div className="w-1/3">
                    <div className="font-semibold text-dark-blue-10 text-[14px] italic">
                      Correo
                    </div>
                    <div className="text-base"></div>
                  </div>
                </div>
              )}
              <div className="w-full text-[14px] font-semibold">Co-asesor</div>
              {selectedCoasesor ? (
                <div className="w-full flex gap-2">
                  <div className="w-[25px] text-dark-blue-10 flex items-center justify-center mx-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                    </svg>
                  </div>
                  <div className="w-1/2">
                    <div className="font-semibold text-dark-blue-10 text-[14px] italic">
                      Nombre
                    </div>
                    <div className="text-base">{`${selectedCoasesor.nombre} ${selectedCoasesor.apellido_paterno} ${selectedCoasesor.apellido_materno}`}</div>
                  </div>
                  <div className="w-1/3">
                    <div className="font-semibold text-dark-blue-10 text-[14px] italic">
                      Correo
                    </div>
                    <div className="text-base">{selectedCoasesor.correo}</div>
                  </div>
                </div>
              ) : (
                <div className="w-full flex gap-2">
                  <div className="w-[25px] text-dark-blue-10 flex items-center justify-center mx-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                    </svg>
                  </div>
                  <div className="w-1/2">
                    <div className="font-semibold text-dark-blue-10 text-[14px] italic">
                      Nombre
                    </div>
                    <div className="text-base"></div>
                  </div>
                  <div className="w-1/3">
                    <div className="font-semibold text-dark-blue-10 text-[14px] italic">
                      Correo
                    </div>
                    <div className="text-base"></div>
                  </div>
                </div>
              )}
              <div className="w-full text-[14px] font-semibold">Sinodales</div>
              {selectedSinodal1 ? (
                <div className="w-full flex gap-2">
                  <div className="w-[25px] text-dark-blue-10 flex items-center justify-center mx-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                    </svg>
                  </div>
                  <div className="w-1/2">
                    <div className="font-semibold text-dark-blue-10 text-[14px] italic">
                      Nombre
                    </div>
                    <div className="text-base">{`${selectedSinodal1.nombre} ${selectedSinodal1.apellido_paterno} ${selectedSinodal1.apellido_materno}`}</div>
                  </div>
                  <div className="w-1/3">
                    <div className="font-semibold text-dark-blue-10 text-[14px] italic">
                      Correo
                    </div>
                    <div className="text-base">{selectedSinodal1.correo}</div>
                  </div>
                </div>
              ) : (
                <div className="w-full flex gap-2">
                  <div className="w-[25px] text-dark-blue-10 flex items-center justify-center mx-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                    </svg>
                  </div>
                  <div className="w-1/2">
                    <div className="font-semibold text-dark-blue-10 text-[14px] italic">
                      Nombre
                    </div>
                    <div className="text-base"></div>
                  </div>
                  <div className="w-1/3">
                    <div className="font-semibold text-dark-blue-10 text-[14px] italic">
                      Correo
                    </div>
                    <div className="text-base"></div>
                  </div>
                </div>
              )}
              {selectedSinodal2 ? (
                <div className="w-full flex gap-2">
                  <div className="w-[25px] text-dark-blue-10 flex items-center justify-center mx-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                    </svg>
                  </div>
                  <div className="w-1/2">
                    <div className="font-semibold text-dark-blue-10 text-[14px] italic">
                      Nombre
                    </div>
                    <div className="text-base">{`${selectedSinodal2.nombre} ${selectedSinodal2.apellido_paterno} ${selectedSinodal2.apellido_materno}`}</div>
                  </div>
                  <div className="w-1/3">
                    <div className="font-semibold text-dark-blue-10 text-[14px] italic">
                      Correo
                    </div>
                    <div className="text-base">{selectedSinodal2.correo}</div>
                  </div>
                </div>
              ) : (
                <div className="w-full flex gap-2">
                  <div className="w-[25px] text-dark-blue-10 flex items-center justify-center mx-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                    </svg>
                  </div>
                  <div className="w-1/2">
                    <div className="font-semibold text-dark-blue-10 text-[14px] italic">
                      Nombre
                    </div>
                    <div className="text-base"></div>
                  </div>
                  <div className="w-1/3">
                    <div className="font-semibold text-dark-blue-10 text-[14px] italic">
                      Correo
                    </div>
                    <div className="text-base"></div>
                  </div>
                </div>
              )}
              {user.datos_alumno && user.datos_alumno.id_grado_estudio == 2 ? (
                <>
                  {selectedSinodal3 ? (
                    <div className="w-full flex gap-2">
                      <div className="w-[25px] text-dark-blue-10 flex items-center justify-center mx-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                        >
                          <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                        </svg>
                      </div>
                      <div className="w-1/2">
                        <div className="font-semibold text-dark-blue-10 text-[14px] italic">
                          Nombre
                        </div>
                        <div className="text-base">{`${selectedSinodal3.nombre} ${selectedSinodal3.apellido_paterno} ${selectedSinodal3.apellido_materno}`}</div>
                      </div>
                      <div className="w-1/3">
                        <div className="font-semibold text-dark-blue-10 text-[14px] italic">
                          Correo
                        </div>
                        <div className="text-base">
                          {selectedSinodal3.correo}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full flex gap-2">
                      <div className="w-[25px] text-dark-blue-10 flex items-center justify-center mx-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                        >
                          <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                        </svg>
                      </div>
                      <div className="w-1/2">
                        <div className="font-semibold text-dark-blue-10 text-[14px] italic">
                          Nombre
                        </div>
                        <div className="text-base"></div>
                      </div>
                      <div className="w-1/3">
                        <div className="font-semibold text-dark-blue-10 text-[14px] italic">
                          Correo
                        </div>
                        <div className="text-base"></div>
                      </div>
                    </div>
                  )}
                  {selectedSinodal4 ? (
                    <div className="w-full flex gap-2">
                      <div className="w-[25px] text-dark-blue-10 flex items-center justify-center mx-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                        >
                          <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                        </svg>
                      </div>
                      <div className="w-1/2">
                        <div className="font-semibold text-dark-blue-10 text-[14px] italic">
                          Nombre
                        </div>
                        <div className="text-base">{`${selectedSinodal4.nombre} ${selectedSinodal4.apellido_paterno} ${selectedSinodal4.apellido_materno}`}</div>
                      </div>
                      <div className="w-1/3">
                        <div className="font-semibold text-dark-blue-10 text-[14px] italic">
                          Correo
                        </div>
                        <div className="text-base">
                          {selectedSinodal4.correo}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full flex gap-2">
                      <div className="w-[25px] text-dark-blue-10 flex items-center justify-center mx-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                        >
                          <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                        </svg>
                      </div>
                      <div className="w-1/2">
                        <div className="font-semibold text-dark-blue-10 text-[14px] italic">
                          Nombre
                        </div>
                        <div className="text-base"></div>
                      </div>
                      <div className="w-1/3">
                        <div className="font-semibold text-dark-blue-10 text-[14px] italic">
                          Correo
                        </div>
                        <div className="text-base"></div>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                ""
              )}
              <div className="w-full text-[14px] font-semibold">Suplente</div>
              {selectedSuplente ? (
                <div className="w-full flex gap-2">
                  <div className="w-[25px] text-dark-blue-10 flex items-center justify-center mx-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                    </svg>
                  </div>
                  <div className="w-1/2">
                    <div className="font-semibold text-dark-blue-10 text-[14px] italic">
                      Nombre
                    </div>
                    <div className="text-base">{`${selectedSuplente.nombre} ${selectedSuplente.apellido_paterno} ${selectedSuplente.apellido_materno}`}</div>
                  </div>
                  <div className="w-1/3">
                    <div className="font-semibold text-dark-blue-10 text-[14px] italic">
                      Correo
                    </div>
                    <div className="text-base">{selectedSuplente.correo}</div>
                  </div>
                </div>
              ) : (
                <div className="w-full flex gap-2">
                  <div className="w-[25px] text-dark-blue-10 flex items-center justify-center mx-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                    </svg>
                  </div>
                  <div className="w-1/2">
                    <div className="font-semibold text-dark-blue-10 text-[14px] italic">
                      Nombre
                    </div>
                    <div className="text-base"></div>
                  </div>
                  <div className="w-1/3">
                    <div className="font-semibold text-dark-blue-10 text-[14px] italic">
                      Correo
                    </div>
                    <div className="text-base"></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="text-xl font-bold my-2 text-dark-blue-10">
          Selección de Comité
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            className={`${
              asesorBtn
                ? "bg-dark-blue-10 text-white border border-white"
                : "text-dark-blue-10 border-blue-700 border"
            } font-bold rounded-lg text-sm text-center px-2 py-2`}
            onClick={() => {
              setAsesorBtn(!asesorBtn);
              if (coasesorBtn) {
                setCoasesorBtn(!coasesorBtn);
                setText("101010101010");
              }
              if (sinodalBtn) {
                setSinodalBtn(!sinodalBtn);
                setText("101010101010");
              }
              if (suplenteBtn) {
                setSuplenteBtn(!suplenteBtn);
                setText("101010101010");
              }
            }}
          >
            Asesor
          </button>
          <button
            type="button"
            className={`${
              coasesorBtn
                ? "bg-dark-blue-10 text-white border border-white"
                : "text-dark-blue-10 border-blue-700 border"
            } font-bold rounded-lg text-sm text-center px-2 py-2`}
            onClick={() => {
              setCoasesorBtn(!coasesorBtn);
              if (asesorBtn) {
                setAsesorBtn(!asesorBtn);
                setText("101010101010");
              }
              if (sinodalBtn) {
                setSinodalBtn(!sinodalBtn);
                setText("101010101010");
              }
              if (suplenteBtn) {
                setSuplenteBtn(!suplenteBtn);
                setText("101010101010");
              }
            }}
          >
            Co-asesor
          </button>
          <button
            type="button"
            className={`${
              sinodalBtn
                ? "bg-dark-blue-10 text-white border border-white"
                : "text-dark-blue-10 border-blue-700 border"
            } font-bold rounded-lg text-sm text-center px-2 py-2`}
            onClick={() => {
              setSinodalBtn(!sinodalBtn);
              if (asesorBtn) {
                setAsesorBtn(!asesorBtn);
                setText("101010101010");
              }
              if (coasesorBtn) {
                setCoasesorBtn(!coasesorBtn);
                setText("101010101010");
              }
              if (suplenteBtn) {
                setSuplenteBtn(!suplenteBtn);
                setText("101010101010");
              }
            }}
          >
            Sinodales
          </button>
          <button
            type="button"
            className={`${
              suplenteBtn
                ? "bg-dark-blue-10 text-white border border-white"
                : "text-dark-blue-10 border-blue-700 border"
            } font-bold rounded-lg text-sm text-center px-2 py-2`}
            onClick={() => {
              setSuplenteBtn(!suplenteBtn);
              if (asesorBtn) {
                setAsesorBtn(!asesorBtn);
                setText("101010101010");
              }
              if (coasesorBtn) {
                setCoasesorBtn(!coasesorBtn);
                setText("101010101010");
              }
              if (sinodalBtn) {
                setSinodalBtn(!sinodalBtn);
                setText("101010101010");
              }
            }}
          >
            Suplente
          </button>
        </div>
        {asesorBtn && selectedAsesor == null ? (
          <div className="w-full gray__border py-2 my-2 px-2">
            {searchBar}
            <div className="max-h-[250px] overflow-auto mt-2 flex flex-col flex-shrink-0">
              {retrievedAsesor?.map((user: Usuario, i: number) => (
                <>
                  {user.id_usuario < 1000000 ? (
                    <div
                      key={i}
                      className={
                        i % 2 === 0
                          ? "w-full px-4 flex items-center bg-gray-100"
                          : "w-full px-4 flex items-center"
                      }
                    >
                      <div className="w-[25px] text-dark-blue-10 flex items-center justify-center mx-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                        >
                          <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                        </svg>
                      </div>
                      <div className="min-w-[300px]">
                        <div className="font-semibold text-dark-blue-10 text-[14px] italic">
                          Nombre
                        </div>
                        <div className="text-base">{`${user.nombre} ${user.apellido_paterno} ${user.apellido_materno}`}</div>
                      </div>
                      <div className="min-w-[300px]">
                        <div className="font-semibold text-dark-blue-10 text-[14px] italic">
                          Correo
                        </div>
                        <div className="text-base">{user.correo}</div>
                      </div>
                      <div className="min-w-[150px]">
                        <div className="font-semibold text-dark-blue-10 text-[14px] italic">
                          Status
                        </div>
                        <div className="text-base">
                          {user.id_usuario < 1000000
                            ? "Profesor del Área"
                            : "Asesor Externo"}
                        </div>
                      </div>
                      <button
                        className="text-dark-blue-10 font-bold rounded-full border border-dark-blue-10 text-sm text-center py-1 px-2 hover:text-white hover:border-white hover:bg-dark-blue-10"
                        onClick={() => {
                          setSelectedAsesor(user);
                        }}
                      >
                        Seleccionar
                      </button>
                    </div>
                  ) : (
                    ""
                  )}
                </>
              ))}
            </div>
          </div>
        ) : (
          <>
            {asesorBtn && selectedAsesor ? (
              <div className="w-full gray__border py-2 my-2">
                <div className="w-full px-4 flex items-center">
                  <div className="w-[25px] text-dark-blue-10 flex items-center justify-center mx-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                    </svg>
                  </div>
                  <div className="w-1/3">
                    <div className="font-semibold text-dark-blue-10 text-[14px] italic">
                      Nombre
                    </div>
                    <div className="text-base">{`${selectedAsesor.nombre} ${selectedAsesor.apellido_paterno} ${selectedAsesor.apellido_materno}`}</div>
                  </div>
                  <div className="w-1/3">
                    <div className="font-semibold text-dark-blue-10 text-[14px] italic">
                      Correo
                    </div>
                    <div className="text-base">{selectedAsesor.correo}</div>
                  </div>
                  <div className="min-w-[150px]">
                    <div className="font-semibold text-dark-blue-10 text-[14px] italic">
                      Status
                    </div>
                    <div className="text-base">
                      {selectedAsesor.id_usuario < 1000000
                        ? "Profesor del Área"
                        : "Asesor Externo"}
                    </div>
                  </div>
                  <button
                    className="text-dark-blue-10 font-bold rounded-full border border-dark-blue-10 text-sm text-center py-1 px-2 hover:text-white hover:border-white hover:bg-dark-blue-10"
                    onClick={() => {
                      setSelectedAsesor(null);
                    }}
                  >
                    Remover
                  </button>
                </div>
              </div>
            ) : (
              ""
            )}
          </>
        )}
        {coasesorBtn && selectedCoasesor == null ? (
          <div className="w-full gray__border py-2 my-2 px-2">
            {searchBar}
            <div className="max-h-[250px] overflow-auto mt-2 flex flex-col flex-shrink-0">
              {retrievedAsesor?.map((user: Usuario, i: number) => (
                <div
                  key={i}
                  className={
                    i % 2 === 0
                      ? "w-full px-4 flex items-center bg-gray-100"
                      : "w-full px-4 flex items-center"
                  }
                >
                  <div className="w-[25px] text-dark-blue-10 flex items-center justify-center mx-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                    </svg>
                  </div>
                  <div className="min-w-[300px]">
                    <div className="font-semibold text-dark-blue-10 text-[14px] italic">
                      Nombre
                    </div>
                    <div className="text-base">{`${user.nombre} ${user.apellido_paterno} ${user.apellido_materno}`}</div>
                  </div>
                  <div className="min-w-[300px]">
                    <div className="font-semibold text-dark-blue-10 text-[14px] italic">
                      Correo
                    </div>
                    <div className="text-base">{user.correo}</div>
                  </div>
                  <div className="min-w-[150px]">
                    <div className="font-semibold text-dark-blue-10 text-[14px] italic">
                      Status
                    </div>
                    <div className="text-base">
                      {user.id_usuario < 1000000
                        ? "Profesor del Área"
                        : "Asesor Externo"}
                    </div>
                  </div>
                  <button
                    className="text-dark-blue-10 font-bold rounded-full border border-dark-blue-10 text-sm text-center py-1 px-2 hover:text-white hover:border-white hover:bg-dark-blue-10"
                    onClick={() => {
                      setSelectedCoasesor(user);
                    }}
                  >
                    Seleccionar
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <>
            {coasesorBtn && selectedCoasesor ? (
              <div className="w-full gray__border py-2 my-2">
                <div className="w-full px-4 flex items-center">
                  <div className="w-[25px] text-dark-blue-10 flex items-center justify-center mx-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                    </svg>
                  </div>
                  <div className="w-1/3">
                    <div className="font-semibold text-dark-blue-10 text-[14px] italic">
                      Nombre
                    </div>
                    <div className="text-base">{`${selectedCoasesor.nombre} ${selectedCoasesor.apellido_paterno} ${selectedCoasesor.apellido_materno}`}</div>
                  </div>
                  <div className="w-1/3">
                    <div className="font-semibold text-dark-blue-10 text-[14px] italic">
                      Correo
                    </div>
                    <div className="text-base">{selectedCoasesor.correo}</div>
                  </div>
                  <div className="min-w-[150px]">
                    <div className="font-semibold text-dark-blue-10 text-[14px] italic">
                      Status
                    </div>
                    <div className="text-base">
                      {selectedCoasesor.id_usuario < 1000000
                        ? "Profesor del Área"
                        : "Asesor Externo"}
                    </div>
                  </div>
                  <button
                    className="text-dark-blue-10 font-bold rounded-full border border-dark-blue-10 text-sm text-center py-1 px-2 hover:text-white hover:border-white hover:bg-dark-blue-10"
                    onClick={() => {
                      setSelectedCoasesor(null);
                    }}
                  >
                    Remover
                  </button>
                </div>
              </div>
            ) : (
              ""
            )}
          </>
        )}

        {user.datos_alumno && user.datos_alumno.id_grado_estudio == 1 ? (
          <>
            {sinodalBtn &&
            (selectedSinodal1 === null || selectedSinodal2 === null) ? (
              <div className="w-full gray__border py-2 my-2 px-2">
                {searchBar}
                <div className="max-h-[250px] overflow-auto mt-2 flex flex-col flex-shrink-0">
                  {retrievedAsesor?.map((user: Usuario, i: number) => (
                    <div
                      key={i}
                      className={
                        i % 2 === 0
                          ? "w-full px-4 flex items-center bg-gray-100"
                          : "w-full px-4 flex items-center"
                      }
                    >
                      <div className="w-[25px] text-dark-blue-10 flex items-center justify-center mx-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                        >
                          <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                        </svg>
                      </div>
                      <div className="min-w-[300px]">
                        <div className="font-semibold text-dark-blue-10 text-[14px] italic">
                          Nombre
                        </div>
                        <div className="text-base">{`${user.nombre} ${user.apellido_paterno} ${user.apellido_materno}`}</div>
                      </div>
                      <div className="min-w-[300px]">
                        <div className="font-semibold text-dark-blue-10 text-[14px] italic">
                          Correo
                        </div>
                        <div className="text-base">{user.correo}</div>
                      </div>
                      <div className="min-w-[150px]">
                        <div className="font-semibold text-dark-blue-10 text-[14px] italic">
                          Status
                        </div>
                        <div className="text-base">
                          {user.id_usuario < 1000000
                            ? "Profesor del Área"
                            : "Asesor Externo"}
                        </div>
                      </div>
                      <button
                        className="text-dark-blue-10 font-bold rounded-full border border-dark-blue-10 text-sm text-center py-1 px-2 hover:text-white hover:border-white hover:bg-dark-blue-10"
                        onClick={() => {
                          handleSinodalSelection(user);
                        }}
                      >
                        Seleccionar
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <>
                {sinodalBtn &&
                selectedSinodal1 !== null &&
                selectedSinodal2 !== null ? (
                  <div className="w-full gray__border py-2 my-2">
                    <div className="w-full px-4 flex items-center">
                      <div className="w-[25px] text-dark-blue-10 flex items-center justify-center mx-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                        >
                          <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                        </svg>
                      </div>
                      <div className="w-1/3">
                        <div className="font-semibold text-dark-blue-10 text-[14px] italic">
                          Nombre
                        </div>
                        <div className="text-base">{`${selectedSinodal1.nombre} ${selectedSinodal1.apellido_paterno} ${selectedSinodal1.apellido_materno}`}</div>
                      </div>
                      <div className="w-1/3">
                        <div className="font-semibold text-dark-blue-10 text-[14px] italic">
                          Correo
                        </div>
                        <div className="text-base">
                          {selectedSinodal1.correo}
                        </div>
                      </div>
                      <div className="min-w-[150px]">
                        <div className="font-semibold text-dark-blue-10 text-[14px] italic">
                          Status
                        </div>
                        <div className="text-base">
                          {selectedSinodal1.id_usuario < 1000000
                            ? "Profesor del Área"
                            : "Asesor Externo"}
                        </div>
                      </div>
                      <button
                        className="text-dark-blue-10 font-bold rounded-full border border-dark-blue-10 text-sm text-center py-1 px-2 hover:text-white hover:border-white hover:bg-dark-blue-10"
                        onClick={() => {
                          setSelectedSinodal1(null);
                        }}
                      >
                        Remover
                      </button>
                    </div>
                    <div className="w-full px-4 flex items-center">
                      <div className="w-[25px] text-dark-blue-10 flex items-center justify-center mx-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                        >
                          <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                        </svg>
                      </div>
                      <div className="w-1/3">
                        <div className="font-semibold text-dark-blue-10 text-[14px] italic">
                          Nombre
                        </div>
                        <div className="text-base">{`${selectedSinodal2.nombre} ${selectedSinodal2.apellido_paterno} ${selectedSinodal2.apellido_materno}`}</div>
                      </div>
                      <div className="w-1/3">
                        <div className="font-semibold text-dark-blue-10 text-[14px] italic">
                          Correo
                        </div>
                        <div className="text-base">
                          {selectedSinodal2.correo}
                        </div>
                      </div>
                      <div className="min-w-[150px]">
                        <div className="font-semibold text-dark-blue-10 text-[14px] italic">
                          Status
                        </div>
                        <div className="text-base">
                          {selectedSinodal2.id_usuario < 1000000
                            ? "Profesor del Área"
                            : "Asesor Externo"}
                        </div>
                      </div>
                      <button
                        className="text-dark-blue-10 font-bold rounded-full border border-dark-blue-10 text-sm text-center py-1 px-2 hover:text-white hover:border-white hover:bg-dark-blue-10"
                        onClick={() => {
                          setSelectedSinodal2(null);
                        }}
                      >
                        Remover
                      </button>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </>
            )}
          </>
        ) : (
          <>
            {sinodalBtn &&
            (selectedSinodal1 === null ||
              selectedSinodal2 === null ||
              selectedSinodal3 === null ||
              selectedSinodal4 === null) ? (
              <div className="w-full gray__border py-2 my-2 px-2">
                {searchBar}
                <div className="max-h-[250px] overflow-auto mt-2 flex flex-col flex-shrink-0">
                  {retrievedAsesor?.map((user: Usuario, i: number) => (
                    <div
                      key={i}
                      className={
                        i % 2 === 0
                          ? "w-full px-4 flex items-center bg-gray-100"
                          : "w-full px-4 flex items-center"
                      }
                    >
                      <div className="w-[25px] text-dark-blue-10 flex items-center justify-center mx-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                        >
                          <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                        </svg>
                      </div>
                      <div className="min-w-[300px]">
                        <div className="font-semibold text-dark-blue-10 text-[14px] italic">
                          Nombre
                        </div>
                        <div className="text-base">{`${user.nombre} ${user.apellido_paterno} ${user.apellido_materno}`}</div>
                      </div>
                      <div className="min-w-[300px]">
                        <div className="font-semibold text-dark-blue-10 text-[14px] italic">
                          Correo
                        </div>
                        <div className="text-base">{user.correo}</div>
                      </div>
                      <div className="min-w-[150px]">
                        <div className="font-semibold text-dark-blue-10 text-[14px] italic">
                          Status
                        </div>
                        <div className="text-base">
                          {user.id_usuario < 1000000
                            ? "Profesor del Área"
                            : "Asesor Externo"}
                        </div>
                      </div>
                      <button
                        className="text-dark-blue-10 font-bold rounded-full border border-dark-blue-10 text-sm text-center py-1 px-2 hover:text-white hover:border-white hover:bg-dark-blue-10"
                        onClick={() => {
                          handleSinodalSelection(user);
                        }}
                      >
                        Seleccionar
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <>
                {sinodalBtn &&
                selectedSinodal1 !== null &&
                selectedSinodal2 !== null &&
                selectedSinodal3 !== null &&
                selectedSinodal4 !== null ? (
                  <div className="w-full gray__border py-2 my-2">
                    <div className="w-full px-4 flex items-center">
                      <div className="w-[25px] text-dark-blue-10 flex items-center justify-center mx-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                        >
                          <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                        </svg>
                      </div>
                      <div className="w-1/3">
                        <div className="font-semibold text-dark-blue-10 text-[14px] italic">
                          Nombre
                        </div>
                        <div className="text-base">{`${selectedSinodal1.nombre} ${selectedSinodal1.apellido_paterno} ${selectedSinodal1.apellido_materno}`}</div>
                      </div>
                      <div className="w-1/3">
                        <div className="font-semibold text-dark-blue-10 text-[14px] italic">
                          Correo
                        </div>
                        <div className="text-base">
                          {selectedSinodal1.correo}
                        </div>
                      </div>
                      <div className="min-w-[150px]">
                        <div className="font-semibold text-dark-blue-10 text-[14px] italic">
                          Status
                        </div>
                        <div className="text-base">
                          {selectedSinodal1.id_usuario < 1000000
                            ? "Profesor del Área"
                            : "Asesor Externo"}
                        </div>
                      </div>
                      <button
                        className="text-dark-blue-10 font-bold rounded-full border border-dark-blue-10 text-sm text-center py-1 px-2 hover:text-white hover:border-white hover:bg-dark-blue-10"
                        onClick={() => {
                          setSelectedSinodal1(null);
                        }}
                      >
                        Remover
                      </button>
                    </div>
                    <div className="w-full px-4 flex items-center">
                      <div className="w-[25px] text-dark-blue-10 flex items-center justify-center mx-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                        >
                          <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                        </svg>
                      </div>
                      <div className="w-1/3">
                        <div className="font-semibold text-dark-blue-10 text-[14px] italic">
                          Nombre
                        </div>
                        <div className="text-base">{`${selectedSinodal2.nombre} ${selectedSinodal2.apellido_paterno} ${selectedSinodal2.apellido_materno}`}</div>
                      </div>
                      <div className="w-1/3">
                        <div className="font-semibold text-dark-blue-10 text-[14px] italic">
                          Correo
                        </div>
                        <div className="text-base">
                          {selectedSinodal2.correo}
                        </div>
                      </div>
                      <div className="min-w-[150px]">
                        <div className="font-semibold text-dark-blue-10 text-[14px] italic">
                          Status
                        </div>
                        <div className="text-base">
                          {selectedSinodal2.id_usuario < 1000000
                            ? "Profesor del Área"
                            : "Asesor Externo"}
                        </div>
                      </div>
                      <button
                        className="text-dark-blue-10 font-bold rounded-full border border-dark-blue-10 text-sm text-center py-1 px-2 hover:text-white hover:border-white hover:bg-dark-blue-10"
                        onClick={() => {
                          setSelectedSinodal2(null);
                        }}
                      >
                        Remover
                      </button>
                    </div>
                    <div className="w-full px-4 flex items-center">
                      <div className="w-[25px] text-dark-blue-10 flex items-center justify-center mx-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                        >
                          <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                        </svg>
                      </div>
                      <div className="w-1/3">
                        <div className="font-semibold text-dark-blue-10 text-[14px] italic">
                          Nombre
                        </div>
                        <div className="text-base">{`${selectedSinodal3.nombre} ${selectedSinodal3.apellido_paterno} ${selectedSinodal3.apellido_materno}`}</div>
                      </div>
                      <div className="w-1/3">
                        <div className="font-semibold text-dark-blue-10 text-[14px] italic">
                          Correo
                        </div>
                        <div className="text-base">
                          {selectedSinodal3.correo}
                        </div>
                      </div>
                      <div className="min-w-[150px]">
                        <div className="font-semibold text-dark-blue-10 text-[14px] italic">
                          Status
                        </div>
                        <div className="text-base">
                          {selectedSinodal3.id_usuario < 1000000
                            ? "Profesor del Área"
                            : "Asesor Externo"}
                        </div>
                      </div>
                      <button
                        className="text-dark-blue-10 font-bold rounded-full border border-dark-blue-10 text-sm text-center py-1 px-2 hover:text-white hover:border-white hover:bg-dark-blue-10"
                        onClick={() => {
                          setSelectedSinodal3(null);
                        }}
                      >
                        Remover
                      </button>
                    </div>
                    <div className="w-full px-4 flex items-center">
                      <div className="w-[25px] text-dark-blue-10 flex items-center justify-center mx-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                        >
                          <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                        </svg>
                      </div>
                      <div className="w-1/3">
                        <div className="font-semibold text-dark-blue-10 text-[14px] italic">
                          Nombre
                        </div>
                        <div className="text-base">{`${selectedSinodal4.nombre} ${selectedSinodal4.apellido_paterno} ${selectedSinodal4.apellido_materno}`}</div>
                      </div>
                      <div className="w-1/3">
                        <div className="font-semibold text-dark-blue-10 text-[14px] italic">
                          Correo
                        </div>
                        <div className="text-base">
                          {selectedSinodal4.correo}
                        </div>
                      </div>
                      <div className="min-w-[150px]">
                        <div className="font-semibold text-dark-blue-10 text-[14px] italic">
                          Status
                        </div>
                        <div className="text-base">
                          {selectedSinodal4.id_usuario < 1000000
                            ? "Profesor del Área"
                            : "Asesor Externo"}
                        </div>
                      </div>
                      <button
                        className="text-dark-blue-10 font-bold rounded-full border border-dark-blue-10 text-sm text-center py-1 px-2 hover:text-white hover:border-white hover:bg-dark-blue-10"
                        onClick={() => {
                          setSelectedSinodal4(null);
                        }}
                      >
                        Remover
                      </button>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </>
            )}
          </>
        )}

        {suplenteBtn && selectedSuplente == null ? (
          <div className="w-full gray__border py-2 my-2 px-2">
            {searchBar}
            <div className="max-h-[250px] overflow-auto mt-2 flex flex-col flex-shrink-0">
              {retrievedAsesor?.map((user: Usuario, i: number) => (
                <div
                  key={i}
                  className={
                    i % 2 === 0
                      ? "w-full px-4 flex items-center bg-gray-100"
                      : "w-full px-4 flex items-center"
                  }
                >
                  <div className="w-[25px] text-dark-blue-10 flex items-center justify-center mx-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                    </svg>
                  </div>
                  <div className="min-w-[300px]">
                    <div className="font-semibold text-dark-blue-10 text-[14px] italic">
                      Nombre
                    </div>
                    <div className="text-base">{`${user.nombre} ${user.apellido_paterno} ${user.apellido_materno}`}</div>
                  </div>
                  <div className="min-w-[300px]">
                    <div className="font-semibold text-dark-blue-10 text-[14px] italic">
                      Correo
                    </div>
                    <div className="text-base">{user.correo}</div>
                  </div>
                  <div className="min-w-[150px]">
                    <div className="font-semibold text-dark-blue-10 text-[14px] italic">
                      Status
                    </div>
                    <div className="text-base">
                      {user.id_usuario < 1000000
                        ? "Profesor del Área"
                        : "Asesor Externo"}
                    </div>
                  </div>
                  <button
                    className="text-dark-blue-10 font-bold rounded-full border border-dark-blue-10 text-sm text-center py-1 px-2 hover:text-white hover:border-white hover:bg-dark-blue-10"
                    onClick={() => {
                      setSelectedSuplente(user);
                    }}
                  >
                    Seleccionar
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <>
            {suplenteBtn && selectedSuplente ? (
              <div className="w-full gray__border py-2 my-2">
                <div className="w-full px-4 flex items-center">
                  <div className="w-[25px] text-dark-blue-10 flex items-center justify-center mx-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                    </svg>
                  </div>
                  <div className="w-1/3">
                    <div className="font-semibold text-dark-blue-10 text-[14px] italic">
                      Nombre
                    </div>
                    <div className="text-base">{`${selectedSuplente.nombre} ${selectedSuplente.apellido_paterno} ${selectedSuplente.apellido_materno}`}</div>
                  </div>
                  <div className="w-1/3">
                    <div className="font-semibold text-dark-blue-10 text-[14px] italic">
                      Correo
                    </div>
                    <div className="text-base">{selectedSuplente.correo}</div>
                  </div>
                  <div className="min-w-[150px]">
                    <div className="font-semibold text-dark-blue-10 text-[14px] italic">
                      Status
                    </div>
                    <div className="text-base">
                      {selectedSuplente.id_usuario < 1000000
                        ? "Profesor del Área"
                        : "Asesor Externo"}
                    </div>
                  </div>
                  <button
                    className="text-dark-blue-10 font-bold rounded-full border border-dark-blue-10 text-sm text-center py-1 px-2 hover:text-white hover:border-white hover:bg-dark-blue-10"
                    onClick={() => {
                      setSelectedSuplente(null);
                    }}
                  >
                    Remover
                  </button>
                </div>
              </div>
            ) : (
              ""
            )}
          </>
        )}
      </div>
      <div className="w-full px-2 flex justify-end">
        {user.datos_alumno && user.datos_alumno.id_grado_estudio == 1 ? (
          <>
          {tesisTitle !== "" && selectedAsesor && selectedSinodal1 && selectedSinodal2 && selectedSuplente ? (
            <button 
              className="primary__btn" 
              type="submit"
              onClick={handleTesisRegistry}
            >
              Registrar Tesis
            </button>
          ) : (
            ""
          )}
          </>
        ) : (
          ""
        )}
        {user.datos_alumno && user.datos_alumno.id_grado_estudio == 2 ? (
          <>
          {tesisTitle !== "" && selectedAsesor && selectedSinodal1 && selectedSinodal2 && selectedSinodal3 && selectedSinodal4 && selectedSuplente ? (
            <button 
              className="primary__btn" 
              type="submit"
              onClick={handleTesisRegistry}
            >
              Registrar Tesis
            </button>
          ) : (
            ""
          )}
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
