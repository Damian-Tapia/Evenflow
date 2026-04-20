import { Button } from "@/components/atoms/Button";

interface SocialButtonProps {
  logo: React.ElementType;
  logoAlt: string;
  label: string;
  onClick?: () => void;
}

export function SocialButton({
  logo: Logo,
  logoAlt,
  label,
  onClick,
}: SocialButtonProps) {
  return (
    <Button
      type="button"
      onClick={onClick}
      className="flex items-center justify-center gap-2.5 "
    >
      <Logo aria-label={logoAlt} className="h-8 w-8" />
      {label}
    </Button>
  );
}
