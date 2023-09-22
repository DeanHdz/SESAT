import Tabs from "./components/Tabs"


export default function Layout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return (
    <main>
      <div className="w-full flex flex-col">
        <label className="mb-6 block text-4xl font-bold">
          Alumnos de Doctorado
        </label>

        <Tabs />

        {children}
      </div>
    </main>
  )
}