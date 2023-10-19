export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main>
      <div className="w-full flex flex-col">
        {children}
      </div>
    </main>
  )
}