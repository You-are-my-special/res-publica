import type { LucideIcon } from "lucide-react";

import { cn } from ".";

export interface IconProps {
  as: LucideIcon;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizes = {
  sm: 14,
  md: 18,
  lg: 20,
};

const Icon = ({ as: IconJsx, size = "md", className }: IconProps) => {
  return (
    <IconJsx
      strokeWidth={1.5}
      width={sizes[size]}
      height={sizes[size]}
      className={cn("transition-colors duration-300", className)}
    />
  );
};
export { Icon };
