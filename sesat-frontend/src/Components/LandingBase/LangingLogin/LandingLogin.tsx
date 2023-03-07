const LandingLogin = () =>
{
  return(
    <div className="w-inherit h-inherit flex flex-col items-center">
      <div className="form-control mt-28 w-3/6">
        <label className="input-group input-group-vertical">
        <label className="label bg-transparent mb-6">
          <span className="label-text bg-transparent text-xl">Clave Única</span>
        </label>
          <input type="text" placeholder="Clave Única" className="input input-bordered" />
        </label>
      </div>
      <div className="form-control mt-6 w-3/6">
        <label className="input-group input-group-vertical">
            <label className="label bg-transparent mb-6">
              <span className="label-text bg-transparent text-xl">Contraseña</span>
            </label>
          <input type="text" placeholder="Contraseña Institucional" className="input input-bordered" />
        </label>
      </div>
      <button className="mt-16 btn bg-[#8c969f] border-transparent w-2/6"> Iniciar Sesión (Ingresar) </button>
    </div>
  )
}

export default LandingLogin