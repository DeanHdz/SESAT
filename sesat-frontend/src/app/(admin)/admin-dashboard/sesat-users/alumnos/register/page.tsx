import { useState } from "react";
import Search from "../../../components/Search";
import { ExternalUser } from "../../../../../../../types/ISESAT";
import { UsuarioEndpoint } from "../../../../../../../utils/usuario.endpoint";
import EmptyPage from "@/app/components/EmptyPage";
import AddUserForm from "./components/AddUserForm";

export default async function SearchMastersStudents({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const search =
    typeof searchParams.search === "string" ? searchParams.search : undefined;

  if (search) {
    const userData: Promise<ExternalUser> = UsuarioEndpoint.findExternalUser(
      "[token]",
      parseInt(search)
    );
    const user = await userData;
    if (user != null) {
      return (
        <>
          <Search url={"/admin-dashboard/sesat-users/alumnos/register"} />
          <AddUserForm user={user} />
        </>
      );
    } else {
      return (
        <>
          <Search url={"/admin-dashboard/sesat-users/alumnos/register"} />
          <EmptyPage />
        </>
      );
    }
  } else {
    return (
      <>
        <Search url={"/admin-dashboard/sesat-users/alumnos/register"} />
        <EmptyPage />
      </>
    );
  }
}
