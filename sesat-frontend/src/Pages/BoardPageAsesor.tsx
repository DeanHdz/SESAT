import Navbar from "../Components/Navbar/Navbar";
import InsiteBaner from "../Components/Banner/InsiteBanner";
import BreadcrumbContainer from "../Components/Breadcrumbs/BreadcrumbContainer";
import AsesorBoard from "../Components/Board/AsesorBoard";
import Footer from "../Components/Footer/Footer";
import BoardAsesor from "../Components/Board/BoardAsesor";

let paths: string[] = [];
paths.push("Tablero Asesor");

let links: string[] = [];
links.push("/BoardAsesor");

const BoardPage = () => {
  return (
    <div className="overflow-hidden">
      <Navbar />
      <InsiteBaner topic={"Tablero "} />
      <BreadcrumbContainer paths={paths} links={links} />
      <BoardAsesor />
    </div>
  )
}


export default BoardPage;