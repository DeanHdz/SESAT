import UserIcon from "./UserIcon";


const LoginNavbar = () => 
{
  return (
    <div className="w-screen fixed navbar bg-base-100 drop-shadow-md z-50">
      <div className="navbar-start">
              
        <a className="h-[50px]">
          <img src="/images/uaslp_sesat_logo-m.png" alt="UASLP-SESAT Logo" className="h-[50px] hover:animate-pulse object-contain" />
        </a>
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

export default LoginNavbar;