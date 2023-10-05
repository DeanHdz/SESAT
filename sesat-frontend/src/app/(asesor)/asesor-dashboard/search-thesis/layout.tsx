export default function Layout({
  children, 
}: {
  children: React.ReactNode
}) {
  return (
    <main>
      <div className="w-full flex flex-col">
        <label className="mb-6 block text-4xl font-bold">
          Buscar tesis
        </label>

        {children}
      </div>
    </main>
  )
}