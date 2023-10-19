export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <div className="w-full flex flex-col">
        <label className="mb-6 block text-4xl font-bold">
          Alumnos de Maestría
        </label>

        {children}
      </div>
  )
}