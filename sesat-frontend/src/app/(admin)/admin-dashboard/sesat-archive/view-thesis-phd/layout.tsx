export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <div className="w-full flex flex-col">
        <label className="mb-3 block text-4xl font-bold">
          Tesis de Doctorado
        </label>
        <label className=" block text-xl font-bold">Repositorio de tesis</label>
        {children}
      </div>
    </main>
  );
}
