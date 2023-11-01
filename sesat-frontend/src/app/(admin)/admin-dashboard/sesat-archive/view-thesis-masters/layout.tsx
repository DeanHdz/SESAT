import Tabs from "./components/Tabs";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <div className="w-full flex flex-col">
        <label className="mb-3 block text-4xl font-bold">
          Tesis de Maestría
        </label>
        <label className=" block text-xl font-bold">Repositorio de tesis</label>
        <Tabs />
        <div className="mt-2">
          {children}
        </div>
      </div>
    </main>
  );
}