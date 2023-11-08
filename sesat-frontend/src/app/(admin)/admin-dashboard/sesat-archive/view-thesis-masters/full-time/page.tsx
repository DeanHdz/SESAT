import EmptyPage from "@/app/components/EmptyPage";
import TesisRow from "@/app/components/TesisRow";
import { InactiveTesisProps } from "../../../../../../../types/ISESAT";
import { fetchTesisCompletadasMdFullTimePaginated } from "../../../../../../../utils/tesis.endpoint";
import { getTesisCompletadasMdFullTimeByName } from "../../../../../../../utils/tesis.endpoint";
import { fetchTesisCompletadasMaestriaTiempoComp } from "../../../../../../../utils/tesis.endpoint";
import Search from "../../../components/Search";
import clsx from "clsx";
import Link from "next/link";
import { cookies } from "next/headers";

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const cookie = cookies().get("SESATsession")?.value;
  const token: string = cookie ? cookie.substring(1, cookie?.length - 1) : "";
  const page =
    typeof searchParams.page === "string" ? Number(searchParams.page) : 1;
  const limit =
    typeof searchParams.limit === "string" ? Number(searchParams.limit) : 10; //10
  const search =
    typeof searchParams.search === "string" ? searchParams.search : undefined;

    if (search) {
      const tesisListData: Promise<InactiveTesisProps[]> = getTesisCompletadasMdFullTimeByName(token, search);
      const tesisList = await tesisListData;
      const isDataEmpty = !Array.isArray(tesisList) || tesisList.length < 1 || !tesisList; //?
      return (
        <>
          <Search url={"/admin-dashboard/sesat-archive/view-thesis-masters/full-time"} />
          <div className="mb-6 border-b pb-4 border-light-gray-22 border-solid w-full flex justify-end">
            {!isDataEmpty ? (
              <div className="flex flex-col w-full">
                {tesisList?.map((tesis) => (
                  <TesisRow
                    titulo={tesis.titulo}
                    autor={`${tesis.nombre} ${tesis.apellido_paterno} ${tesis.apellido_materno} `}
                    fechaEntrega={tesis.fecha_registro}
                    weblink={`/admin-dashboard/sesat-archive/view-thesis-masters/full-time/${tesis.id_tesis}`}
                  />
                ))}
              </div>
            ) : (
              <EmptyPage />
            )}
          </div>
        </>
      );
    } else {
      const tesisListData: Promise<InactiveTesisProps[]> = fetchTesisCompletadasMdFullTimePaginated(token, page, limit);
      const tesisList = await tesisListData;
      const isDataEmpty = !Array.isArray(tesisList) || tesisList.length < 1 || !tesisList; //?
  
      const totalTesisListData: Promise<InactiveTesisProps[]> = fetchTesisCompletadasMaestriaTiempoComp(token);
      const totalTesisList = await totalTesisListData;
      
      const totalCount: number = totalTesisList?.length ?? 0;
      const totalPages: number = Math.ceil(totalCount / limit);
  
      return (
        <>
          <Search url={"/admin-dashboard/sesat-archive/view-thesis-masters/full-time"} />
          <div className="mb-6 border-b pb-4 border-light-gray-22 border-solid w-full flex justify-end">
            {!isDataEmpty ? (
              <div className="flex flex-col w-full">
                {tesisList?.map((tesis) => (
                  <TesisRow
                    titulo={tesis.titulo}
                    autor={`${tesis.nombre} ${tesis.apellido_paterno} ${tesis.apellido_materno} `}
                    fechaEntrega={tesis.fecha_registro}
                    weblink={`/admin-dashboard/sesat-archive/view-thesis-masters/full-time/${tesis.id_tesis}`}
                  />
                ))}
              </div>
            ) : (
              <EmptyPage />
            )}
          </div>
          <div className="mt-2 w-full flex justify-end">
            {!search && !isDataEmpty? (
              <>
                <Link
                  href={{
                    pathname: "/admin-dashboard/sesat-archive/view-thesis-masters/full-time",
                    query: {
                      page: page > 1 ? page - 1 : 1,
                      limit: limit,
                    },
                  }}
                  className={clsx(
                    "bg-dark-blue-10 text-white hover:bg-dark-blue-10 font-normal text-sm px-5 py-1 rounded-lg shadow hover:shadow-lg mr-1 mb-1 outline-none focus:outline-none ease-linear transition-all duration-150",
                    page <= 1 && "pointer-events-none opacity-50"
                  )}
                >
                  Previous
                </Link>
                <p className="px-2">
                  pag. <span> {page} </span> / <span> {totalPages} </span>
                </p>
  
                <Link
                  href={{
                    pathname: "/admin-dashboard/sesat-archive/view-thesis-masters/full-time",
                    query: {
                      page: page + 1,
                      limit: limit,
                    },
                  }}
                  className={clsx(
                    "bg-dark-blue-10 text-white hover:bg-dark-blue-10 font-normal text-sm px-5 py-1 rounded-lg shadow hover:shadow-lg mr-1 mb-1 outline-none focus:outline-none ease-linear transition-all duration-150",
                    page >= totalPages && "pointer-events-none opacity-50"
                  )}
                >
                  Next
                </Link>
              </>
            ) : (
              ""
            )}
          </div>
        </>
      );
    }
};