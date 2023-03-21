import Navbar from "../Components/Navbar/Navbar";
import InsiteBaner from "../Components/Banner/InsiteBanner";
import BreadcrumbContainer from "../Components/Breadcrumbs/BreadcrumbContainer";
import AsesorSearch from "../Components/Search/AsesorSearch";

let paths: string[] = [];
paths.push("Home Asesor");

let links: string[] = [];
links.push("/asesor");


export const AsesorSearchPage = () => {
  return (
    <div className="overflow-hidden">
      <Navbar />
      <InsiteBaner topic={"Home"}/>
      <BreadcrumbContainer paths={paths} links={links}/>
      <AsesorSearch />
    </div>
  );
};

export default AsesorSearchPage
