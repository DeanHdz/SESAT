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
    <div className="overflow-hidden">
      <Navbar />
      <InsiteBaner topic={"Home"}/>
      <BreadcrumbContainer paths={paths} links={links}/>
      <SearchUser />
      <SearchAsign />
    </div>
  );
};

export default AdminSearchPage
