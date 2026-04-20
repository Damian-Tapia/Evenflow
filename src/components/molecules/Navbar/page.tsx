import { Button } from "@/components/atoms/Button";
import { AccountCircleIcon } from "@/icons/AccountCircleIcon";
import { FavoriteIcon } from "@/icons/FavoriteIcon";
import { TicketIcon } from "@/icons/TicketIcon";

type NavPage = "eventos" | "categorias" | "about";

const NAV_LINKS: { id: NavPage; label: string }[] = [
  { id: "eventos", label: "Eventos" },
  { id: "categorias", label: "Categorias" },
  { id: "about", label: "About" },
];

interface NavbarProps {
  isLoggedIn?: boolean;
  activePage?: NavPage;
  onSignIn?: () => void;
  onTickets?: () => void;
  onFavorites?: () => void;
  onAccount?: () => void;
}

export default function Navbar({
  isLoggedIn = false,
  activePage,
  onSignIn,
  onTickets,
  onFavorites,
  onAccount,
}: NavbarProps) {
  return (
    <nav className="w-full h-21.25 bg-(--ink-black) flex items-center justify-between px-4">
      <span className="text-white font-extrabold text-[40px] leading-normal tracking-normal shrink-0">
        EVENFLOW
      </span>

      <div className="flex items-center gap-6">
        {NAV_LINKS.map(({ id, label }) => {
          const isActive = activePage === id;
          return (
            <button
              key={id}
              type="button"
              className="flex flex-col items-center gap-px cursor-pointer bg-transparent border-none p-0"
            >
              <span
                className={`text-2xl font-normal leading-normal ${
                  isActive ? "text-white" : "text-(--light-gray)"
                }`}
              >
                {label}
              </span>
              <div
                className={`w-full h-0.5 rounded-full transition-opacity ${
                  isActive ? "bg-white opacity-100" : "opacity-0"
                }`}
              />
            </button>
          );
        })}
      </div>

      {isLoggedIn ? (
        <div className="flex items-center gap-10">
          <button
            type="button"
            onClick={onTickets}
            className="text-(--light-gray) hover:text-white transition-colors cursor-pointer bg-transparent border-none p-0"
            aria-label="Mis boletos"
          >
            <TicketIcon />
          </button>
          <button
            type="button"
            onClick={onFavorites}
            className="text-(--light-gray) hover:text-white transition-colors cursor-pointer bg-transparent border-none p-0"
            aria-label="Favoritos"
          >
            <FavoriteIcon />
          </button>
          <button
            type="button"
            onClick={onAccount}
            className="bg-(--accent-lime) p-3 rounded-lg hover:opacity-90 active:scale-95 transition-all duration-150 cursor-pointer border-none flex items-center justify-center"
            aria-label="Mi cuenta"
          >
            <AccountCircleIcon className="text-(--ink-black)" />
          </button>
        </div>
      ) : (
        <Button variant="acid" onClick={onSignIn} className="w-auto px-3">
          Sign In
        </Button>
      )}
    </nav>
  );
}
