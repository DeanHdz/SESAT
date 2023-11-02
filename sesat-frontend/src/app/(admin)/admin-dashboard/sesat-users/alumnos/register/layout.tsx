export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main>
      <div className="w-full flex flex-col">
        <label className="mb-2 block text-4xl font-bold">
          Registro de Alumnos
        </label>

        {children}
      </div>
    </main>
  )
}