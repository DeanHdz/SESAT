"use server"
import { LoginEndpoint } from "../../../utils/login.endpoint"

export default async function getRoleSS(token: string) {
  const role: string =  await LoginEndpoint.getUserRole(token)
  return role;
}