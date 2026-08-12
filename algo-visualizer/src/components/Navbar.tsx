import { useState } from "react";
import { Button } from "../components/Button";
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
        className="text-muted dark:text-dark-muted transition-all hover:text-foreground dark:hover:text-dark-foreground hover:text-xl hover:font-semibold delay-25 duration-150 ease-in-out"
      >
        {children}
      </a>
    </li>
  );
};

const NAV_ITEMS: NavItemProps[] = [
  { href: "/algorithms", children: "Algorithms" },
  { href: "/playground", children: "Playground" },
  { href: "/docs", children: "Docs" },
];

export const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-background dark:bg-dark-background backdrop-blur-none">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-10">
        <a
          href="/"
          className="text-xl font-tech font-bold text-foreground dark:text-dark-foreground"
        >
          ALGOVIEW.
        </a>

        <ul className="hidden items-center gap-6 md:flex">
          {NAV_ITEMS.map((item) => (
            <NavItem key={item.href} href={item.href}>
              {item.children}
            </NavItem>
          ))}
        </ul>
        <div className="hidden md:block">
          <a href="/algorithms">
            <Button bgcolor="bg-accent" display="Launch Visualizer"></Button>
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          className="inline-flex items-center justify-center rounded-md p-2 text-foreground dark:text-dark-foreground md:hidden"
        >
          <span className="sr-only">Toggle menu</span>
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {open && (
        <ul id="mobile-nav" className="flex flex-col gap-4 px-6 py-4 sm:hidden">
          {NAV_ITEMS.map((item) => (
            <NavItem key={item.href} href={item.href}>
              {item.children}
            </NavItem>
          ))}
          <a href="/algorithms">
            <Button bgcolor="bg-accent" display="Launch Visualizer"></Button>
          </a>
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
