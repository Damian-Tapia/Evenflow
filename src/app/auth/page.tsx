import LoginForm from "./LoginForm";

export default function AuthPage() {
  return (
    <div className="flex flex-col lg:flex-row h-screen">
      {/* Branding panel */}
      <section className="flex flex-col justify-center items-start px-8 py-10 lg:w-1/2 min-h-40 hidden md:flex bg-[linear-gradient(135deg,#0a0e27_0%,#24338d_100%)]">
        <div className="flex flex-col gap-4">
          <h1 className="text-white font-extrabold tracking-tight text-4xl lg:text-[64px] lg:leading-none "style={{ letterSpacing: "-1.28px" }}>
            EVENFLOW
          </h1>
          <p
            className="hidden lg:block text-[#d3d3d3] font-normal text-2xl leading-relaxed "style={{ letterSpacing: "-0.48px" }}>
            Descrubre eventos, compra tus boletos, crea experiencias
          </p>
        </div>
      </section>

      {/* Form panel */}
      <section className="flex flex-col justify-center items-center px-8 py-10 lg:p-16 lg:w-1/2 bg-[#efefef] h-screen">
        <div className="w-full max-w-148">
          <LoginForm />
        </div>
      </section>
    </div>
  );
}
