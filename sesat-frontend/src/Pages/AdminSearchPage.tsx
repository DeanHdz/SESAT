import Navbar from "../Components/Navbar/Navbar";
import InsiteBaner from "../Components/Banner/InsiteBanner";
import BreadcrumbContainer from "../Components/Breadcrumbs/BreadcrumbContainer";
import SearchUser from "../Components/Search/SearchUser";
import SearchAsign from "../Components/Search/SearchAsign";

let paths: string[] = [];
paths.push("Home Administrador");

let links: string[] = [];
links.push("/admin");


export const AdminSearchPage = () => {
  return (
    <div className="grid overflow-hidden">
      <Navbar />
      <InsiteBaner topic={"Home"}/>
      <BreadcrumbContainer paths={paths} links={links}/>
      <button className="place-self-center m-2 btn btn-xs sm:btn-sm md:btn-md lg:btn-lg" onClick={() => window.location.href = '/user-register'}>Dar de alta un usuario nuevo</button>
      <p className="place-self-center my-4 font-bold text-4xl">Buscar</p>
      <div className="flex flex-col w-full">
        <div className="grid card bg-base-300 rounded-box place-items-center">
          <SearchUser />
        </div> 
        <div className="divider"></div> 
        <div className="grid card bg-base-300 rounded-box place-items-center">
          <SearchAsign />
        </div>
      </div>
    </div>
  );
};

export default AdminSearchPage
