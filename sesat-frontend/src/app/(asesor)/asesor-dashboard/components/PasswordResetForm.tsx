"use client"

import { useState, ChangeEvent } from "react";
import Cookies from "js-cookie";
import { LoggedUser, PasswordChangeDTO } from "../../../../../types/ISESAT";
import { UsuarioEndpoint } from "../../../../../utils/usuario.endpoint";
import { useRouter } from "next/navigation";

export default function PasswordResetForm({user}:{user: LoggedUser}) {
  const cookie = Cookies.get("SESATsession");
  const token: string = cookie ? cookie.substring(1, cookie?.length - 1) : "";
  const router = useRouter();

  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [password2, setPassword2] = useState<string>('');

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handlePassword2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword2(e.target.value);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const [showSuccessModal, setShowSuccessModal] = useState<boolean | undefined>(false);

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
                    <p className="text-sm text-gray-500">La contraseña ha sido modificada con éxito.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6"> 
              <button 
                type="button" 
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                onClick={() => {
                  setShowSuccessModal(!showSuccessModal)
                  router.push("/asesor-dashboard")
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

  const handlePasswordChanceSubmit = async () => {
    const passwordChangeDTO: PasswordChangeDTO = {
      id_usuario: user.id_usuario,
      password: password
    }
    const res = await UsuarioEndpoint.changePassword(token, passwordChangeDTO);
    if(res)
    {
      setShowSuccessModal(!showSuccessModal);
    }
    else
      router.refresh()
  }

  return (
    <div className="w-full">
      {showSuccessModal ? 
        (
          <>
            {successModal}
          </>
        ) : (
          ""
        )
      }
      <div className="my-1">Contraseña:</div>
      <div className="flex gap-2 mb-2">
        <input
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={handlePasswordChange}
          className="w-8/12 border-t-0 border-l-0 border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-dark-blue-10 transition duration-300 ease-in-out appearance-none"
          placeholder="Contraseña..."
        />
        <button
          type="button"
          className="btn btn-primary text-white cursor-pointer min-w-[110px]"
          onClick={handleTogglePasswordVisibility}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white">
            <path d="M15 12c0 1.654-1.346 3-3 3s-3-1.346-3-3 1.346-3 3-3 3 1.346 3 3zm9-.449s-4.252 8.449-11.985 8.449c-7.18 0-12.015-8.449-12.015-8.449s4.446-7.551 12.015-7.551c7.694 0 11.985 7.551 11.985 7.551zm-7 .449c0-2.757-2.243-5-5-5s-5 2.243-5 5 2.243 5 5 5 5-2.243 5-5z"/>
          </svg>
          {showPassword ? 'Hide' : 'Show'}
        </button>
      </div>
      <div className="my-1">Confirmar Contraseña:</div>
      <div className="flex gap-2 mb-2">
        <input
          type={showPassword ? 'text' : 'password'}
          value={password2}
          onChange={handlePassword2Change}
          className="w-8/12 border-t-0 border-l-0 border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-dark-blue-10 transition duration-300 ease-in-out appearance-none"
          placeholder="Contraseña..."
        />
      </div>
      {password != '' && password2 != '' && password === password2 ? (
        <div className="w-full flex justify-end px-6">
          <button 
            className="primary__btn" 
            type="submit"
            onClick={handlePasswordChanceSubmit}
          >
            Cambiar Contraseña
          </button>
        </div>
      ) : (
        <>
          {password != '' && password2 != '' && password !== password2 ? (
            <div className="w-full text-red-600 text-[12px] flex justify-end px-6">Las contraseñas no coinciden</div>
          ) : (
            ""
          )}
        </>
      )}
    </div>
  )
}
