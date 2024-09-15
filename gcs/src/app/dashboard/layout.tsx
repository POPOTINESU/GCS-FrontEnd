export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      {/* Header */}
      <header className="bg-sky-500/100">
      </header>
      <nav></nav>

      {children}
    </section>
  );
}
