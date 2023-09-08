"use client";
import BreadcrumbContainer from '@/app/components/BreadcrumbContainer';
import InsiteBaner from '@/app/components/InsiteBanner';
import PDFUploadForm from '@/app/components/PDFUploadForm';
import React from 'react'

export default function Help() {

  let paths: string[] = [];
  paths.push("Enviar PDF a BD");

  let links: string[] = [];
  links.push("/send-pdf");
  return (
    <main>
      <InsiteBaner topic={"Cargar PDF a base de datos"} />
      <BreadcrumbContainer paths={paths} links={links} />
      <PDFUploadForm />
    </main>
  )
}
