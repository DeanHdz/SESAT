import AssignmentInfoBlock from "./AssignmentInfoBlock";
import AssingmentStatusBlock from "./AssignmentStatusBlock";
import BreadcrumbContainer from "./BreadcrumbContainer";
import InsiteBaner from "./InsiteBanner";
import LoadingAnimation from "./LoadingAnimation";



let paths: string[] = [];
paths.push("Avance # de Tesis");

let links: string[] = [];
links.push("/board");
links.push("assignment");

const AssignmentPage = () => {
  
  //const location = useLocation();
  const asignacion = ""//location.state.asignacion;

  if (asignacion == null)
  {
    return <LoadingAnimation texto="Cargando..."/> 
  }
  else
    return (
      <div className="overflow-x-hidden">        
        <InsiteBaner topic={"Asignación"} />
        <BreadcrumbContainer paths={paths} links={links} />
        <div className="w-screen lg:h-[1400px] flex flex-col lg:flex-row space-x-4 mt-4">
          <div className=" w-full lg:w-4/6 flex flex-col px-4 space-y-4">
            {/**
             * <AssignmentInfoBlock asignacion={asignacion} />
            <AssingmentStatusBlock asignacion={asignacion} />
             */}
            
          </div>
          <div className="w-full lg:w-2/6 overflow-auto hover:overflow-scroll">
            <div className="relative flex flex-col items-center justify-center antialiased bg-white w-full">
              <article className="prose">
                <h1 className="font-SESAT my-4">Comentarios</h1>
              </article>
              <div className="container px-0 mx-auto sm:px-5">
                {
                  /**
                   * <CommentSection id_asignacion={asignacion?.id_asignacion} />
                   */
                }                
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default AssignmentPage;