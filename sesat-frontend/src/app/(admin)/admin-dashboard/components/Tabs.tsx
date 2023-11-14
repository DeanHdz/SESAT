"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Tabs() {

  const [cssTab0, setCssTab0] = useState("");
  const [cssTab1, setCssTab1] = useState("");
  const [tab, setTab] = useState<number>(0);

  const setActiveTab = (tab: number) => {

    switch (tab) {
      case 1:
      default:
        setTab(1);
        setCssTab0("tab-active");
        setCssTab1("");
        break;
      case 2:
        setTab(2);
        setCssTab0("");
        setCssTab1("tab-active");
        break;
    }
  };

  useEffect(() => {
    setActiveTab(tab);
  }, [])

  return (
    <div className="tabs mt-4">
      <Link href="/admin-dashboard/sesat-archive/view-thesis-masters" className={`tab tab-lifted ${cssTab0}`} onClick={() => { setActiveTab(1) }}>Medio Tiempo</Link>
      <Link href="/admin-dashboard/sesat-archive/view-thesis-masters/full-time" className={`tab tab-lifted ${cssTab1}`} onClick={() => { setActiveTab(2) }}>Tiempo Completo</Link>
    </div>
  )
}