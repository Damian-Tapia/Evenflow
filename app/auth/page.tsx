import LoginForm from "./LoginForm";

export default function AuthPage() {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Branding panel */}
      <section
        className="
          flex flex-col justify-center items-start
          px-8 py-10
          lg:w-1/2 lg:min-h-screen
          min-h-[160px]
        "
        style={{
          background: "linear-gradient(135deg, #0a0e27 0%, #24338d 100%)",
        }}
      >
        <div className="flex flex-col gap-4">
          <h1
            className="
              text-white font-extrabold tracking-tight
              text-4xl lg:text-[64px] lg:leading-[1]
            "
            style={{ letterSpacing: "-1.28px" }}
          >
            EVENFLOW
          </h1>
          <p
            className="
              hidden lg:block
              text-[#d3d3d3] font-normal
              text-2xl leading-relaxed
            "
            style={{ letterSpacing: "-0.48px" }}
          >
            Descrubre eventos, compra tus boletos, crea experiencias
          </p>
        </div>
      </section>

      {/* Form panel */}
      <section
        className="
          flex flex-col justify-center items-center
          px-8 py-10 lg:p-16
          lg:w-1/2
          bg-[#efefef]
        "
      >
        <div className="w-full max-w-[592px]">
          <LoginForm />
        </div>
      </section>
    </div>
  );
}
