import Navbar from "../Components/Navbar/Navbar";
import InsiteBaner from "../Components/Banner/InsiteBanner";
import BreadcrumbContainer from "../Components/Breadcrumbs/BreadcrumbContainer";
import Board from "../Components/Board/Board";

let paths: string[] = [];
paths.push("Tablero");

let links: string[] = [];
links.push("/board");

const BoardPage = () =>
{
  return(            
    <div className="overflow-hidden">
      <Navbar />
      <InsiteBaner topic={"Tablero "} />
      <BreadcrumbContainer paths={paths} links={links} />
      <Board />
    </div>    
  )
}


export default BoardPage;