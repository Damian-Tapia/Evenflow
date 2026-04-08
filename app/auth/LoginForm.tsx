"use client";

import { useState } from "react";

const MAIL_ICON = "https://www.figma.com/api/mcp/asset/a645cf39-489e-4d70-804d-f093794dc14b";
const LOCK_ICON = "https://www.figma.com/api/mcp/asset/632e64f9-758a-4903-a0e0-3ebe735132c9";
const GOOGLE_LOGO = "https://www.figma.com/api/mcp/asset/e7af6129-ecae-4d78-a1c2-d334b43970d7";

interface FormState {
  email: string;
  password: string;
}

interface FormErrors {
  emailError: string | null;
  passwordError: string | null;
}

function validate(values: FormState): FormErrors {
  const errors: FormErrors = { emailError: null, passwordError: null };

  if (!values.email.trim()) {
    errors.emailError = "El email es requerido";
  } else if (!/.+@.+\..+/.test(values.email)) {
    errors.emailError = "Ingresa un email válido";
  }

  if (!values.password) {
    errors.passwordError = "La contraseña es requerida";
  } else if (values.password.length < 6) {
    errors.passwordError = "Mínimo 6 caracteres";
  }

  return errors;
}

export default function LoginForm() {
  const [values, setValues] = useState<FormState>({ email: "", password: "" });
  const [errors, setErrors] = useState<FormErrors>({ emailError: null, passwordError: null });
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(field: keyof FormState, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (field === "email") {
      setErrors((prev) => ({ ...prev, emailError: null }));
    } else {
      setErrors((prev) => ({ ...prev, passwordError: null }));
    }
  }

  function handleSubmit() {
    const validationErrors = validate(values);
    setErrors(validationErrors);

    if (validationErrors.emailError || validationErrors.passwordError) {
      return;
    }

    setIsSubmitting(true);
    // Auth integration goes here
  }

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
        <div
          className={`bg-white flex items-center gap-2.5 px-2.5 py-2.5 rounded-lg ${
            errors.emailError ? "ring-2 ring-red-500" : ""
          }`}
        >
          <img src={MAIL_ICON} alt="" className="w-6 h-6 shrink-0" />
          <input
            id="email"
            type="email"
            value={values.email}
            onChange={(e) => handleChange("email", e.target.value)}
            placeholder="example@mailing.com"
            className="
              flex-1 bg-transparent outline-none
              text-[#7d7d7d] font-normal text-xl
              placeholder:text-[#7d7d7d]
            "
            style={{ letterSpacing: "-0.4px" }}
          />
        </div>
        {errors.emailError && (
          <p className="text-red-500 text-sm">{errors.emailError}</p>
        )}
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
        <div
          className={`bg-white flex items-center gap-2.5 px-2.5 py-2.5 rounded-lg ${
            errors.passwordError ? "ring-2 ring-red-500" : ""
          }`}
        >
          <img src={LOCK_ICON} alt="" className="w-6 h-6 shrink-0" />
          <input
            id="password"
            type="password"
            value={values.password}
            onChange={(e) => handleChange("password", e.target.value)}
            placeholder="*************"
            className="
              flex-1 bg-transparent outline-none
              text-[#7d7d7d] font-normal text-xl
              placeholder:text-[#7d7d7d]
            "
            style={{ letterSpacing: "-0.4px" }}
          />
        </div>
        {errors.passwordError && (
          <p className="text-red-500 text-sm">{errors.passwordError}</p>
        )}
      </div>

      {/* Submit button */}
      <button
        type="button"
        onClick={handleSubmit}
        disabled={isSubmitting}
        className="
          w-full bg-[#0a0e27] text-white font-semibold text-2xl
          py-2 rounded-lg
          hover:opacity-90 transition-opacity
          disabled:opacity-50 disabled:cursor-not-allowed
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
