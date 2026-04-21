import { forwardRef, ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface NavLinkCompatProps {
  className?: string;
  href: string;
  children: ReactNode;
}

const NavLink = forwardRef<HTMLAnchorElement, NavLinkCompatProps>(
  ({ className, href, children }, ref) => {
    return (
      <Link
        ref={ref}
        href={href}
        className={cn(className)}
      >
        {children}
      </Link>
    );
  },
);

NavLink.displayName = "NavLink";

export { NavLink };

