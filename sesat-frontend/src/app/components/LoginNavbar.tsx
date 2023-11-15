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
        </div>
      </div>
    </div>
  );
}

export default LoginNavbar;