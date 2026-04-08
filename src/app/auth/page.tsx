import { AuthLayout } from "@/components/templates/AuthLayout";
import { BrandingPanel } from "@/components/organisms/BrandingPanel";
import { LoginForm } from "@/components/organisms/LoginForm";

export default function AuthPage() {
  return (
    <AuthLayout brandingPanel={<BrandingPanel />}>
      <LoginForm />
    </AuthLayout>
  );
}
