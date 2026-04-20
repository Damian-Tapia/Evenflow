import Navbar from "@/components/molecules/Navbar/page";

export default function DashboardPage() {
  return (
    <main className="flex flex-col min-h-screen items-center">
      <Navbar isLoggedIn={false} />
      <header className="bg-(--ink-black) w-full ">
        <div className="p-16">
          <h4 className="text-5xl font-black text-white w-125">
            Experiencias que{" "}
            <span className="text-5xl font-black text-(--accent-lime) underline">
              Importan
            </span>
          </h4>
        </div>
      </header>
    </main>
  );
}
