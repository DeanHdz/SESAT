import { useState } from "react";
import Search from "../../../components/Search";

export default function StudentRegistry({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const search =
    typeof searchParams.search === "string" ? searchParams.search : undefined;
  
  return(
    <div>
      <Search url={"/admin-dashboard/sesat-users/alumnos/register"}/>
    </div>
  );
};