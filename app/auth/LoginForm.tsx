"use client";

const MAIL_ICON = "https://www.figma.com/api/mcp/asset/a645cf39-489e-4d70-804d-f093794dc14b";
const LOCK_ICON = "https://www.figma.com/api/mcp/asset/632e64f9-758a-4903-a0e0-3ebe735132c9";
const GOOGLE_LOGO = "https://www.figma.com/api/mcp/asset/e7af6129-ecae-4d78-a1c2-d334b43970d7";

export default function LoginForm() {
  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Heading */}
      <div className="flex flex-col gap-2 text-center">
        <h2
          className="text-black font-semibold text-[40px] leading-[1.2]"
          style={{ letterSpacing: "-0.8px" }}
        >
          Welcome!
        </h2>
        <p
          className="text-[#7d7d7d] font-normal text-2xl leading-relaxed"
          style={{ letterSpacing: "-0.48px" }}
        >
          Inicia sesion para acceder a tus boletos o eventos guardados
        </p>
      </div>

      {/* Email field */}
      <div className="flex flex-col gap-2">
        <label
          htmlFor="email"
          className="text-black font-normal text-xl"
          style={{ letterSpacing: "-0.4px" }}
        >
          Email
        </label>
        <div className="bg-white flex items-center gap-2.5 px-2.5 py-2.5 rounded-lg">
          <img src={MAIL_ICON} alt="" className="w-6 h-6 shrink-0" />
          <input
            id="email"
            type="email"
            placeholder="example@mailing.com"
            className="
              flex-1 bg-transparent outline-none
              text-[#7d7d7d] font-normal text-xl
              placeholder:text-[#7d7d7d]
            "
            style={{ letterSpacing: "-0.4px" }}
          />
        </div>
      </div>

      {/* Password field */}
      <div className="flex flex-col gap-2">
        <label
          htmlFor="password"
          className="text-black font-normal text-xl"
          style={{ letterSpacing: "-0.4px" }}
        >
          Contraseña
        </label>
        <div className="bg-white flex items-center gap-2.5 px-2.5 py-2.5 rounded-lg">
          <img src={LOCK_ICON} alt="" className="w-6 h-6 shrink-0" />
          <input
            id="password"
            type="password"
            placeholder="*************"
            className="
              flex-1 bg-transparent outline-none
              text-[#7d7d7d] font-normal text-xl
              placeholder:text-[#7d7d7d]
            "
            style={{ letterSpacing: "-0.4px" }}
          />
        </div>
      </div>

      {/* Submit button */}
      <button
        type="button"
        className="
          w-full bg-[#0a0e27] text-white font-semibold text-2xl
          py-2 rounded-lg
          hover:opacity-90 transition-opacity
        "
        style={{ letterSpacing: "-0.48px" }}
      >
        Iniciar sesión
      </button>

      {/* Divider */}
      <div className="flex items-center gap-4">
        <hr className="flex-1 border-[#7d7d7d]" />
        <span
          className="text-[#7d7d7d] font-semibold text-2xl"
          style={{ letterSpacing: "-0.48px" }}
        >
          O
        </span>
        <hr className="flex-1 border-[#7d7d7d]" />
      </div>

      {/* Google button */}
      <button
        type="button"
        className="
          w-full bg-[#0a0e27] text-white font-semibold text-2xl
          py-2 rounded-lg flex items-center justify-center gap-2.5
          hover:opacity-90 transition-opacity
        "
        style={{ letterSpacing: "-0.48px" }}
        onClick={() => console.log("Google auth not implemented")}
      >
        <img src={GOOGLE_LOGO} alt="Google" className="h-8 w-8" />
        Google
      </button>

      {/* Register link */}
      <p className="text-center text-black text-base">
        <span className="font-normal">No tienes cuenta? </span>
        <a
          href="#"
          className="font-semibold text-[#5c8fff] underline"
          style={{ letterSpacing: "-0.32px" }}
        >
          Registrate
        </a>
      </p>
    </div>
  );
}
