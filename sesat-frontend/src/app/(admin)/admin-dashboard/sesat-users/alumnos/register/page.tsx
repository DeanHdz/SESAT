import { useState } from "react";
import Search from "../../../components/Search";
import { ExternalUser } from "../../../../../../../types/ISESAT";
import { UsuarioEndpoint } from "../../../../../../../utils/usuario.endpoint";
import EmptyPage from "@/app/components/EmptyPage";
import AddUserForm from "../../../components/AddUserForm";
import { cookies } from "next/headers";

export default async function SearchMastersStudents({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const cookie = cookies().get("SESATsession")?.value;
  const token: string = cookie ? cookie.substring(1, cookie?.length - 1) : "";
  const search =
    typeof searchParams.search === "string" ? searchParams.search : undefined;

  if (search) {
    const userData: Promise<ExternalUser> = UsuarioEndpoint.findExternalStudent(
      token,
      parseInt(search)
    );
    const user = await userData;
    if (user != null) {
      return (
        <>
          <Search url={"/admin-dashboard/sesat-users/alumnos/register"} />
          <AddUserForm user={user} id={parseInt(search)} />
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
