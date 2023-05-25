import Drawer from "../Components/Drawer/Drawer";

export const UserRegistryPage = () => {
  return (
    <div className="overflow-hidden">
      <div className="flex flex-row">
        <div className="w-3/12">
          <Drawer />
        </div>
        <div className="w-9/12">
          {/*<UserRegistryForm />*/}
          <div className="w-11/12 h-screen flex flex-col" >
            <div className="w-full h-1/3 flex flex-row shadow-md">
              <div className="w-2/3 font-SESAT text-[100px] flex items-center align-middle justify-center">
                Registrar Alumno 
              </div>
              <div className="w-1/3 flex items-center align-middle justify-center">
                <a className="w-2/3 h-2/3 flex items-center align-middle justify-center rounded-full bg-dark-blue-10" href="/admin-board/user-register/student">
                  <svg className="mt-4" role="presentation" focusable="false" viewBox="8 8 16 16">
                    <path fill="#FFFFFF" d="M22.9 15.1l-4-4c-.2-.2-.5-.2-.7 0s-.2.5 0 .7l3.1 3.1H9.5c-.3.1-.5.3-.5.6s.2.5.5.5h11.8l-3.1 3.1c-.2.2-.2.5 0 .7.1.1.2.1.4.1s.3 0 .4-.1l4-4c0-.1 0-.5-.1-.7z" />
                  </svg>
                </a>
              </div>
            </div>
            <div className="w-full h-1/3 flex flex-row shadow-md">
              <div className="w-2/3 font-SESAT text-[100px] flex items-center align-middle justify-center">
                Registrar Asesor 
              </div>
              <div className="w-1/3 flex items-center align-middle justify-center">
                <a className="w-2/3 h-2/3 flex items-center align-middle justify-center rounded-full bg-dark-blue-10" href="/admin-board/user-register/asesor">
                  <svg className="mt-4" role="presentation" focusable="false" viewBox="8 8 16 16">
                    <path fill="#FFFFFF" d="M22.9 15.1l-4-4c-.2-.2-.5-.2-.7 0s-.2.5 0 .7l3.1 3.1H9.5c-.3.1-.5.3-.5.6s.2.5.5.5h11.8l-3.1 3.1c-.2.2-.2.5 0 .7.1.1.2.1.4.1s.3 0 .4-.1l4-4c0-.1 0-.5-.1-.7z" />
                  </svg>
                </a>
              </div>
            </div>
            <div className="w-full h-1/3 flex flex-row shadow-md">
              <div className="w-2/3 font-SESAT text-[75px] flex items-center align-middle justify-center">
                Registrar Asesor Externo
              </div>
              <div className="w-1/3 flex items-center align-middle justify-center">
                <a className="w-2/3 h-2/3 flex items-center align-middle justify-center rounded-full bg-dark-blue-10" href="/admin-board/user-register/external-asesor">
                  <svg className="mt-4" role="presentation" focusable="false" viewBox="8 8 16 16">
                    <path fill="#FFFFFF" d="M22.9 15.1l-4-4c-.2-.2-.5-.2-.7 0s-.2.5 0 .7l3.1 3.1H9.5c-.3.1-.5.3-.5.6s.2.5.5.5h11.8l-3.1 3.1c-.2.2-.2.5 0 .7.1.1.2.1.4.1s.3 0 .4-.1l4-4c0-.1 0-.5-.1-.7z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default UserRegistryPage
