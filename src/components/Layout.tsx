import Header from "./Header";
import Sidebar from "./Sidebar";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">

      {/* Sidebar */}
      <Sidebar />

      {/* Main */}
      <div className="flex-1 min-h-screen bg-gray-100">

        <Header />

        <main className="p-6">
          {children}
        </main>

      </div>
    </div>
  );
}
