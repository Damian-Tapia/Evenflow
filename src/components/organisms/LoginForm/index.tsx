"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/atoms/Button";
import { Divider } from "@/components/atoms/Divider";
import { InputField } from "@/components/atoms/InputField";
import { TextLink } from "@/components/atoms/TextLink";
import { FormField } from "@/components/molecules/FormField";
import { SocialButton } from "@/components/molecules/SocialButton";

const MAIL_ICON =
    "https://www.figma.com/api/mcp/asset/a645cf39-489e-4d70-804d-f093794dc14b";
const LOCK_ICON =
    "https://www.figma.com/api/mcp/asset/632e64f9-758a-4903-a0e0-3ebe735132c9";
const GOOGLE_LOGO =
    "https://www.figma.com/api/mcp/asset/e7af6129-ecae-4d78-a1c2-d334b43970d7";

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

export function LoginForm() {
    const [values, setValues] = useState<FormState>({
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState<FormErrors>({
        emailError: null,
        passwordError: null,
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    function handleChange(field: keyof FormState, value: string) {
        setValues((prev) => ({ ...prev, [field]: value }));
        if (field === "email") {
            setErrors((prev) => ({ ...prev, emailError: null }));
        } else {
            setErrors((prev) => ({ ...prev, passwordError: null }));
        }
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const validationErrors = validate(values);
        setErrors(validationErrors);
        if (validationErrors.emailError || validationErrors.passwordError)
            return;
        setIsSubmitting(true);
        // Auth integration goes here
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-6 w-full h-full"
            noValidate
        >
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

            <FormField label="Email" inputId="email" error={errors.emailError}>
                <InputField
                    id="email"
                    type="email"
                    value={values.email}
                    onChange={(v) => handleChange("email", v)}
                    placeholder="example@mailing.com"
                    icon={MAIL_ICON}
                    hasError={!!errors.emailError}
                    ariaDescribedBy={
                        errors.emailError ? "email-error" : undefined
                    }
                />
            </FormField>

            <FormField
                label="Contraseña"
                inputId="password"
                error={errors.passwordError}
            >
                <InputField
                    id="password"
                    type="password"
                    value={values.password}
                    onChange={(v) => handleChange("password", v)}
                    placeholder="*************"
                    icon={LOCK_ICON}
                    hasError={!!errors.passwordError}
                    ariaDescribedBy={
                        errors.passwordError ? "password-error" : undefined
                    }
                />
            </FormField>

            <Button type="submit" disabled={isSubmitting}>
                Iniciar sesión
            </Button>

            <Divider label="O" />

            <SocialButton
                logo={GOOGLE_LOGO}
                logoAlt="Google"
                label="Google"
                onClick={() => console.log("Google auth not implemented")}
            />

            <p className="text-center text-black text-base">
                <span className="font-normal">No tienes cuenta? </span>
                <TextLink href="#">Registrate</TextLink>
            </p>
        </form>
    );
}
