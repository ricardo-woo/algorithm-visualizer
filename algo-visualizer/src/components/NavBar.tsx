import { useState } from "react";
import type { ReactNode } from "react";

interface NavItemProps {
  children: ReactNode;
  href: string;
}

const NavItem = ({ children, href }: NavItemProps) => {
  return (
    <li>
      <a
        href={href}
        className="text-text-muted transition-colors hover:text-primary"
      >
        {children}
      </a>
    </li>
  );
};

const NAV_ITEMS: NavItemProps[] = [
  { href: "/", children: "Home" },
  { href: "/algorithms", children: "Algorithms" },
  { href: "/playground", children: "Playground" },
  { href: "/docs", children: "Docs" },
];

export const NavBar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b bg-background backdrop-blur-xs">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="/" className="text-xl font-bold text-foreground">
          AlgoView
        </a>

        <ul className="hidden items-center gap-6 md:flex">
          {NAV_ITEMS.map((item) => (
            <NavItem key={item.href} href={item.href}>
              {item.children}
            </NavItem>
          ))}
        </ul>
        <a
          href="/algorithms"
          className="hidden rounded-md bg-accent px-4 py-2 text-sm font-semibold text-foreground transition-opacity hover:opacity-90 md:inline-flex"
        >
          Launch visualizer
        </a>

        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          className="inline-flex items-center justify-center rounded-md p-2 text-foreground md:hidden"
        >
          <span className="sr-only">Toggle menu</span>
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {open && (
        <ul
          id="mobile-nav"
          className="flex flex-col gap-1 border-t px-6 py-4 md:hidden"
        >
          {NAV_ITEMS.map((item) => (
            <NavItem key={item.href} href={item.href}>
              {item.children}
            </NavItem>
          ))}
        </ul>
      )}
    </nav>
  );
};

const MenuIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="20"
    height="20"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
  >
    <path d="M3 6h18M3 12h18M3 18h18" />
  </svg>
);

const CloseIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="20"
    height="20"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
  >
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);
