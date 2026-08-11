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

export const NavBar = () => {
  return (
    <nav className="border-b border-slate-200 bg-background">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="/" className="text-xl font-bold text-primary">
          Algorithm Visualizer
        </a>

        <ul className="flex items-center gap-6">
          <NavItem href="/">Home</NavItem>
        </ul>
      </div>
    </nav>
  );
};
