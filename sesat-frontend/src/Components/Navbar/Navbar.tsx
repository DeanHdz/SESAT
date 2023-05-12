import UserIcon from "../UserIcon/UserIcon";

const Navbar = () => 
{
  return (
    <div className="w-screen fixed navbar bg-base-100 drop-shadow-md z-50">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
          </label>
          <ul tabIndex={0} className="p-2 mt-3 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
            <li><a>Cursos</a></li>
            <li><a>Tablero</a></li>
            <li tabIndex={0}>
              <a>
                Acerca de SESAT
                <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"/></svg>
              </a>
              <ul className="p-2 bg-white shadow-md">
                <li><a>¿Qué es SESAT?</a></li>
                <li><a>Apoyo Técnico</a></li>
              </ul>
            </li>
          </ul>
        </div>
        <a className="h-[80px]">
          <img src="/img/uaslp_sesat_logo-m.png" alt="UASLP-SESAT Logo" className="h-[80px] hover:animate-pulse object-contain" />
        </a>
      </div>
      <div className="hidden navbar-center lg:flex">
        <ul className="px-1 menu menu-horizontal">
          <li><a>Cursos</a></li>
          <li><a>Tablero</a></li>
          <li tabIndex={0}>
            <a>
              Acerca de SESAT
              <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"/></svg>
            </a>
            <ul className="p-2 bg-white shadow-md">
              <li><a>¿Qué es SESAT?</a></li>
              <li><a>Apoyo Técnico</a></li>
            </ul>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <div className="dropdown dropdown-end mr-8">
          <UserIcon userName="?"/>
          <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
            <li><a>Iniciar Sesión</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
