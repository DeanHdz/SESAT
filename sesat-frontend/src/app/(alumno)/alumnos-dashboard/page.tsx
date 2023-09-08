"use client";
import Board from "@/app/components/Board";
import BreadcrumbContainer from "@/app/components/BreadcrumbContainer";
import InsiteBaner from "@/app/components/InsiteBanner";


export default function Home() {

  let paths: string[] = [];
  //paths.push("Tablero");

  let links: string[] = [];
  //links.push("/board");
  return (
    <main className="">
      <InsiteBaner topic={"Tablero "} />
      <BreadcrumbContainer paths={paths} links={links} />
      {/**<Board /> */}
    </main>
  )
}
