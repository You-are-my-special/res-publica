import type { ReactNode } from "react";

interface TypographyProps {
  children: ReactNode;
  className?: string;
}

export const H1 = ({ children, className }: TypographyProps) => {
  return <h1 className="text-4xl font-bold tracking-tight">{children}</h1>;
};

export const H2 = ({ children, className }: TypographyProps) => {
  return <h2>{children}</h2>;
};

export const H3 = ({ children, className }: TypographyProps) => {
  return <h3>{children}</h3>;
};

export const H4 = ({ children, className }: TypographyProps) => {
  return <h4>{children}</h4>;
};
