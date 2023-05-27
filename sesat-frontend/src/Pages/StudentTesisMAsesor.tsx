import StudentsList from "../Components/AdminBoardComponents/AdminTesisCardList";
import Navbar from "../Components/Navbar/Navbar";
import InsiteBaner from "../Components/Banner/InsiteBanner";
import BreadcrumbContainer from "../Components/Breadcrumbs/BreadcrumbContainer";

let paths: string[] = [];
paths.push("Tablero Asesor");

let links: string[] = [];
links.push("/BoardAsesor");

const StudentTesisMPage = () => {
    return (
        <div className="flex flex-row">
            <div className="w-9/12">
                <Navbar />
                <InsiteBaner topic={"Tablero "} />
                <BreadcrumbContainer paths={paths} links={links} />
                <div className="w-full p-6 flex justify-center">
                    <StudentsList title="Tesis de Maestría" />
                </div>
            </div>

        </div>
    );
};

export default StudentTesisMPage;