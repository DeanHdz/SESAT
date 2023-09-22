"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Tabs() {

  const [cssTab0, setCssTab0] = useState("");
  const [cssTab1, setCssTab1] = useState("");
  const [cssTab2, setCssTab2] = useState("");
  const [tab, setTab] = useState<number>(0);

  const setActiveTab = (tab: number) => {

    switch (tab) {
      case 1:
      default:
        setTab(1);
        setCssTab0("tab-active");
        setCssTab1("");
        setCssTab2("");
        break;
      case 2:
        setTab(2);
        setCssTab0("");
        setCssTab1("tab-active");
        setCssTab2("");
        break;

      case 3:
        setTab(3);
        setCssTab0("");
        setCssTab1("");
        setCssTab2("tab-active");
        break;
    }
  };

  useEffect(() => {
    setActiveTab(tab);
  }, [])

  return (
    <div className="tabs">
      <Link href="/admin-dashboard/sesat-users/alumnos/phd" className={`tab tab-lifted ${cssTab0}`} onClick={() => { setActiveTab(1) }}>Alumnos de Doctorado registrados en SESAT </Link>
      <Link href="/admin-dashboard/sesat-users/alumnos/phd/register" className={`tab tab-lifted ${cssTab1}`} onClick={() => { setActiveTab(2) }}>Registrar alumno </Link>
      <Link href="/admin-dashboard/sesat-users/alumnos/phd/remove" className={`tab tab-lifted ${cssTab2}`} onClick={() => { setActiveTab(3) }}>Baja de alumno </Link>
    </div>
  )
}
