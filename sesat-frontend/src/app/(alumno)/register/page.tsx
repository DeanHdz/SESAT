"use client";
import BreadcrumbContainer from '@/app/components/BreadcrumbContainer'
import InsiteBaner from '@/app/components/InsiteBanner'
import React from 'react'

export default function Home() {

    let paths: string[] = [];
    //paths.push("Tablero");
  
    let links: string[] = [];
    //links.push("/board");
    return (
        <main>
            <InsiteBaner topic={"Registro"} />
            <BreadcrumbContainer paths={paths} links={links} />
            {/** <TesisRegistryForm />*/}
        </main>
    )
}
