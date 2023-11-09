import { Asignacion, GradedMailDto, Usuario } from "../types/ISESAT";

export async function gradedAssignmentMail(
  gradedMailDto: GradedMailDto,
  token: string
): Promise<any | undefined> {
  const url = `${process.env.NEXT_PUBLIC_SESAT_API_URL}/mail/graded-assignment`;
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(gradedMailDto),
  };
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error("Error fetching the data");
  }
  const result = await response.json();

  return result;
}
