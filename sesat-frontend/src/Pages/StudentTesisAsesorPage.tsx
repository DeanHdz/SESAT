import StudentsCardList from "../Components/AdminBoardComponents/AdminTesisCardList";
import Navbar from "../Components/Navbar/Navbar";
import InsiteBaner from "../Components/Banner/InsiteBanner";
import BreadcrumbContainer from "../Components/Breadcrumbs/BreadcrumbContainer";

let paths: string[] = [];
paths.push("Tablero Asesor");

let links: string[] = [];
links.push("/BoardAsesor");

const StudentTesisAsesorPage = () => {
    return (
        <div className="flex flex-row">
            <div className="w-9/12">
                <Navbar />
                <InsiteBaner topic={"Tablero "} />
                <BreadcrumbContainer paths={paths} links={links} />
                <div className="w-full p-6 flex justify-center">
                    <StudentsCardList title="Tesis de Doctorado" />
                </div>
            </div>

        </div>
    );
};

export default StudentTesisAsesorPage;